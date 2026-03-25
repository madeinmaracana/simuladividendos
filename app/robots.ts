import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSeoBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
