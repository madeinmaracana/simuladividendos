import { formatBRL } from "@/lib/format";
import { getLastPerShareSnapshot } from "@/lib/ticker-page/derive";
import type { StockQuote } from "@/lib/types";

export type TickerOgPayload = {
  symbol: string;
  headline: string;
  subline: string | null;
  perShareLine: string | null;
  logoDataUrl: string | null;
};

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
export async function fetchLogoAsDataUrl(url: string | null | undefined): Promise<string | null> {
  if (!url || !url.startsWith("http")) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const ct = res.headers.get("content-type")?.split(";")[0]?.trim() || "image/png";
    if (!ct.startsWith("image/")) return null;
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

export function formatPerShareForOg(stock: StockQuote | null): string | null {
  if (!stock?.dividends?.length) return null;
  const last = getLastPerShareSnapshot(stock.dividends);
  if (!last || last.amountPerShare <= 0) return null;
  return `Último provento na fonte: ${formatBRL(last.amountPerShare, stock.currency)} por ação`;
}

export function buildAcaoOgPayload(
  symbol: string,
  variant: "main" | "paga-quanto" | "other",
  stock: StockQuote | null,
  displayName: string | null,
  logoDataUrl: string | null
): TickerOgPayload {
  const sym = symbol.trim().toUpperCase();
  const name =
    displayName?.trim() || stock?.longName?.trim() || stock?.shortName?.trim() || null;
  const headline =
    variant === "paga-quanto"
      ? `Quanto ${sym} paga de dividendos?`
      : `Dividendos de ${sym}`;
  const subline = name && name.toUpperCase() !== sym ? name : null;
  const perShareLine = formatPerShareForOg(stock);

  return {
    symbol: sym,
    headline,
    subline,
    perShareLine,
    logoDataUrl,
  };
}

export function buildFiiOgPayload(
  symbol: string,
  stock: StockQuote | null,
  fundName: string | null,
  logoDataUrl: string | null
): TickerOgPayload {
  const sym = symbol.trim().toUpperCase();
  const fn = fundName?.trim() || stock?.longName || stock?.shortName || null;
  const headline = `Rendimentos de ${sym}`;
  const subline = fn && fn !== sym ? fn : null;
  const perShareLine = formatPerShareForOg(stock);

  return {
    symbol: sym,
    headline,
    subline,
    perShareLine,
    logoDataUrl,
  };
}

export function buildFallbackOgPayload(symbol: string): TickerOgPayload {
  const sym = symbol.trim().toUpperCase() || "B3";
  return {
    symbol: sym,
    headline: `Dividendos de ${sym}`,
    subline: "Simula Dividendos · simule proventos na B3",
    perShareLine: null,
    logoDataUrl: null,
  };
}
