import type { Metadata } from "next";
import type { ArticleRecord } from "@/data/articles";
import type { FiiSeoRecord } from "@/data/fiis";
import type { SectorRecord, StockSeoRecord } from "@/data/stocks";
import { getSeoBaseUrl } from "@/lib/site";
import { OG_LOCALE, SITE_NAME } from "./constants";
import type { AcaoUrlVariant } from "@/lib/acoes/acao-slug";
import { canonicalMainAcaoPath, getStockIntentMetadata } from "@/lib/acoes/stock-intent-seo";
import { isAcaoVariantIndexable } from "@/lib/acoes/acao-slug";
import type { FiiUrlVariant } from "@/lib/fiis/fii-slug";
import { canonicalMainFiiPath, getFiiIntentMetadata } from "@/lib/fiis/fii-intent-seo";
import { isFiiVariantIndexable } from "@/data/fii-registry";
import { generateDescription, generateTitle } from "@/lib/programmatic/stock-seo";

function absoluteUrl(path: string): string {
  const base = getSeoBaseUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** Injeta imagem OG absoluta (ex.: `/api/og`) e garante Twitter `summary_large_image`. */
export function withOpenGraphApiImage(metadata: Metadata, ogImageAbsoluteUrl: string): Metadata {
  const titleStr =
    typeof metadata.title === "string"
      ? metadata.title
      : metadata.title && typeof metadata.title === "object" && "default" in metadata.title
        ? String((metadata.title as { default?: string }).default ?? "")
        : "";
  const alt = titleStr ? `${titleStr} — pré-visualização` : "Pré-visualização — Simula Dividendos";

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [
        {
          url: ogImageAbsoluteUrl,
          width: 1200,
          height: 630,
          alt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      ...metadata.twitter,
      card: "summary_large_image",
      images: [ogImageAbsoluteUrl],
    },
  };
}

export type PageMetadataInput = {
  /** Título da página sem sufixo do site (o layout aplica `%s | Simula Dividendos`). */
  title: string;
  description: string;
  canonicalPath: string;
  /**
   * Quando definido, `rel=canonical` e `og:url` apontam para este caminho (página “self” pode ser outra).
   * Usado nas variações `/acoes/petr4-dividendos` → canônico `/acoes/PETR4`.
   */
  linkCanonicalPath?: string;
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
  linkCanonicalPath,
  keywords,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const path = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const canonical =
    linkCanonicalPath === undefined
      ? path
      : linkCanonicalPath.startsWith("/")
        ? linkCanonicalPath
        : `/${linkCanonicalPath}`;
  const url = absoluteUrl(canonical);
  const ogTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
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
  const title = generateTitle(symbol, mock);
  const description = generateDescription(symbol, mock);
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

/** Metadata para `/acoes/[slug]` (principal ou variação dividendos | paga-quanto | simulador). */
export function buildAcaoSlugPageMetadata(
  symbol: string,
  mock: StockSeoRecord | null,
  slug: string,
  variant: "main" | AcaoUrlVariant
): Metadata {
  const path = `/acoes/${encodeURIComponent(slug.trim())}`;
  const meta = getStockIntentMetadata(symbol, mock, variant);
  const mainPath = canonicalMainAcaoPath(symbol);
  const isIndexable = isAcaoVariantIndexable(symbol, variant);
  const built = buildPageMetadata({
    title: meta.title,
    description: meta.description,
    canonicalPath: path,
    linkCanonicalPath: variant === "main" || isIndexable ? undefined : mainPath,
    keywords: meta.keywords,
  });
  const isLowPriority = !isIndexable;
  if (isLowPriority) {
    return {
      ...built,
      robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    };
  }
  return {
    ...built,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function buildFiiPageMetadata(symbol: string, mock: FiiSeoRecord | null): Metadata {
  return buildFiiSlugPageMetadata(symbol, mock, symbol, "main");
}

/** Metadata para `/fiis/[slug]` (principal ou variação de intenção). */
export function buildFiiSlugPageMetadata(
  symbol: string,
  mock: FiiSeoRecord | null,
  slug: string,
  variant: "main" | FiiUrlVariant
): Metadata {
  const path = `/fiis/${encodeURIComponent(slug.trim())}`;
  const meta = getFiiIntentMetadata(symbol, mock, variant);
  const mainPath = canonicalMainFiiPath(symbol);
  const isIndexable = isFiiVariantIndexable(symbol, variant);
  const nameKw = mock?.fundName ?? "";
  const keywords = [
    ...meta.keywords,
    "fundo imobiliário",
    "renda mensal",
    nameKw,
  ].filter((k): k is string => Boolean(k));

  const built = buildPageMetadata({
    title: meta.title,
    description: meta.description,
    canonicalPath: path,
    linkCanonicalPath: variant === "main" || isIndexable ? undefined : mainPath,
    keywords: [...new Set(keywords)],
  });
  const isLowPriority = !isIndexable;
  if (isLowPriority) {
    return {
      ...built,
      robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    };
  }
  return {
    ...built,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function buildFiisIndexMetadata(): Metadata {
  return buildPageMetadata({
    title: "FIIs: simule rendimentos e renda mensal",
    description:
      "Lista de fundos imobiliários para simular rendimentos por cota, renda mensal de referência e explorar artigos. Conteúdo educacional na B3.",
    canonicalPath: "/fiis",
    keywords: ["FII", "fundos imobiliários", "B3", "renda mensal", "simulador"],
  });
}

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
