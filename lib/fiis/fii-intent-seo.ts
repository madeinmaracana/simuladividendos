import type { FiiSeoRecord } from "@/data/fiis";
import {
  generateFiiProgrammaticDescription,
  generateFiiProgrammaticTitle,
} from "@/lib/programmatic/fii-page-seo";
import { FII_VARIANT_PAGA_QUANTO_POR_MES, fiiMainSlug, type FiiUrlVariant } from "./fii-slug";

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

export function getFiiIntentMetadata(
  symbol: string,
  mock: FiiSeoRecord | null,
  variant: "main" | FiiUrlVariant
): IntentMeta {
  const name = mock?.fundName?.trim();
  const label = name ? `${name} (${symbol})` : symbol;

  if (variant === "main") {
    return {
      title: generateFiiProgrammaticTitle(symbol, mock),
      description: generateFiiProgrammaticDescription(symbol, mock),
      keywords: baseKeywords(symbol, mock),
    };
  }

  return {
    title: `${symbol} paga quanto por mês? Rendimentos por cota e simulação`,
    description: `Quanto ${label} pagou por cota no último rendimento da fonte? Veja referência, histórico e simule com suas cotas. Valores futuros dependem do fundo — conteúdo educacional.`,
    keywords: [...baseKeywords(symbol, mock), "paga quanto por mês", "renda mensal FII"],
  };
}

export function canonicalMainFiiPath(ticker: string): string {
  return `/fiis/${encodeURIComponent(fiiMainSlug(ticker))}`;
}
