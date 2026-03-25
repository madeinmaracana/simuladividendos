import type { Metadata } from "next";
import type { ArticleRecord } from "@/data/articles";
import type { SectorRecord, StockSeoRecord } from "@/data/stocks";
import { getSeoBaseUrl } from "@/lib/site";
import { OG_LOCALE, SITE_NAME } from "./constants";
import { generateTickerDescription, generateTickerTitle } from "./ticker-seo";

function absoluteUrl(path: string): string {
  const base = getSeoBaseUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export type PageMetadataInput = {
  /** Título da página sem sufixo do site (o layout aplica `%s | Simula Dividendos`). */
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  ogType?: "website" | "article";
};

/**
 * Metadata padrão para páginas internas (Open Graph + Twitter + canonical).
 * `title` segue o template do `app/layout.tsx`.
 */
export function buildPageMetadata({
  title,
  description,
  canonicalPath,
  keywords,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const path = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const url = absoluteUrl(path);
  const ogTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url,
      locale: OG_LOCALE,
      type: ogType,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

/** Página de ticker: título/descrição alinhados a busca por “[ticker] dividendos” e simulação. */
export function buildTickerStockPageMetadata(symbol: string, mock: StockSeoRecord | null): Metadata {
  const path = `/acoes/${encodeURIComponent(symbol)}`;
  const title = generateTickerTitle(symbol);
  const description = generateTickerDescription(symbol);
  const companyKw = mock?.companyName ?? "";

  return buildPageMetadata({
    title,
    description,
    canonicalPath: path,
    keywords: [
      symbol,
      "dividendos",
      "B3",
      mock?.sectorLabel ?? "ações",
      "simulador de dividendos",
      "quanto paga",
      companyKw,
    ].filter((k): k is string => Boolean(k)),
  });
}

/** @deprecated Use buildTickerStockPageMetadata — mantido para compatibilidade. */
export const buildStockPageMetadata = buildTickerStockPageMetadata;

export function buildSectorPageMetadata(sector: SectorRecord): Metadata {
  const path = `/setores/${encodeURIComponent(sector.slug)}`;
  const title = `Ações do setor de ${sector.name}`;
  const introSnippet =
    sector.intro.length > 140 ? `${sector.intro.slice(0, 137).trim()}…` : sector.intro;
  const description = `${introSnippet} Veja lista de ações, yield de referência e simulador. Não é recomendação.`;

  return buildPageMetadata({
    title,
    description,
    canonicalPath: path,
    keywords: [sector.name, "ações", "B3", "dividendos", "setor"],
  });
}

export function buildArticlePageMetadata(article: ArticleRecord): Metadata {
  const path = `/artigos/${encodeURIComponent(article.slug)}`;

  return buildPageMetadata({
    title: article.title,
    description: article.description,
    canonicalPath: path,
    keywords: article.keywords,
    ogType: "article",
  });
}
