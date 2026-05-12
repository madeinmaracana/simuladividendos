import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSeoBaseUrl().replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/acoes/sitemap.xml`,
      `${base}/fiis/sitemap.xml`,
      `${base}/artigos/sitemap.xml`,
      `${base}/setores/sitemap.xml`,
      `${base}/comparar/sitemap.xml`,
    ],
  };
}
