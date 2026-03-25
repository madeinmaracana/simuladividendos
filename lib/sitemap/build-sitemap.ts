import type { MetadataRoute } from "next";
import {
  ALL_ARTICLES,
  getAllSectorSlugs,
  getFiiPath,
  getSectorPath,
  getTickerPath,
  MOCK_FIIS,
  MOCK_STOCKS,
} from "@/data/sitemap-sources";

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

  const tickerRoutes = MOCK_STOCKS.map((s) => ({
    url: `${base}${getTickerPath(s.ticker)}`,
    lastModified: lastModFromIso(s.lastModified),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const fiiRoutes = MOCK_FIIS.map((f) => ({
    url: `${base}${getFiiPath(f.ticker)}`,
    lastModified: lastModFromIso(f.lastModified),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleRoutes = ALL_ARTICLES.map((a) => ({
    url: `${base}/artigos/${encodeURIComponent(a.slug)}`,
    lastModified: lastModFromIso(a.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...sectorRoutes, ...tickerRoutes, ...fiiRoutes, ...articleRoutes];
}
