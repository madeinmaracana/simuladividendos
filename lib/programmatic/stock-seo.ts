import type { StockSeoRecord } from "@/data/stocks";
import type { FaqItem } from "@/data/stocks";
import { getSector } from "@/data/stocks";
import type { TickerEditorialInput } from "@/lib/ticker-page/editorial";
import { generateTickerSummaryText } from "@/lib/ticker-page/editorial";
import type { PerShareSnapshot } from "@/lib/ticker-page/derive";
import {
  generateTickerDescription,
  generateTickerFAQ,
  generateTickerTitle,
} from "@/lib/seo/ticker-seo";

/**
 * Título SEO programático para páginas de ação.
 * Formato alinhado a buscas “[TICKER] dividendos” e simulação.
 */
export function generateTitle(
  ticker: string,
  record?: Pick<StockSeoRecord, "companyName"> | null
): string {
  const sym = ticker.trim().toUpperCase();
  const name = record?.companyName?.trim();
  if (name) return `${sym} dividendos: ${name} — quanto paga e simulação`;
  return generateTickerTitle(sym);
}

/** Meta description enriquecida com empresa e setor quando houver registro. */
export function generateDescription(ticker: string, record?: StockSeoRecord | null): string {
  const sym = ticker.trim().toUpperCase();
  const base = generateTickerDescription(sym);
  if (!record?.companyName?.trim()) return base;
  const sectorName = record.sectorSlug ? getSector(record.sectorSlug)?.name : undefined;
  const prefix = sectorName
    ? `${record.companyName} (${sym}) — setor ${sectorName.toLowerCase()}. `
    : `${record.companyName} (${sym}). `;
  return `${prefix}${base}`;
}

/** FAQ dinâmico: combina dados da API (último/próximo provento) com FAQs do registry. */
export function generateFAQ(
  ticker: string,
  mock: StockSeoRecord | null,
  last: PerShareSnapshot | null,
  next: PerShareSnapshot | null,
  frequencyLabel: string | null,
  currency: string
): FaqItem[] {
  return generateTickerFAQ(ticker.trim().toUpperCase(), mock, last, next, frequencyLabel, currency);
}

/** Parágrafos editoriais contextuais (B3, setor, histórico, simulador). */
export function generateSummaryText(input: TickerEditorialInput): string[] {
  return generateTickerSummaryText(input);
}
