import type { FaqItem } from "@/data/stocks";

/**
 * Registro editorial/SEO de um FII (separado de ações).
 * Valores de mercado e proventos em tempo real vêm da API (brapi); estes campos são contexto fixo.
 */
export type FiiSeoRecord = {
  ticker: string;
  fundName: string;
  shortDescription: string;
  /** Texto sobre frequência típica (mensal, etc.) — educativo, não garantia. */
  paymentFrequency: string;
  historySummary?: string;
  faqs: FaqItem[];
  /** ISO YYYY-MM-DD para `<lastmod>` no sitemap. */
  lastModified?: string;
};

export type FiiSeoDefinition = FiiSeoRecord;
