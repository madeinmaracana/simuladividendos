import type { DividendEntry } from "@/lib/types";
import { formatBRL, formatDatePt } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

interface DividendTableProps {
  rows: DividendEntry[];
  currency: string;
  emptyMessage?: string;
}

export function DividendTable({
  rows,
  currency,
  emptyMessage = "Não há histórico de proventos disponível para exibir.",
}: DividendTableProps) {
  if (!rows.length) {
    return (
      <p
        className={cn(
          ui.body,
          "rounded-xl border border-dashed border-[var(--border)] bg-neutral-50/80 px-4 py-12 text-center dark:bg-neutral-900/40"
        )}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm dark:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/90">
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Data de pagamento
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Tipo
              </th>
              <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Valor / cota (estim.)
              </th>
            </tr>
          </thead>
          <tbody className="bg-[var(--card)]">
            {rows.map((row, i) => (
              <tr
                key={`${row.paymentDate}-${row.label}-${i}`}
                className="border-b border-[var(--border)] last:border-0 dark:border-neutral-800/80"
              >
                <td className="px-4 py-3 tabular-nums text-neutral-800 dark:text-neutral-200">
                  {formatDatePt(row.paymentDate)}
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{row.label}</td>
                <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
                  {formatBRL(row.ratePerShare, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
