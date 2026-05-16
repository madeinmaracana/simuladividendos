import type { MetadataRoute } from "next";
import { getSeoBaseUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSeoBaseUrl().replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        /*
         * Permitimos o crawl de todas as rotas públicas.
         * A indexação granular (quais URLs entram no índice) é controlada
         * pelo `robots` metadata de cada página — não pelo robots.txt.
         */
        allow: "/",
        disallow: [
          "/api/",   // rotas de API internas
          "/lab/",   // redireciona para /; sem conteúdo próprio
        ],
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      `${base}/acoes/sitemap.xml`,
      `${base}/fiis/sitemap.xml`,
      `${base}/artigos/sitemap.xml`,
      `${base}/comparar/sitemap.xml`,
      `${base}/setores/sitemap.xml`,
    ],
  };
}
