/**
 * Tipos compartilhados para setores e tickers (SEO / conteúdo editorial).
 */

export const SECTOR_SLUGS = ["bancos", "energia", "mineracao", "petroleo"] as const;
export type SectorSlug = (typeof SECTOR_SLUGS)[number];

export type FaqItem = { question: string; answer: string };

export type SectorRecord = {
  slug: SectorSlug;
  /** Nome exibido, ex.: "Bancos" */
  name: string;
  intro: string;
  dividendRelevance: string;
  faqs: FaqItem[];
};

/** Registro normalizado usado nas páginas (sempre com sectorLabel resolvido). */
export type StockSeoRecord = {
  ticker: string;
  companyName: string;
  sectorSlug: SectorSlug;
  /** Rótulo do setor (herdado de {@link SectorRecord.name} se omitido no registry). */
  sectorLabel: string;
  shortDescription: string;
  dividendYieldPct: number;
  payoutPct: number;
  priceBrl: number;
  paymentFrequency: string;
  historySummary: string;
  worthFollowing: string;
  listDescription: string;
  faqs: FaqItem[];
  /** ISO YYYY-MM-DD (sitemap lastmod). Opcional: sem isso, usa data de geração. */
  lastModified?: string;
};

/**
 * Objeto colado em `tickers.registry.ts`.
 * `sectorLabel` é opcional: preenchemos com o nome do setor em `data/stocks/index.ts`.
 */
export type StockSeoDefinition = Omit<StockSeoRecord, "sectorLabel"> & { sectorLabel?: string };
