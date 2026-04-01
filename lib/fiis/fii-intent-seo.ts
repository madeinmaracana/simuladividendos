import type { FiiSeoRecord } from "@/data/fiis";
import {
  generateFiiProgrammaticDescription,
  generateFiiProgrammaticTitle,
} from "@/lib/programmatic/fii-page-seo";
import { fiiMainSlug, fiiVariantShares, type FiiUrlVariant } from "./fii-slug";

type IntentMeta = { title: string; description: string; keywords: string[] };

function baseKeywords(symbol: string, mock: FiiSeoRecord | null): string[] {
  return [
    symbol,
    "FII",
    "rendimentos",
    "B3",
    "quanto paga",
    mock?.fundName ?? "",
  ].filter((k): k is string => Boolean(k));
}

function seoTitle2026(symbol: string): string {
  return `${symbol} dividendos: quanto paga + simulação (2026)`;
}

function seoDescription2026(symbol: string, fundName: string | null): string {
  const label = fundName?.trim() ? fundName.trim() : "Fundo";
  return `${symbol} (${label}) — veja quanto paga em dividendos, último rendimento e simule quanto você receberia com seus investimentos. Atualizado para 2026.`;
}

export function getFiiIntentMetadata(
  symbol: string,
  mock: FiiSeoRecord | null,
  variant: "main" | FiiUrlVariant
): IntentMeta {
  const name = mock?.fundName?.trim() ?? null;
  const shares = fiiVariantShares(variant);
  const title = seoTitle2026(symbol);
  const description = seoDescription2026(symbol, name);

  return {
    title,
    description,
    keywords: [
      ...baseKeywords(symbol, mock),
      ...generateFiiProgrammaticTitle(symbol, mock).split(" "),
      ...generateFiiProgrammaticDescription(symbol, mock).split(" "),
      "paga quanto",
      "quanto rende",
      "simulação 2026",
      shares ? `quanto rende ${shares} cotas` : "",
    ].filter(Boolean),
  };
}

export function canonicalMainFiiPath(ticker: string): string {
  return `/fiis/${encodeURIComponent(fiiMainSlug(ticker))}`;
}
