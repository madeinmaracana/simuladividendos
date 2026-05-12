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
    <ul className={`w-full min-w-0 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] overflow-hidden${className ? ` ${className}` : ""}`}>
      {items.map((e, i) => (
        <li
          key={`${e.paymentDate}-${i}-${e.ratePerShare}`}
          className="border-b border-[rgba(120,120,120,0.20)] px-4 py-3.5 last:border-0"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <div>
              <p className="text-[13px] font-medium text-[#808080]">{e.label}</p>
              <p className="text-[13px] font-medium text-white">{formatDatePt(e.paymentDate)}</p>
            </div>
            <span className="text-[13px] font-semibold tabular-nums text-white">
              {formatBRL(e.ratePerShare, currency)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
