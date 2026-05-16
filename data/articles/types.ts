import type { FaqItem, SectorSlug } from "@/data/stocks";

export type ArticleSubsection = {
  heading: string;
  paragraphs: string[];
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  /** H3 dentro da seção (conteúdo escaneável / SEO). */
  subsections?: ArticleSubsection[];
};

export type ArticleRecord = {
  slug: string;
  title: string;
  description: string;
  /** Bloco curto no topo (estilo resposta direta / snippet). */
  quickAnswer?: string;
  keywords: string[];
  sections: ArticleSection[];
  faqs: FaqItem[];
  relatedTickers: string[];
  /** Tickers de FIIs relacionados ao tema (rotas `/fiis/[slug]`, ex. ticker ou landing). */
  relatedFiis?: string[];
  relatedSectors: SectorSlug[];
  /** Slugs de outros artigos para interligação (SEO + navegação). */
  relatedArticleSlugs?: string[];
  /** ISO YYYY-MM-DD para `<lastmod>` no sitemap. */
  lastModified?: string;
  /** Caminho para imagem de capa SVG, ex.: `/articles/[slug].svg` */
  coverImage?: string;
};
