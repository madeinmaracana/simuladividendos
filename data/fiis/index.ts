import { FII_DEFINITIONS } from "./fiis.registry";
import type { FiiSeoRecord } from "./types";

export type { FiiSeoRecord, FiiSeoDefinition } from "./types";
export { FII_DEFINITIONS };

const LIST: FiiSeoRecord[] = FII_DEFINITIONS.map((d) => ({
  ...d,
  ticker: d.ticker.trim().toUpperCase(),
}));

export const MOCK_FIIS: FiiSeoRecord[] = LIST;

export const FIIS_BY_TICKER: Record<string, FiiSeoRecord> = Object.fromEntries(
  LIST.map((f) => [f.ticker.toUpperCase(), f])
);

export function getFiiSeo(ticker: string): FiiSeoRecord | null {
  return FIIS_BY_TICKER[ticker.trim().toUpperCase()] ?? null;
}

export function getAllMockFiiTickers(): string[] {
  return LIST.map((f) => f.ticker);
}

export function getFiiPath(ticker: string): string {
  return `/fiis/${encodeURIComponent(ticker.trim().toUpperCase())}`;
}

export function getPeerFiis(ticker: string): FiiSeoRecord[] {
  const self = getFiiSeo(ticker);
  if (!self) return [];
  return LIST.filter((f) => f.ticker !== self.ticker);
}
