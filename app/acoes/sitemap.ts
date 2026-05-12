import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";
import { buildAcoesSitemap } from "@/lib/sitemap/build-sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildAcoesSitemap(getSeoBaseUrl().replace(/\/$/, ""));
}
