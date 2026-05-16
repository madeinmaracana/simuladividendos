import type { FaqItem } from "@/data/stocks";

/* ── Setores de FII ─────────────────────────────────────────── */

export const FII_SECTOR_SLUGS = [
  "papel",
  "logistica",
  "shoppings",
  "escritorios",
  "hibrido",
] as const;

export type FiiSectorSlug = (typeof FII_SECTOR_SLUGS)[number];

export type FiiSectorRecord = {
  slug: FiiSectorSlug;
  /** Nome exibido, ex.: "Papel" */
  name: string;
  /** Ícone Material Symbols */
  icon: string;
  /** Parágrafo introdutório para a futura página de categoria. */
  intro: string;
};

/* ── Registro editorial de um FII ───────────────────────────── */

/**
 * Registro editorial/SEO de um FII (separado de ações).
 * Valores de mercado e proventos em tempo real vêm da API (brapi); estes campos são contexto fixo.
 */
export type FiiSeoRecord = {
  ticker: string;
  fundName: string;
  /** Categoria do fundo — usada nas futuras páginas de categoria. */
  sector: FiiSectorSlug;
  shortDescription: string;
  /** Texto sobre frequência típica (mensal, etc.) — educativo, não garantia. */
  paymentFrequency: string;
  historySummary?: string;
  faqs: FaqItem[];
  /** ISO YYYY-MM-DD para `<lastmod>` no sitemap. */
  lastModified?: string;
};

export type FiiSeoDefinition = FiiSeoRecord;
