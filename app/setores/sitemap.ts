import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";
import { buildSetoresSitemap } from "@/lib/sitemap/build-sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSetoresSitemap(getSeoBaseUrl().replace(/\/$/, ""));
}
