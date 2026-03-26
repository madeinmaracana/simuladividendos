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
        "flex flex-col rounded-[length:var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8",
        className
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-soft)]">
        {label}
      </span>
      <p className="mt-3 text-sm font-medium text-[color:var(--text-secondary)]">{leadShown}</p>
      {isEmpty ? (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm leading-relaxed text-[color:var(--text-soft)]">{emptyMessage}</p>
          {emptySecondary ? (
            <p className="text-xs leading-relaxed text-[color:var(--text-soft)]">{emptySecondary}</p>
          ) : null}
        </div>
      ) : (
        <>
          <p className="mt-2 font-mono text-3xl font-semibold tabular-nums tracking-tight text-[color:var(--text)] sm:text-4xl">
            {value}
          </p>
          {footer ? (
            <p className="mt-4 whitespace-pre-line text-sm text-[color:var(--text-soft)]">{footer}</p>
          ) : null}
        </>
      )}
    </div>
  );
}
