/**
 * Design system leve — classes Tailwind reutilizáveis.
 * Tokens em :root (app/globals.css): --border, --card, --foreground, --accent, sombras, raios.
 */

export const ui = {
  /** Rótulo acima de campos (eyebrow de página) */
  eyebrow: "text-xs font-semibold uppercase tracking-[0.14em] text-teal-700 dark:text-teal-400",
  /** Rótulo de métrica / KPI em card */
  metricLabel: "text-xs font-medium uppercase tracking-wide text-teal-700 dark:text-teal-400",
  /** Título principal de página (h1) */
  pageTitle: "text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50",
  /** Título de seção (h2) */
  sectionTitle: "text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50",
  /** Subtítulo de seção (h3) */
  subsectionTitle: "text-base font-semibold text-neutral-900 dark:text-neutral-50",
  /** Corpo */
  body: "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400",
  bodyMuted: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-500",
  /** Links de texto */
  link: "font-medium text-teal-700 underline-offset-2 transition hover:text-teal-800 hover:underline dark:text-teal-400 dark:hover:text-teal-300",
  /** Chip / pill para tickers e tags */
  pill:
    "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-sm transition hover:border-teal-400 hover:bg-teal-50 dark:text-teal-300 dark:hover:border-teal-700 dark:hover:bg-teal-950/40",
  pillGhost:
    "inline-flex items-center rounded-full border border-dashed border-neutral-300 bg-transparent px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:border-teal-400 hover:text-teal-800 dark:border-neutral-600 dark:text-neutral-400 dark:hover:text-teal-300",
  /** Pill neutro (ex.: slug de setor) */
  pillNeutral:
    "inline-flex items-center rounded-full border border-[var(--border)] bg-neutral-50/90 px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm transition hover:border-teal-400 hover:bg-teal-50/50 dark:bg-neutral-800/60 dark:text-neutral-200 dark:hover:border-teal-700",
  /** CTA secundário (âncora estilo botão) */
  ctaSecondary:
    "inline-flex items-center justify-center rounded-[length:var(--radius-input)] border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-teal-800 shadow-sm transition hover:border-teal-500/40 hover:bg-teal-50 dark:text-teal-300 dark:hover:bg-teal-950/50",
  linkNav:
    "rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-teal-800 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-teal-300",
  /** Card base (use com Card ou cn) */
  card: "rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-card",
  /** Divisor de página */
  divider: "border-b border-[var(--border)] pb-6 dark:border-neutral-800",
  /** Listas numeradas / bullets */
  listOrdered: "ml-5 list-decimal space-y-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400",
  listUnordered: "ml-5 list-disc space-y-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400",
  /** Form */
  label: "text-sm font-medium text-neutral-700 dark:text-neutral-300",
  input:
    "w-full rounded-[length:var(--radius-input)] border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-60 dark:placeholder:text-neutral-500",
  /** Espaçamento vertical entre seções principais (largura total da área útil do layout). */
  stackPage: "flex w-full min-w-0 flex-col gap-10 sm:gap-12",
  stackSection: "flex w-full min-w-0 flex-col gap-4",
  /**
   * Seção ou bloco que deve alinhar à mesma coluna que o restante da página.
   * Evita max-width soltos que criam “dentes” entre blocos.
   */
  pageSection: "w-full min-w-0",
  /**
   * Shell horizontal único do site — deve espelhar `app/layout.tsx`.
   * max-width + padding X; não repetir px/max-width em páginas internas.
   */
  pageShell: "mx-auto w-full max-w-[var(--page-max)] px-4 sm:px-6 lg:px-10",
  /**
   * Grade da página de ticker: 1 coluna no mobile, 12 colunas no desktop.
   * `gap-x-6` alinha com o gutter entre hero e simulador no topo.
   */
  tickerPageGrid: "grid w-full min-w-0 grid-cols-1 gap-y-10 sm:gap-y-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12",
  /** Linha que ocupa as 12 colunas da grade do ticker. */
  tickerPageRow: "col-span-full w-full min-w-0",
  /** Subgrade: hero (7) + simulador (5) em lg; uma coluna no mobile. */
  tickerTopGrid:
    "grid w-full min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0",
  tickerTopMain: "min-w-0 lg:col-span-7",
  tickerTopAside:
    "min-w-0 w-full rounded-2xl bg-neutral-50/70 p-3 dark:bg-neutral-900/35 lg:col-span-5 lg:p-4",
} as const;
