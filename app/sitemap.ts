import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";

/** Sitemap reduzido — apenas a home está indexada. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSeoBaseUrl().replace(/\/$/, "");
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
