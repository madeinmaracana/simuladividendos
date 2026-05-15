import type { DividendEntry } from "@/lib/types";
import { formatBRL, formatDatePt } from "@/lib/format";

type DividendHistoryPreviewProps = {
  items: DividendEntry[];
  currency: string;
  className?: string;
};

export function DividendHistoryPreview({ items, currency, className }: DividendHistoryPreviewProps) {
  if (!items.length) return null;

  return (
    <ul className={`w-full min-w-0 rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white overflow-hidden${className ? ` ${className}` : ""}`}>
      {items.map((e, i) => (
        <li
          key={`${e.paymentDate}-${i}-${e.ratePerShare}`}
          className="border-b border-[rgba(0,0,0,0.08)] px-4 py-3.5 last:border-0"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <div>
              <p className="text-[13px] font-medium text-[#6B7280]">{e.label}</p>
              <p className="text-[13px] font-semibold text-[#111827]">{formatDatePt(e.paymentDate)}</p>
            </div>
            <span className="text-[13px] font-semibold tabular-nums text-[#111827]">
              {formatBRL(e.ratePerShare, currency)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
