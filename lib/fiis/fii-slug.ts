/**
 * URLs de FIIs: principal `/fiis/MXRF11` e variações de intenção, ex. `/fiis/mxrf11-paga-quanto-por-mes`.
 * Variações usam `rel=canonical` para a página principal do ticker (igual às ações).
 *
 * `generateStaticParams` vive em `data/fii-registry.ts` (evita ciclo com a lista de fundos).
 */
export const FII_VARIANT_PAGA_QUANTO_POR_MES = "paga-quanto-por-mes" as const;
export type FiiUrlVariant = typeof FII_VARIANT_PAGA_QUANTO_POR_MES;

/** Tickers que têm landing `*-paga-quanto-por-mes`. */
export const FII_TICKERS_PAGA_QUANTO_POR_MES: readonly string[] = ["MXRF11"];

export type ParsedFiiSlug = {
  ticker: string;
  variant: "main" | FiiUrlVariant;
};

export function parseFiiSlug(raw: string): ParsedFiiSlug {
  const s = decodeURIComponent(raw).trim();
  const lower = s.toLowerCase();
  const suf = `-${FII_VARIANT_PAGA_QUANTO_POR_MES}`;
  if (lower.endsWith(suf)) {
    const base = lower.slice(0, -suf.length);
    const ticker = base.toUpperCase();
    if (base.length >= 4 && FII_TICKERS_PAGA_QUANTO_POR_MES.includes(ticker)) {
      return { ticker, variant: FII_VARIANT_PAGA_QUANTO_POR_MES };
    }
  }

  return { ticker: s.toUpperCase(), variant: "main" };
}

export function fiiMainSlug(ticker: string): string {
  return ticker.trim().toUpperCase();
}

export function fiiVariantSlug(ticker: string, variant: FiiUrlVariant): string {
  return `${ticker.trim().toLowerCase()}-${variant}`;
}

export function fiiPathFromSlug(slug: string): string {
  return `/fiis/${encodeURIComponent(slug.trim())}`;
}
