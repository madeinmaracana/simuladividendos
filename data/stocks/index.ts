/**
 * Camada de dados para SEO programático: setores + tickers.
 * Importe de `@/data/stocks` ou `@/lib/stocks-data` (re-export).
 */

import { SECTORS, SECTOR_SLUGS, isSectorSlug } from "./sectors";
import { TICKER_DEFINITIONS } from "./tickers.registry";

export { TICKER_DEFINITIONS };
import type { SectorRecord, SectorSlug, StockSeoDefinition, StockSeoRecord } from "./types";

export type { FaqItem, SectorRecord, SectorSlug, StockSeoDefinition, StockSeoRecord } from "./types";
export { SECTOR_SLUGS, SECTORS, isSectorSlug };

function normalizeTicker(def: StockSeoDefinition): StockSeoRecord {
  const sector = SECTORS[def.sectorSlug];
  if (!sector) {
    throw new Error(
      `[data/stocks] Ticker ${def.ticker}: sectorSlug "${def.sectorSlug}" não existe. Adicione o setor em data/stocks/sectors.ts primeiro.`
    );
  }
  return {
    ...def,
    ticker: def.ticker.trim().toUpperCase(),
    sectorLabel: def.sectorLabel ?? sector.name,
  };
}

const STOCKS_LIST: StockSeoRecord[] = TICKER_DEFINITIONS.map(normalizeTicker);

export const MOCK_STOCKS: StockSeoRecord[] = STOCKS_LIST;

export const STOCKS_BY_TICKER: Record<string, StockSeoRecord> = Object.fromEntries(
  STOCKS_LIST.map((s) => [s.ticker.toUpperCase(), s])
);

export function getSector(slug: string): SectorRecord | null {
  if (!isSectorSlug(slug)) return null;
  return SECTORS[slug] ?? null;
}

export function getStockSeo(ticker: string): StockSeoRecord | null {
  const key = ticker.trim().toUpperCase();
  return STOCKS_BY_TICKER[key] ?? null;
}

export function getStocksInSector(slug: SectorSlug): StockSeoRecord[] {
  return STOCKS_LIST.filter((s) => s.sectorSlug === slug);
}

export function getAllSectorSlugs(): SectorSlug[] {
  return [...SECTOR_SLUGS];
}

export function getAllMockTickers(): string[] {
  return STOCKS_LIST.map((s) => s.ticker.toUpperCase());
}

export function getTickerPath(ticker: string): string {
  return `/acoes/${encodeURIComponent(ticker.trim().toUpperCase())}`;
}

export function getSectorPath(slug: string): string {
  return `/setores/${encodeURIComponent(slug)}`;
}

export function getPeerTickers(ticker: string): StockSeoRecord[] {
  const self = getStockSeo(ticker);
  if (!self) return [];
  return getStocksInSector(self.sectorSlug).filter((s) => s.ticker !== self.ticker);
}

export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}%`;
}

/** Links para UI (home, simulador): um item por setor cadastrado. */
export function getSectorNavItems(): { slug: SectorSlug; label: string; href: string; icon: string }[] {
  return getAllSectorSlugs().map((slug) => ({
    slug,
    label: SECTORS[slug].name,
    href: getSectorPath(slug),
    icon: SECTORS[slug].icon,
  }));
}
