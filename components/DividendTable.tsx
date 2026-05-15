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
          "rounded-xl border border-dashed border-[rgba(0,0,0,0.08)] bg-white px-4 py-12 text-center"
        )}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(0,0,0,0.08)] bg-[#F9FAFB]">
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Data de pagamento
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Tipo
              </th>
              <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Valor / cota (estim.)
              </th>
            </tr>
          </thead>
          <tbody className="bg-[var(--card)]">
            {rows.map((row, i) => (
              <tr
                key={`${row.paymentDate}-${row.label}-${i}`}
                className="border-b border-[rgba(0,0,0,0.08)] last:border-0"
              >
                <td className="px-4 py-3 tabular-nums text-[#111827]">
                  {formatDatePt(row.paymentDate)}
                </td>
                <td className="px-4 py-3 text-[#6B7280]">{row.label}</td>
                <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums text-[#111827]">
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
