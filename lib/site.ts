/** Domínio canônico para SEO (sitemap, Open Graph, robots). */
export const CANONICAL_SITE_URL = "https://www.simuladividendos.com";

/**
 * URL pública do site em runtime (preview Vercel, env, ou canônico).
 * Use em links internos quando quiser refletir o host atual.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return CANONICAL_SITE_URL;
}

/** Base para metadata, sitemap e robots (sempre produção canônica se não houver env). */
export function getSeoBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return CANONICAL_SITE_URL;
}
