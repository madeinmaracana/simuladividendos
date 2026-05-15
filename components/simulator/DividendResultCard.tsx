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
        "flex flex-col rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm sm:p-8",
        className
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
        {label}
      </span>
      <p className="mt-3 text-sm font-medium text-[#6B7280]">{leadShown}</p>
      {isEmpty ? (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm leading-relaxed text-[#6B7280]">{emptyMessage}</p>
          {emptySecondary ? (
            <p className="text-xs leading-relaxed text-[#6B7280]">{emptySecondary}</p>
          ) : null}
        </div>
      ) : (
        <>
          <p className="mt-2 font-mono text-3xl font-semibold tabular-nums tracking-tight text-[#111827] sm:text-4xl">
            {value}
          </p>
          {footer ? (
            <p className="mt-4 whitespace-pre-line text-sm text-[#6B7280]">{footer}</p>
          ) : null}
        </>
      )}
    </div>
  );
}
