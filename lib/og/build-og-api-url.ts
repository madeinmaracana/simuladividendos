import { getSeoBaseUrl } from "@/lib/site";

export type OgApiUrlInput = {
  ticker: string;
  /** Nome da empresa/fundo (opcional, exibido de forma discreta na arte). */
  nome?: string | null;
  /** Valor já formatado para exibição, ex.: `R$ 0,02` (opcional — a API recalcula se omitido). */
  valor?: string | null;
  tipo?: "acao" | "fii";
};

/**
 * URL absoluta da imagem OG dinâmica (`/api/og`).
 * Quando `valor` é omitido, a rota resolve o valor a partir da cotação (cacheada).
 */
export function buildAbsoluteOgApiUrl(input: OgApiUrlInput): string {
  const base = getSeoBaseUrl().replace(/\/$/, "");
  const u = new URL("/api/og", base);
  const sym = input.ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  u.searchParams.set("ticker", sym || "B3");

  const nome = input.nome?.trim();
  if (nome) u.searchParams.set("nome", nome.slice(0, 120));

  const valor = input.valor
    ?.replace(/\u00a0/g, " ")
    .replace(/\u202f/g, " ")
    .trim();
  if (valor) u.searchParams.set("valor", valor.slice(0, 40));

  u.searchParams.set("tipo", input.tipo === "fii" ? "fii" : "acao");
  /** Bust de cache CDN após correção de corpo vazio / headers. */
  u.searchParams.set("ogv", "2");
  return u.toString();
}
