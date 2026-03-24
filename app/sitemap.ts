import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = CANONICAL_SITE_URL;

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/acoes/PETR4`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/acoes/VALE3`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/acoes/ITUB4`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
