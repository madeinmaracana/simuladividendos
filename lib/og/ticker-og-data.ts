import { calculateDividends } from "@/lib/calculations";
import { formatBRLForOg } from "@/lib/format";
import { getLastPerShareSnapshot } from "@/lib/ticker-page/derive";
import type { StockQuote } from "@/lib/types";

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

/**
 * Busca logo remota (ex.: `logourl` da brapi) e embute como data URL para `ImageResponse`.
 * Para logo local no futuro: em `fetchQuoteForOg` ou aqui, testar primeiro
 * `public/logos/{TICKER}.png` e servir via `getSeoBaseUrl()` + path absoluto.
 */
const MAX_LOGO_BYTES = 750_000;

export async function fetchLogoAsDataUrl(url: string | null | undefined): Promise<string | null> {
  if (!url || !url.startsWith("http")) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_LOGO_BYTES) return null;
    const ct = res.headers.get("content-type")?.split(";")[0]?.trim() || "image/png";
    if (!ct.startsWith("image/")) return null;
    // Satori costuma falhar com SVG/WebP em alguns casos — só embute raster comum.
    if (ct.includes("svg") || ct === "image/webp") return null;
    return `data:${ct};base64,${arrayBufferToBase64(buf)}`;
  } catch {
    return null;
  }
}

/** Fetch mínimo brapi (sem BrapiError) para OG em edge. */
export async function fetchQuoteForOg(ticker: string): Promise<StockQuote | null> {
  const symbol = ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!symbol || symbol.length > 10) return null;

  const url = new URL(`https://brapi.dev/api/quote/${symbol}`);
  url.searchParams.set("dividends", "true");
  const token = process.env.BRAPI_TOKEN;
  if (token) url.searchParams.set("token", token);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      results?: Array<{
        symbol?: string;
        shortName?: string;
        longName?: string;
        logourl?: string;
        currency?: string;
        regularMarketPrice?: number;
        dividends?: Array<{ date?: string; paymentDate?: string; amount?: number; rate?: number }>;
        dividendsData?: { cashDividends?: Array<{ paymentDate: string; rate: number }> };
      }>;
      error?: boolean | string;
    };
    if (json.error === true || (typeof json.error === "string" && json.error)) return null;
    const row = json.results?.[0];
    if (!row) return null;

    const cash = row.dividendsData?.cashDividends;
    const dividends =
      cash?.map((d) => ({
        paymentDate: d.paymentDate,
        ratePerShare: d.rate,
        label: "Dividendo",
      })) ??
      row.dividends?.map((d) => ({
        paymentDate: d.paymentDate ?? d.date ?? "",
        ratePerShare: d.rate ?? d.amount ?? 0,
        label: "Dividendo",
      })) ??
      [];

    const currentPrice =
      typeof row.regularMarketPrice === "number" ? row.regularMarketPrice : null;

    return {
      symbol: row.symbol ?? symbol,
      shortName: row.shortName ?? symbol,
      longName: row.longName,
      logoUrl:
        typeof row.logourl === "string" && row.logourl.startsWith("http") ? row.logourl : null,
      currentPrice,
      lastUpdated: new Date().toISOString(),
      regularMarketPrice: currentPrice,
      currency: row.currency ?? "BRL",
      dividends,
    };
  } catch {
    return null;
  }
}

const MIN_EVENTS_12M = 2;

/** Valor em destaque: média mensal se histórico suficiente; senão último provento. */
export function resolvePerShareValueForOg(stock: StockQuote | null): string | null {
  if (!stock?.dividends?.length) return null;
  const calc = calculateDividends(stock.dividends, 1);
  const useMonthly =
    calc.dividendsLast12m.length >= MIN_EVENTS_12M &&
    calc.monthlyAvgEstimate > 0 &&
    Number.isFinite(calc.monthlyAvgEstimate);
  if (useMonthly) {
    return formatBRLForOg(calc.monthlyAvgEstimate, stock.currency);
  }
  const last = getLastPerShareSnapshot(stock.dividends);
  if (!last || last.amountPerShare <= 0) return null;
  return formatBRLForOg(last.amountPerShare, stock.currency);
}
