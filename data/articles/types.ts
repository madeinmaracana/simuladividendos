import type { FaqItem, SectorSlug } from "@/data/stocks";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type ArticleRecord = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  sections: ArticleSection[];
  faqs: FaqItem[];
  relatedTickers: string[];
  /** Tickers de FIIs relacionados ao tema (rotas `/fiis/[ticker]`). */
  relatedFiis?: string[];
  relatedSectors: SectorSlug[];
  /** ISO YYYY-MM-DD para `<lastmod>` no sitemap. */
  lastModified?: string;
};
