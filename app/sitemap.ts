import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";

/**
 * Sitemap principal — páginas estáticas de alto nível.
 * Páginas dinâmicas (tickers, artigos, comparações, setores) têm seus
 * próprios sitemaps em /acoes/sitemap.xml, /fiis/sitemap.xml, etc.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSeoBaseUrl().replace(/\/$/, "");
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/acoes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/fiis`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/artigos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/comparar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/calculadora-renda-passiva`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/melhores-acoes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${base}/melhores-fiis`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
  ];
}
