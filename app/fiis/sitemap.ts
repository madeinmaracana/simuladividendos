import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";
import { buildFiisSitemap } from "@/lib/sitemap/build-sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildFiisSitemap(getSeoBaseUrl().replace(/\/$/, ""));
}
