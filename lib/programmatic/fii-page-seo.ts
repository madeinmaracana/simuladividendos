import type { FiiSeoRecord } from "@/data/fiis";
import type { FaqItem } from "@/data/stocks";
import type { PerShareSnapshot } from "@/lib/ticker-page/derive";
import { buildFiiPageFaqs, generateFiiDescription, generateFiiTitle } from "@/lib/seo/fii-seo";

/** Título SEO programático para páginas de FII. */
export function generateFiiProgrammaticTitle(
  ticker: string,
  record?: Pick<FiiSeoRecord, "fundName"> | null
): string {
  const sym = ticker.trim().toUpperCase();
  const name = record?.fundName?.trim();
  if (name) return `${sym} rendimentos: ${name} — quanto paga e simulação`;
  return generateFiiTitle(sym);
}

/** Meta description com nome do fundo quando disponível. */
export function generateFiiProgrammaticDescription(
  ticker: string,
  record?: Pick<FiiSeoRecord, "fundName"> | null
): string {
  const sym = ticker.trim().toUpperCase();
  const name = record?.fundName?.trim();
  if (name) {
    return `${name} (${sym}) na B3: simule renda mensal por cota, confira último rendimento e histórico recente. Ferramenta educacional, sem recomendação de investimento.`;
  }
  return generateFiiDescription(sym);
}

export function generateFiiProgrammaticFAQ(
  ticker: string,
  mock: FiiSeoRecord | null,
  last: PerShareSnapshot | null,
  frequencyLabel: string | null,
  currency: string
): FaqItem[] {
  return buildFiiPageFaqs(ticker.trim().toUpperCase(), mock, last, frequencyLabel, currency);
}
