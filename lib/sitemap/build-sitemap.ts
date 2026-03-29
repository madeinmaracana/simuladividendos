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

/** Fallback de lastmod quando o conteúdo não declara data (ex.: setores, home). */
function defaultLastModified(): Date {
  return new Date();
}

function lastModFromIso(iso?: string): Date {
  if (!iso?.trim()) return defaultLastModified();
  const raw = iso.trim();
  const d = new Date(raw.length === 10 ? `${raw}T12:00:00.000Z` : raw);
  return Number.isNaN(d.getTime()) ? defaultLastModified() : d;
}

/**
 * Monta todas as entradas do sitemap a partir dos registros (ações, FIIs, artigos).
 * Sem I/O: adequado para centenas de URLs; acima de ~50k, considere sitemap index (Google).
 */
export function buildSitemap(baseUrl: string): MetadataRoute.Sitemap {
  const base = baseUrl.replace(/\/$/, "");
  const fallback = defaultLastModified();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: fallback, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/simulador`, lastModified: fallback, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/setores`, lastModified: fallback, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/artigos`, lastModified: fallback, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/fiis`, lastModified: fallback, changeFrequency: "weekly", priority: 0.88 },
  ];

  const sectorRoutes = getAllSectorSlugs().map((slug) => ({
    url: `${base}${getSectorPath(slug)}`,
    lastModified: fallback,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const tickerBySymbol = Object.fromEntries(MOCK_STOCKS.map((s) => [s.ticker.toUpperCase(), s]));

  const acaoSlugParams = buildAllAcaoSlugStaticParams();
  const acaoSlugsForSitemap =
    process.env.SITEMAP_EXCLUDE_ACAO_URL_VARIANTS === "1"
      ? acaoSlugParams.filter(({ slug }) => parseAcaoSlug(slug).variant === "main")
      : acaoSlugParams;

  /** Só URLs com `index` explícito no metadata (alinha sitemap a robots). */
  const tickerRoutes = acaoSlugsForSitemap
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

  const fiiByTicker = Object.fromEntries(MOCK_FIIS.map((f) => [f.ticker.toUpperCase(), f]));

  const fiiRoutes = buildAllFiiSlugStaticParams()
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

  const articleRoutes = ALL_ARTICLES.map((a) => ({
    url: `${base}/artigos/${encodeURIComponent(a.slug)}`,
    lastModified: lastModFromIso(a.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...sectorRoutes, ...tickerRoutes, ...fiiRoutes, ...articleRoutes];
}
