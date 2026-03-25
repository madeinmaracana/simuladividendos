import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";
import { buildSitemap } from "@/lib/sitemap/build-sitemap";

/** Sitemap dinâmico: URLs derivadas de `data/stocks`, `data/fiis`, `data/articles` (ver `data/sitemap-sources.ts`). */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(getSeoBaseUrl());
}
