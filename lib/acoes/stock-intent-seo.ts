import type { StockSeoRecord } from "@/data/stocks";
import { generateDescription, generateTitle } from "@/lib/programmatic/stock-seo";
import type { AcaoUrlVariant } from "./acao-slug";
import { acaoMainSlug, acaoVariantShares } from "./acao-slug";

type IntentMeta = { title: string; description: string; keywords: string[] };

function baseKeywords(symbol: string, mock: StockSeoRecord | null): string[] {
  return [
    symbol,
    "dividendos",
    "B3",
    mock?.sectorLabel ?? "ações",
    "dividendos por ação",
    "quanto paga",
    "simular dividendos",
    mock?.companyName ?? "",
  ].filter((k): k is string => Boolean(k));
}

function seoTitle2026(symbol: string): string {
  return `${symbol} dividendos: quanto paga + simulação (2026)`;
}

function seoDescription2026(symbol: string, companyName: string | null): string {
  const label = companyName?.trim() ? companyName.trim() : "Empresa";
  return `${symbol} (${label}) — veja quanto paga em dividendos, último rendimento e simule quanto você receberia com seus investimentos. Atualizado para 2026.`;
}

/** Títulos e descriptions distintos por intenção (evita cópia idêntica entre URLs). */
export function getStockIntentMetadata(
  symbol: string,
  mock: StockSeoRecord | null,
  variant: "main" | AcaoUrlVariant
): IntentMeta {
  const name = mock?.companyName?.trim() ?? null;
  const shares = acaoVariantShares(variant);
  const title = seoTitle2026(symbol);
  const description = seoDescription2026(symbol, name);

  return {
    title,
    description,
    keywords: [
      ...baseKeywords(symbol, mock),
      ...generateTitle(symbol, mock).split(" "),
      ...generateDescription(symbol, mock).split(" "),
      "paga quanto",
      "quanto rende",
      "simulação 2026",
      shares ? `quanto rende ${shares} cotas` : "",
    ].filter(Boolean),
  };
}

/** Canonical da página principal do papel (referência cruzada / consistência). */
export function canonicalMainAcaoPath(ticker: string): string {
  return `/acoes/${encodeURIComponent(acaoMainSlug(ticker))}`;
}
