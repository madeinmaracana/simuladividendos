import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";
import { buildArtigosSitemap } from "@/lib/sitemap/build-sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildArtigosSitemap(getSeoBaseUrl().replace(/\/$/, ""));
}
