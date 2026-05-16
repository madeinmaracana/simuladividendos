import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSeoBaseUrl().replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/fiis/"],
        disallow: [
          "/acoes/",
          "/artigos/",
          "/calculadora-renda-passiva/",
          "/comparar/",
          "/lab/",
          "/melhores-acoes/",
          "/melhores-acoes-dividendos/",
          "/melhores-fiis/",
          "/setores/",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
