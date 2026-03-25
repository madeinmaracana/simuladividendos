import { cn } from "@/lib/cn";

export type DividendResultCardProps = {
  /** Ex.: "Último dividendo pago" */
  label: string;
  /** Frase curta acima do valor */
  lead: string;
  /** Quando há `emptyMessage`, substitui `lead` (evita promessa vazia). */
  leadWhenEmpty?: string;
  /** Valor formatado (ex.: R$ 1.234,56) */
  value: string;
  /** Rodapé (ex.: data) */
  footer?: string;
  /** Estado vazio / aviso */
  emptyMessage?: string;
  /** Linha extra abaixo do vazio (ex.: contexto de frequência histórica). */
  emptySecondary?: string;
  className?: string;
};

export function DividendResultCard({
  label,
  lead,
  leadWhenEmpty,
  value,
  footer,
  emptyMessage,
  emptySecondary,
  className,
}: DividendResultCardProps) {
  const isEmpty = Boolean(emptyMessage);
  const leadShown = isEmpty && leadWhenEmpty ? leadWhenEmpty : lead;

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-[var(--border)] bg-neutral-50/80 p-6 sm:p-8",
        "dark:border-neutral-800 dark:bg-neutral-900/40",
        className
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">{leadShown}</p>
      {isEmpty ? (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{emptyMessage}</p>
          {emptySecondary ? (
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">{emptySecondary}</p>
          ) : null}
        </div>
      ) : (
        <>
          <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
            {value}
          </p>
          {footer ? (
            <p className="mt-4 whitespace-pre-line text-sm text-neutral-500 dark:text-neutral-400">{footer}</p>
          ) : null}
        </>
      )}
    </div>
  );
}
