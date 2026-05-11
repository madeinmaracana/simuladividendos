/**
 * Design system — classes Tailwind reutilizáveis.
 * Tokens primários definidos em app/tokens.css com prefixo --color-*.
 * Tokens sem prefixo (--shadow-*, --radius-*, --accent) não têm equivalente --color-.
 */

export const ui = {
  /** Rótulo acima de campos / eyebrow de seção */
  eyebrow:
    "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-soft)]",
  /** Rótulo de métrica / KPI em card */
  metricLabel:
    "text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)]",
  /** Título principal de página (h1) */
  pageTitle:
    "text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl",
  /** Título de seção (h2) */
  sectionTitle: "text-2xl font-semibold tracking-tight text-[var(--color-text)]",
  /** Subtítulo de seção (h3) */
  subsectionTitle: "text-base font-semibold text-[var(--color-text)]",
  /** Corpo */
  body: "text-base leading-relaxed text-[var(--color-text-muted)]",
  bodyMuted: "text-xs leading-relaxed text-[var(--color-text-soft)]",
  /** Links de texto */
  link:
    "font-medium text-[var(--color-text)] underline-offset-2 transition hover:underline",
  /** Chip / pill para tickers e tags */
  pill:
    "inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text)] shadow-[var(--shadow-sm)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)]",
  pillGhost:
    "inline-flex items-center rounded-full border border-dashed border-[var(--color-border)] bg-transparent px-3 py-1.5 text-xs font-semibold text-[var(--color-text-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]",
  /** Pill neutro (ex.: slug de setor) */
  pillNeutral:
    "inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text)] shadow-[var(--shadow-sm)] transition hover:border-[var(--color-border-strong)]",
  /** CTA secundário (âncora estilo botão) */
  ctaSecondary:
    "inline-flex items-center justify-center rounded-[length:var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-base font-semibold text-[var(--color-text)] shadow-[var(--shadow-sm)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)]",
  linkNav:
    "rounded-lg px-3 py-2 text-base font-medium text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
  /** Card base (use com cn) */
  card:
    "rounded-[length:var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]",
  /** Divisor de página */
  divider: "border-b border-[var(--color-border)] pb-6",
  /** Listas */
  listOrdered:
    "ml-5 list-decimal space-y-2 text-base leading-relaxed text-[var(--color-text-muted)]",
  listUnordered:
    "ml-5 list-disc space-y-2 text-base leading-relaxed text-[var(--color-text-muted)]",
  /** Form */
  label: "text-base font-medium text-[var(--color-text)]",
  input:
    "w-full rounded-[length:var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-base text-[var(--color-text)] shadow-[var(--shadow-sm)] outline-none transition placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 disabled:cursor-not-allowed disabled:opacity-60",
  /** Espaçamento vertical entre seções (largura total da área útil). */
  stackPage: "flex w-full min-w-0 flex-col gap-12 sm:gap-12",
  stackSection: "flex w-full min-w-0 flex-col gap-4",
  /**
   * Seção que deve alinhar à mesma coluna que o restante da página.
   */
  pageSection: "w-full min-w-0",
  /**
   * Shell horizontal único — espelha app/layout.tsx.
   * Não repetir px/max-width em páginas internas.
   */
  pageShell: "mx-auto w-full max-w-[var(--page-max)] px-4 sm:px-6 lg:px-12",
  /**
   * Grade da página de ticker: 1 coluna no mobile, 12 no desktop.
   */
  tickerPageGrid:
    "grid w-full min-w-0 grid-cols-1 gap-y-10 sm:gap-y-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12",
  tickerPageRow: "col-span-full w-full min-w-0",
  /** Subgrade: hero (7) + simulador (5) em lg. */
  tickerTopGrid:
    "grid w-full min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0",
  tickerTopMain: "min-w-0 lg:col-span-7",
  tickerTopAside:
    "min-w-0 w-full rounded-[length:var(--radius-lg)] bg-[var(--color-surface-muted)] p-3 lg:col-span-5 lg:p-4",
} as const;
