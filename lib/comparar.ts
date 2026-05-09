/**
 * lib/comparar.ts
 * Utilitários para a feature de comparação de tickers.
 */

import { calculateDividends } from "./calculations";
import type { StockQuote, DividendCalculation } from "./types";

// ---------------------------------------------------------------------------
// Slug
// ---------------------------------------------------------------------------

/** Tickers populares usados na geração estática de pares. */
export const POPULAR_TICKERS = [
  "PETR4", "VALE3", "ITUB4", "BBAS3", "BBDC4",
  "WEGE3", "ABEV3", "RENT3", "EGIE3", "TAEE11",
  "CMIG4", "VIVT3", "TIMS3", "CPLE6", "PRIO3",
] as const;

export type ComparSlug = string; // ex.: "PETR4-vs-VALE3"

/** Gera o slug canônico (A sempre antes de B alfabeticamente). */
export function buildComparSlug(a: string, b: string): ComparSlug {
  const [x, y] = [a.toUpperCase(), b.toUpperCase()].sort();
  return `${x}-vs-${y}`;
}

/** Parseia slug → [tickerA, tickerB] ou null se inválido. */
export function parseComparSlug(slug: string): [string, string] | null {
  const match = slug.toUpperCase().match(/^([A-Z0-9]+)-VS-([A-Z0-9]+)$/);
  if (!match) return null;
  return [match[1]!, match[2]!];
}

/** Gera todos os pares únicos dos tickers populares. */
export function buildPopularPairs(): [string, string][] {
  const pairs: [string, string][] = [];
  for (let i = 0; i < POPULAR_TICKERS.length; i++) {
    for (let j = i + 1; j < POPULAR_TICKERS.length; j++) {
      pairs.push([POPULAR_TICKERS[i]!, POPULAR_TICKERS[j]!]);
    }
  }
  return pairs;
}

// ---------------------------------------------------------------------------
// Cálculo comparativo
// ---------------------------------------------------------------------------

export interface TickerComparData {
  ticker: string;
  shortName: string;
  logoUrl: string | null;
  currentPrice: number | null;
  calc: DividendCalculation;
  currency: string;
}

export interface ComparResult {
  a: TickerComparData;
  b: TickerComparData;
  /** Qual ticker pagou mais nos últimos 12m (null = empate). */
  winner12m: "a" | "b" | null;
  /** Diferença percentual: quanto A pagou a mais que B (pode ser negativo). */
  diffPct: number;
  /** Dividend yield estimado de A (anual / preço). */
  yieldA: number | null;
  /** Dividend yield estimado de B (anual / preço). */
  yieldB: number | null;
}

export function buildComparResult(
  quoteA: StockQuote,
  quoteB: StockQuote,
  shares: number = 100
): ComparResult {
  const calcA = calculateDividends(quoteA.dividends, shares);
  const calcB = calculateDividends(quoteB.dividends, shares);

  const a12m = calcA.perShare12m;
  const b12m = calcB.perShare12m;

  const winner12m: "a" | "b" | null =
    a12m > b12m ? "a" : b12m > a12m ? "b" : null;

  const diffPct =
    b12m === 0
      ? 0
      : Math.round(((a12m - b12m) / b12m) * 100);

  const priceA = quoteA.currentPrice;
  const priceB = quoteB.currentPrice;

  const yieldA =
    priceA && priceA > 0
      ? Math.round((calcA.annualEstimate / (priceA * shares)) * 10000) / 100
      : null;
  const yieldB =
    priceB && priceB > 0
      ? Math.round((calcB.annualEstimate / (priceB * shares)) * 10000) / 100
      : null;

  return {
    a: {
      ticker: quoteA.symbol,
      shortName: quoteA.shortName,
      logoUrl: quoteA.logoUrl ?? null,
      currentPrice: quoteA.currentPrice ?? null,
      calc: calcA,
      currency: quoteA.currency,
    },
    b: {
      ticker: quoteB.symbol,
      shortName: quoteB.shortName,
      logoUrl: quoteB.logoUrl ?? null,
      currentPrice: quoteB.currentPrice ?? null,
      calc: calcB,
      currency: quoteB.currency,
    },
    winner12m,
    diffPct,
    yieldA,
    yieldB,
  };
}
