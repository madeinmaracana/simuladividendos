import type { DividendEntry } from "@/lib/types";
import { formatBRL, formatDatePt } from "@/lib/format";

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
      <p className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[320px] text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/80">
            <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">
              Data de pagamento
            </th>
            <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Tipo</th>
            <th className="px-4 py-3 text-right font-medium text-neutral-600 dark:text-neutral-300">
              Valor / cota (estim.)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row.paymentDate}-${row.label}-${i}`}
              className="border-b border-neutral-100 last:border-0 dark:border-neutral-800/80"
            >
              <td className="px-4 py-2.5 tabular-nums text-neutral-800 dark:text-neutral-200">
                {formatDatePt(row.paymentDate)}
              </td>
              <td className="px-4 py-2.5 text-neutral-600 dark:text-neutral-400">{row.label}</td>
              <td className="px-4 py-2.5 text-right tabular-nums font-medium text-neutral-900 dark:text-neutral-100">
                {formatBRL(row.ratePerShare, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
