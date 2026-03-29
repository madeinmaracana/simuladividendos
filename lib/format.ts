export function formatBRL(value: number, currency: string = "BRL"): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Mesmo valor que `formatBRL`, sem espaços tipográficos (NBSP) — seguro para query strings e OG. */
export function formatBRLForOg(value: number, currency: string = "BRL"): string {
  return formatBRL(value, currency)
    .replace(/\u00a0/g, " ")
    .replace(/\u202f/g, " ")
    .trim();
}

/** Alias explícito para textos gerados (páginas de ticker). */
export const formatCurrencyBRL = formatBRL;

/** Parse valor monetário digitado (pt-BR: vírgula decimal, ponto milhar opcional). */
export function parseBRLInput(s: string): number {
  const t = s.trim().replace(/\s/g, "");
  if (!t) return 0;
  const normalized = t.includes(",")
    ? t.replace(/\./g, "").replace(",", ".")
    : t.replace(/\./g, "");
  const n = parseFloat(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/** Formata número para campo de texto (ex.: investimento inicial). */
export function formatPlainCurrencyInput(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentBr(value: number, fractionDigits = 2): string {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}%`;
}

export function formatDatePt(iso: string): string {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** Alias para narrativas e SEO de ticker. */
export const formatDatePTBR = formatDatePt;
