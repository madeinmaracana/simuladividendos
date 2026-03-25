/**
 * URLs de ações: página principal `/acoes/PETR4` e variações de intenção `/acoes/petr4-dividendos`, etc.
 * Slug das variações usa ticker em minúsculas + sufixo (SEO e leitura humana).
 *
 * SEO: variações definem `rel=canonical` (e og:url) para a página principal do ticker; JSON-LD WebPage idem.
 * Links internos do site devem preferir `getTickerPath` / maiúsculas (visão geral).
 */
import { getAllMockTickers } from "@/data/stocks";

/**
 * Ordem: sufixos mais longos primeiro (ex.: `taee11-quanto-paga-dividendos` não pode casar só com `-dividendos`).
 */
export const ACAO_URL_VARIANTS = ["quanto-paga-dividendos", "dividendos", "paga-quanto", "simulador"] as const;
export type AcaoUrlVariant = (typeof ACAO_URL_VARIANTS)[number];

/** Variação `quanto-paga-dividendos` só é gerada para estes tickers (landing de intenção específica). */
export const ACAO_TICKERS_QUANTO_PAGA_DIVIDENDOS: readonly string[] = ["TAEE11"];

export type ParsedAcaoSlug = {
  ticker: string;
  variant: "main" | AcaoUrlVariant;
};

export function parseAcaoSlug(raw: string): ParsedAcaoSlug {
  const s = decodeURIComponent(raw).trim();
  const lower = s.toLowerCase();

  for (const v of ACAO_URL_VARIANTS) {
    const suf = `-${v}`;
    if (lower.endsWith(suf)) {
      const base = lower.slice(0, -suf.length);
      if (base.length >= 4) {
        return { ticker: base.toUpperCase(), variant: v };
      }
    }
  }

  return { ticker: s.toUpperCase(), variant: "main" };
}

/** Slug exibido na URL para uma variação (minúsculas). */
export function acaoVariantSlug(ticker: string, variant: AcaoUrlVariant): string {
  return `${ticker.trim().toLowerCase()}-${variant}`;
}

/** Slug da página principal (mantém maiúsculas como hoje). */
export function acaoMainSlug(ticker: string): string {
  return ticker.trim().toUpperCase();
}

/** `generateStaticParams` para `app/acoes/[slug]`. */
export function buildAllAcaoSlugStaticParams(): { slug: string }[] {
  const tickers = getAllMockTickers();
  const out: { slug: string }[] = [];
  const quantoSet = new Set(ACAO_TICKERS_QUANTO_PAGA_DIVIDENDOS.map((x) => x.toUpperCase()));

  for (const t of tickers) {
    const tu = t.trim().toUpperCase();
    out.push({ slug: acaoMainSlug(t) });
    for (const v of ACAO_URL_VARIANTS) {
      if (v === "quanto-paga-dividendos" && !quantoSet.has(tu)) continue;
      out.push({ slug: acaoVariantSlug(t, v) });
    }
  }
  return out;
}

export function acaoPathFromSlug(slug: string): string {
  return `/acoes/${encodeURIComponent(slug.trim())}`;
}
