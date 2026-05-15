/**
 * Design system — classes Tailwind reutilizáveis.
 * TODAS as cores são hardcoded para o tema claro para evitar quebras em sistemas
 * que usam dark mode (prefers-color-scheme: dark).
 * Componentes do hero escuro usam classes próprias inline.
 */

export const ui = {
  /** Rótulo acima de campos / eyebrow de seção */
  eyebrow:
    "text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]",
  /** Rótulo de métrica / KPI em card */
  metricLabel:
    "text-xs font-medium uppercase tracking-wide text-[#6B7280]",
  /** Título principal de página (h1) */
  pageTitle:
    "text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl",
  /** Título de seção (h2) */
  sectionTitle: "text-2xl font-semibold tracking-tight text-[#111827]",
  /** Subtítulo de seção (h3) */
  subsectionTitle: "text-base font-semibold text-[#111827]",
  /** Corpo */
  body: "text-base leading-relaxed text-[#6B7280]",
  bodyMuted: "text-xs leading-relaxed text-[#6B7280]",
  /** Links de texto */
  link:
    "font-medium text-[#111827] underline-offset-2 transition hover:underline",
  /** Chip / pill para tickers e tags */
  pill:
    "inline-flex items-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm transition hover:border-[rgba(0,0,0,0.15)] hover:bg-[#F3F4F6]",
  pillGhost:
    "inline-flex items-center rounded-full border border-dashed border-[rgba(0,0,0,0.08)] bg-transparent px-3 py-1.5 text-xs font-semibold text-[#6B7280] transition hover:border-[rgba(0,0,0,0.15)] hover:text-[#111827]",
  /** Pill neutro (ex.: slug de setor) */
  pillNeutral:
    "inline-flex items-center rounded-full border border-[rgba(0,0,0,0.08)] bg-[#F3F4F6] px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm transition hover:border-[rgba(0,0,0,0.15)]",
  /** CTA secundário (âncora estilo botão) */
  ctaSecondary:
    "inline-flex items-center justify-center rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-white px-5 py-2.5 text-base font-semibold text-[#111827] shadow-sm transition hover:border-[rgba(0,0,0,0.15)] hover:bg-[#F3F4F6]",
  linkNav:
    "rounded-lg px-3 py-2 text-base font-medium text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#111827]",
  /** Card base (use com cn) */
  card:
    "rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white shadow-sm",
  /** Divisor de página */
  divider: "border-b border-[rgba(0,0,0,0.08)] pb-6",
  /** Listas */
  listOrdered:
    "ml-5 list-decimal space-y-2 text-base leading-relaxed text-[#6B7280]",
  listUnordered:
    "ml-5 list-disc space-y-2 text-base leading-relaxed text-[#6B7280]",
  /** Form */
  label: "text-base font-medium text-[#111827]",
  input:
    "w-full rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2.5 text-base text-[#111827] shadow-sm outline-none transition placeholder:text-[#6B7280] focus:border-[rgba(0,0,0,0.25)] focus:ring-2 focus:ring-[#3B3BDB]/15 disabled:cursor-not-allowed disabled:opacity-60",
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
    "min-w-0 w-full rounded-[16px] bg-[#F3F4F6] p-3 lg:col-span-5 lg:p-4",
} as const;
