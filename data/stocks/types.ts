/**
 * Tipos compartilhados para setores e tickers (SEO / conteúdo editorial).
 */

export const SECTOR_SLUGS = [
  "bancos",
  "consumo",
  "energia",
  "industria",
  "mineracao",
  "petroleo",
  "servicos_financeiros",
] as const;
export type SectorSlug = (typeof SECTOR_SLUGS)[number];

export type FaqItem = { question: string; answer: string };

export type SectorRecord = {
  slug: SectorSlug;
  /** Nome exibido, ex.: "Bancos" */
  name: string;
  intro: string;
  /** Texto editorial sobre dividendos no setor. Array de parágrafos ou string simples. */
  dividendRelevance: string | string[];
  faqs: FaqItem[];
  /**
   * Nome do ícone no Google Fonts Material Symbols Outlined.
   * Referência: https://fonts.google.com/icons
   * Renderizado pelo componente <Icon name={sector.icon} /> (components/ui/Icon.tsx).
   */
  icon: string;
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
 * Objeto colado em `data/tickers.ts` (re-export em `tickers.registry.ts`).
 * `sectorLabel` é opcional: preenchemos com o nome do setor em `data/stocks/index.ts`.
 */
export type StockSeoDefinition = Omit<StockSeoRecord, "sectorLabel"> & { sectorLabel?: string };
