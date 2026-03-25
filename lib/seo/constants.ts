export const SITE_NAME = "Simula Dividendos";
export const OG_LOCALE = "pt_BR";

/** Prefixos de rota estáveis para sitemap e links programáticos. */
export const ROUTES = {
  home: "/",
  simulador: "/simulador",
  setores: "/setores",
  artigos: "/artigos",
  acao: (ticker: string) => `/acoes/${encodeURIComponent(ticker.trim().toUpperCase())}`,
  setor: (slug: string) => `/setores/${encodeURIComponent(slug)}`,
  artigo: (slug: string) => `/artigos/${encodeURIComponent(slug.trim().toLowerCase())}`,
} as const;
