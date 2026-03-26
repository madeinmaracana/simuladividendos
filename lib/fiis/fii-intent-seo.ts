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

export function getFiiIntentMetadata(
  symbol: string,
  mock: FiiSeoRecord | null,
  variant: "main" | FiiUrlVariant
): IntentMeta {
  const name = mock?.fundName?.trim();
  const label = name ? `${name} (${symbol})` : symbol;
  const shares = fiiVariantShares(variant);

  if (variant === "main") {
    return {
      title: generateFiiProgrammaticTitle(symbol, mock),
      description: generateFiiProgrammaticDescription(symbol, mock),
      keywords: baseKeywords(symbol, mock),
    };
  }

  if (variant === "paga-quanto-por-mes") {
    return {
      title: `${symbol} paga quanto por mês? Rendimentos por cota e simulação`,
      description: `Quanto ${label} pagou por cota no último rendimento da fonte? Veja referência, histórico e simule com suas cotas. Valores futuros dependem do fundo — conteúdo educacional.`,
      keywords: [...baseKeywords(symbol, mock), "paga quanto por mês", "renda mensal FII"],
    };
  }

  if (shares) {
    return {
      title: `${symbol} quanto rendem ${shares} cotas? Simulação de rendimentos`,
      description: `Veja uma estimativa educacional de quanto ${shares} cotas de ${label} podem render por distribuição com base no histórico disponível e ajuste no simulador.`,
      keywords: [...baseKeywords(symbol, mock), `quanto rende ${shares} cotas`, "simulação FII"],
    };
  }

  return {
    title: `Simulador de dividendos ${symbol}: calcule por quantidade de cotas`,
    description: `Simule rendimentos de ${label} por quantidade de cotas, compare cenários e use o histórico da fonte para contexto educacional.`,
    keywords: [...baseKeywords(symbol, mock), "simulador de dividendos", "simulação por cotas"],
  };
}

export function canonicalMainFiiPath(ticker: string): string {
  return `/fiis/${encodeURIComponent(fiiMainSlug(ticker))}`;
}
