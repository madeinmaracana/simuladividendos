import type { DividendEntry } from "@/lib/types";
import { formatBRL, formatDatePt } from "@/lib/format";
import { dividendPaymentStatus } from "@/lib/dividend-history";
import { cn } from "@/lib/cn";

type DividendHistoryTableProps = {
  rows: DividendEntry[];
  currency: string;
  className?: string;
  /** Acessibilidade: resumo da tabela para leitores de tela. */
  caption?: string;
};

/** Tabela completa do histórico (uso após expansão ou páginas que precisem só da tabela). */
export function DividendHistoryTable({
  rows,
  currency,
  className,
  caption = "Histórico completo de proventos",
}: DividendHistoryTableProps) {
  const sorted = [...rows].sort((a, b) => Date.parse(b.paymentDate) - Date.parse(a.paymentDate));

  if (!sorted.length) return null;

  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-x-auto rounded-xl border border-[var(--border)] shadow-sm dark:shadow-none",
        className
      )}
    >
      <table className="w-full min-w-[var(--table-min-history)] text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-[var(--border)] bg-neutral-50 dark:bg-neutral-900/80">
            <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:px-4">
              Pagamento
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:px-4">
              Data ex
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:px-4">
              Valor / ação
            </th>
            <th className="min-w-28 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:px-4">
              Tipo
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:px-4">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)] bg-[var(--card)]">
          {sorted.map((e, i) => (
            <tr key={`${e.paymentDate}-${i}-${e.ratePerShare}`}>
              <td className="whitespace-nowrap px-3 py-3 tabular-nums text-neutral-800 dark:text-neutral-200 sm:px-4">
                {formatDatePt(e.paymentDate)}
              </td>
              <td className="whitespace-nowrap px-3 py-3 tabular-nums text-neutral-600 dark:text-neutral-400 sm:px-4">
                {e.exDate ? formatDatePt(e.exDate) : "—"}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-right font-semibold tabular-nums text-neutral-900 dark:text-neutral-100 sm:px-4">
                {formatBRL(e.ratePerShare, currency)}
              </td>
              <td className="px-3 py-3 text-neutral-600 dark:text-neutral-400 sm:px-4">{e.label}</td>
              <td className="whitespace-nowrap px-3 py-3 text-neutral-600 dark:text-neutral-400 sm:px-4">
                {dividendPaymentStatus(e.paymentDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
