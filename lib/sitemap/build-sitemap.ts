import type { MetadataRoute } from "next";
import {
  acaoPathFromSlug,
  buildAllAcaoSlugStaticParams,
  isAcaoVariantIndexable,
  parseAcaoSlug,
} from "@/lib/acoes/acao-slug";
import { buildAllFiiSlugStaticParams, isFiiVariantIndexable } from "@/data/fii-registry";
import {
  ALL_ARTICLES,
  getAllSectorSlugs,
  getSectorPath,
  MOCK_FIIS,
  MOCK_STOCKS,
} from "@/data/sitemap-sources";
import { fiiPathFromSlug, parseFiiSlug } from "@/lib/fiis/fii-slug";
import { buildPopularPairs, buildComparSlug } from "@/lib/comparar";

export function defaultLastModified(): Date {
  return new Date();
}

export function lastModFromIso(iso?: string): Date {
  if (!iso?.trim()) return defaultLastModified();
  const raw = iso.trim();
  const d = new Date(raw.length === 10 ? `${raw}T12:00:00.000Z` : raw);
  return Number.isNaN(d.getTime()) ? defaultLastModified() : d;
}

// ── Per-type builders ──────────────────────────────────────────────────────

export function buildAcoesSitemap(base: string): MetadataRoute.Sitemap {
  const tickerBySymbol = Object.fromEntries(MOCK_STOCKS.map((s) => [s.ticker.toUpperCase(), s]));
  const acaoSlugParams = buildAllAcaoSlugStaticParams();
  const slugsForSitemap =
    process.env.SITEMAP_EXCLUDE_ACAO_URL_VARIANTS === "1"
      ? acaoSlugParams.filter(({ slug }) => parseAcaoSlug(slug).variant === "main")
      : acaoSlugParams;

  return slugsForSitemap
    .filter(({ slug }) => {
      const { ticker, variant } = parseAcaoSlug(slug);
      return isAcaoVariantIndexable(ticker, variant);
    })
    .map(({ slug }) => {
      const { ticker } = parseAcaoSlug(slug);
      const stock = tickerBySymbol[ticker];
      return {
        url: `${base}${acaoPathFromSlug(slug)}`,
        lastModified: lastModFromIso(stock?.lastModified),
        changeFrequency: "weekly" as const,
        priority: slug.includes("-") ? (0.72 as const) : (0.8 as const),
      };
    });
}

export function buildFiisSitemap(base: string): MetadataRoute.Sitemap {
  const fiiByTicker = Object.fromEntries(MOCK_FIIS.map((f) => [f.ticker.toUpperCase(), f]));
  return buildAllFiiSlugStaticParams()
    .filter(({ slug }) => {
      const { ticker, variant } = parseFiiSlug(slug);
      return isFiiVariantIndexable(ticker, variant);
    })
    .map(({ slug }) => {
      const { ticker } = parseFiiSlug(slug);
      const f = fiiByTicker[ticker];
      return {
        url: `${base}${fiiPathFromSlug(slug)}`,
        lastModified: lastModFromIso(f?.lastModified),
        changeFrequency: "weekly" as const,
        priority: slug.includes("-") ? (0.72 as const) : (0.8 as const),
      };
    });
}

export function buildArtigosSitemap(base: string): MetadataRoute.Sitemap {
  return ALL_ARTICLES.map((a) => ({
    url: `${base}/artigos/${encodeURIComponent(a.slug)}`,
    lastModified: lastModFromIso(a.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

export function buildSetoresSitemap(base: string): MetadataRoute.Sitemap {
  const fallback = defaultLastModified();
  return getAllSectorSlugs().map((slug) => ({
    url: `${base}${getSectorPath(slug)}`,
    lastModified: fallback,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
}

export function buildCompararSitemap(base: string): MetadataRoute.Sitemap {
  const fallback = defaultLastModified();
  return buildPopularPairs().map(([a, b]) => ({
    url: `${base}/comparar/${buildComparSlug(a, b)}`,
    lastModified: fallback,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));
}

/** Sitemap principal: só rotas estáticas + hubs. */
export function buildSitemap(base: string): MetadataRoute.Sitemap {
  const fallback = defaultLastModified();
  return [
    { url: base, lastModified: fallback, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/simulador`, lastModified: fallback, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/comparar`, lastModified: fallback, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/setores`, lastModified: fallback, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/fiis`, lastModified: fallback, changeFrequency: "weekly", priority: 0.88 },
    { url: `${base}/artigos`, lastModified: fallback, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/melhores-acoes-dividendos`, lastModified: fallback, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/melhores-fiis`, lastModified: fallback, changeFrequency: "weekly", priority: 0.85 },
  ];
}
