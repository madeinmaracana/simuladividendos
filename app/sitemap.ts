import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/lib/site";
import { getAllMockTickers, getAllSectorSlugs, getSectorPath, getTickerPath } from "@/lib/stocks-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = CANONICAL_SITE_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/setores`, lastModified, changeFrequency: "weekly", priority: 0.85 },
  ];

  const sectorRoutes = getAllSectorSlugs().map((slug) => ({
    url: `${base}${getSectorPath(slug)}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const tickerRoutes = getAllMockTickers().map((ticker) => ({
    url: `${base}${getTickerPath(ticker)}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...sectorRoutes, ...tickerRoutes];
}
