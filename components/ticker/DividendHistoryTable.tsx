import type { DividendEntry } from "@/lib/types";
import { formatBRL, formatDatePt } from "@/lib/format";
import { dividendPaymentStatus } from "@/lib/dividend-history";
import { cn } from "@/lib/cn";

type DividendHistoryTableProps = {
  rows: DividendEntry[];
  currency: string;
  className?: string;
  caption?: string;
};

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
        "w-full min-w-0 overflow-x-auto rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)]",
        className
      )}
    >
      <table className="w-full text-left">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-[rgba(120,120,120,0.20)]">
            <th className="whitespace-nowrap px-4 py-3 text-[13px] font-medium text-[#808080]">Pagamento</th>
            <th className="whitespace-nowrap px-4 py-3 text-[13px] font-medium text-[#808080]">Data ex</th>
            <th className="whitespace-nowrap px-4 py-3 text-right text-[13px] font-medium text-[#808080]">Valor / ação</th>
            <th className="min-w-28 px-4 py-3 text-[13px] font-medium text-[#808080]">Tipo</th>
            <th className="whitespace-nowrap px-4 py-3 text-[13px] font-medium text-[#808080]">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(120,120,120,0.20)]">
          {sorted.map((e, i) => (
            <tr key={`${e.paymentDate}-${i}-${e.ratePerShare}`}>
              <td className="whitespace-nowrap px-4 py-3 text-[13px] font-medium tabular-nums text-white">
                {formatDatePt(e.paymentDate)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-[13px] font-medium tabular-nums text-[#808080]">
                {e.exDate ? formatDatePt(e.exDate) : "—"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-[13px] font-semibold tabular-nums text-white">
                {formatBRL(e.ratePerShare, currency)}
              </td>
              <td className="px-4 py-3 text-[13px] font-medium text-[#808080]">{e.label}</td>
              <td className="whitespace-nowrap px-4 py-3 text-[13px] font-medium text-[#808080]">
                {dividendPaymentStatus(e.paymentDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
