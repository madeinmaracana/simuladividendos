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
export const ACAO_QUANTO_RENDE_COTAS = [100, 500, 1000] as const;
export const ACAO_URL_VARIANTS = [
  "quanto-rende-100-cotas",
  "quanto-rende-500-cotas",
  "quanto-rende-1000-cotas",
  "quanto-paga-dividendos",
  "simulador-de-dividendos",
  "dividendos",
  "paga-quanto",
  "simulador",
] as const;
export type AcaoUrlVariant = (typeof ACAO_URL_VARIANTS)[number];

/** Variantes geradas e promovidas (qualidade > volume). */
export const ACAO_URL_VARIANTS_GENERATED = [
  "dividendos",
  "paga-quanto",
  "simulador",
  "quanto-rende-100-cotas",
  "quanto-paga-dividendos",
] as const;

/** Em ações, `quanto-rende-1000-cotas` só para ativos mais fortes. */
export const ACAO_TICKERS_STRONG_1000: readonly string[] = [
  "PETR4",
  "VALE3",
  "ITUB4",
  "BBAS3",
  "TAEE11",
  "EGIE3",
] as const;

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
  const strong1000 = new Set(ACAO_TICKERS_STRONG_1000.map((x) => x.toUpperCase()));

  for (const t of tickers) {
    const tu = t.trim().toUpperCase();
    out.push({ slug: acaoMainSlug(t) });
    for (const v of ACAO_URL_VARIANTS_GENERATED) {
      if (v === "quanto-paga-dividendos" && !quantoSet.has(tu)) continue;
      out.push({ slug: acaoVariantSlug(t, v) });
    }
    if (strong1000.has(tu)) {
      out.push({ slug: acaoVariantSlug(t, "quanto-rende-1000-cotas") });
    }
  }
  return out;
}

export function acaoPathFromSlug(slug: string): string {
  return `/acoes/${encodeURIComponent(slug.trim())}`;
}

export function acaoVariantShares(variant: "main" | AcaoUrlVariant): number | null {
  if (variant.startsWith("quanto-rende-") && variant.endsWith("-cotas")) {
    const n = Number(variant.replace("quanto-rende-", "").replace("-cotas", ""));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return null;
}

/** Regra de indexação por intenção (qualidade > volume, reduz canibalização). */
export function isAcaoVariantIndexable(ticker: string, variant: "main" | AcaoUrlVariant): boolean {
  if (variant === "main") return true;
  if (variant === "paga-quanto" || variant === "quanto-rende-100-cotas" || variant === "simulador") return true;
  if (variant === "quanto-rende-1000-cotas") {
    const t = ticker.trim().toUpperCase();
    return ACAO_TICKERS_STRONG_1000.map((x) => x.toUpperCase()).includes(t);
  }
  return false;
}
