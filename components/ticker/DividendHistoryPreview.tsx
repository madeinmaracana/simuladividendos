import type { DividendEntry } from "@/lib/types";
import { formatBRL, formatDatePt } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type DividendHistoryPreviewProps = {
  items: DividendEntry[];
  currency: string;
  className?: string;
};

/** Lista curta dos últimos proventos (sem tabela). */
export function DividendHistoryPreview({ items, currency, className }: DividendHistoryPreviewProps) {
  if (!items.length) return null;

  return (
    <ul
      className={cn(
        "w-full min-w-0 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--card)]",
        className
      )}
    >
      {items.map((e, i) => (
        <li key={`${e.paymentDate}-${i}-${e.ratePerShare}`} className="px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className={cn(ui.body, "tabular-nums text-neutral-900 dark:text-neutral-100")}>
              {formatDatePt(e.paymentDate)}
            </span>
            <span className="text-base font-semibold tabular-nums text-neutral-900 dark:text-neutral-50">
              {formatBRL(e.ratePerShare, currency)}
            </span>
          </div>
          <p className={cn(ui.bodyMuted, "mt-1 text-xs sm:text-sm")}>{e.label}</p>
        </li>
      ))}
    </ul>
  );
}
