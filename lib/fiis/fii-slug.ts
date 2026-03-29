/**
 * URLs de FIIs: principal `/fiis/MXRF11` e variações de intenção.
 * Indexação/canonical/sitemap: ver {@link isFiiVariantIndexable} em `data/fii-registry.ts`.
 *
 * `generateStaticParams` vive em `data/fii-registry.ts` (evita ciclo com a lista de fundos).
 */
export const FII_VARIANT_PAGA_QUANTO_POR_MES = "paga-quanto-por-mes" as const;
/** Variantes reconhecidas pelo parser (inclui aliases legados). */
export const FII_URL_VARIANTS = [
  "paga-quanto",
  "paga-quanto-por-mes",
  "simulador",
  "simulador-de-dividendos",
  "quanto-rende-100-cotas",
  "quanto-rende-500-cotas",
  "quanto-rende-1000-cotas",
] as const;
export type FiiUrlVariant = (typeof FII_URL_VARIANTS)[number];

/** Variantes canônicas geradas automaticamente e incluídas no sitemap. */
export const FII_URL_VARIANTS_GENERATED = [
  "paga-quanto",
  "simulador",
  "quanto-rende-100-cotas",
  "quanto-rende-1000-cotas",
] as const;

export type ParsedFiiSlug = {
  ticker: string;
  variant: "main" | FiiUrlVariant;
};

export function parseFiiSlug(raw: string): ParsedFiiSlug {
  const s = decodeURIComponent(raw).trim();
  const lower = s.toLowerCase();
  for (const v of FII_URL_VARIANTS) {
    const suf = `-${v}`;
    if (lower.endsWith(suf)) {
      const base = lower.slice(0, -suf.length);
      const ticker = base.toUpperCase();
      if (base.length >= 4) {
        return { ticker, variant: v };
      }
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

export function fiiVariantShares(variant: "main" | FiiUrlVariant): number | null {
  if (variant.startsWith("quanto-rende-") && variant.endsWith("-cotas")) {
    const n = Number(variant.replace("quanto-rende-", "").replace("-cotas", ""));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return null;
}
