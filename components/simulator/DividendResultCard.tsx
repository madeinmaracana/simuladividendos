import { cn } from "@/lib/cn";

export type DividendResultCardProps = {
  /** Ex.: "Último dividendo pago" */
  label: string;
  /** Frase curta acima do valor */
  lead: string;
  /** Valor formatado (ex.: R$ 1.234,56) */
  value: string;
  /** Rodapé (ex.: data) */
  footer?: string;
  /** Estado vazio / aviso */
  emptyMessage?: string;
  className?: string;
};

export function DividendResultCard({
  label,
  lead,
  value,
  footer,
  emptyMessage,
  className,
}: DividendResultCardProps) {
  const isEmpty = Boolean(emptyMessage);

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
      <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">{lead}</p>
      {isEmpty ? (
        <p className="mt-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{emptyMessage}</p>
      ) : (
        <>
          <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
            {value}
          </p>
          {footer ? (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">{footer}</p>
          ) : null}
        </>
      )}
    </div>
  );
}
