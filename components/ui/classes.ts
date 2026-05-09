/**
 * Design system leve — classes Tailwind reutilizáveis.
 * Tokens em :root (app/globals.css): --border, --card, --foreground, --accent, sombras, raios.
 */

export const ui = {
  /** Rótulo acima de campos (eyebrow de página) */
  eyebrow:
    "text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--text-soft)]",
  /** Rótulo de métrica / KPI em card */
  metricLabel:
    "text-xs font-medium uppercase tracking-wide text-[color:var(--text-soft)]",
  /** Título principal de página (h1) */
  pageTitle:
    "text-2xl font-semibold tracking-tight text-[color:var(--text)] sm:text-3xl",
  /** Título de seção (h2) */
  sectionTitle: "text-2xl font-semibold tracking-tight text-[color:var(--text)]",
  /** Subtítulo de seção (h3) */
  subsectionTitle: "text-base font-semibold text-[color:var(--text)]",
  /** Corpo */
  body: "text-base leading-relaxed text-[color:var(--text-muted)]",
  bodyMuted: "text-xs leading-relaxed text-[color:var(--text-soft)]",
  /** Links de texto */
  link:
    "font-medium text-[color:var(--text)] underline-offset-2 transition hover:underline",
  /** Chip / pill para tickers e tags */
  pill:
    "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[color:var(--text)] shadow-[var(--shadow-sm)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]",
  pillGhost:
    "inline-flex items-center rounded-full border border-dashed border-[var(--border)] bg-transparent px-3 py-1.5 text-xs font-semibold text-[color:var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[color:var(--text)]",
  /** Pill neutro (ex.: slug de setor) */
  pillNeutral:
    "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-semibold text-[color:var(--text)] shadow-[var(--shadow-sm)] transition hover:border-[var(--border-strong)]",
  /** CTA secundário (âncora estilo botão) */
  ctaSecondary:
    "inline-flex items-center justify-center rounded-[length:var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-base font-semibold text-[color:var(--text)] shadow-[var(--shadow-sm)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]",
  linkNav:
    "rounded-lg px-3 py-2 text-base font-medium text-[color:var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[color:var(--text)]",
  /** Card base (use com Card ou cn) */
  card:
    "rounded-[length:var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]",
  /** Divisor de página */
  divider: "border-b border-[var(--border)] pb-6",
  /** Listas numeradas / bullets */
  listOrdered: "ml-5 list-decimal space-y-2 text-base leading-relaxed text-neutral-600 dark:text-neutral-400",
  listUnordered: "ml-5 list-disc space-y-2 text-base leading-relaxed text-neutral-600 dark:text-neutral-400",
  /** Form */
  label: "text-base font-medium text-[color:var(--text)]",
  input:
    "w-full rounded-[length:var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-base text-[color:var(--text)] shadow-[var(--shadow-sm)] outline-none transition placeholder:text-[color:var(--text-soft)] focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[color:var(--accent)]/15 disabled:cursor-not-allowed disabled:opacity-60",
  /** Espaçamento vertical entre seções principais (largura total da área útil do layout). */
  stackPage: "flex w-full min-w-0 flex-col gap-12 sm:gap-12",
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
  pageShell: "mx-auto w-full max-w-[var(--page-max)] px-4 sm:px-6 lg:px-12",
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
    "min-w-0 w-full rounded-[length:var(--radius-lg)] bg-[var(--surface-muted)] p-3 lg:col-span-5 lg:p-4",
} as const;
