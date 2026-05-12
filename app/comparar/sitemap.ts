import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";
import { buildCompararSitemap } from "@/lib/sitemap/build-sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildCompararSitemap(getSeoBaseUrl().replace(/\/$/, ""));
}
