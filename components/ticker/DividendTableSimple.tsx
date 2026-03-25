import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import type { DividendTableColumn } from "@/lib/ticker-page/table";

type DividendTableSimpleProps = {
  id?: string;
  rows: DividendTableColumn[];
};

export function DividendTableSimple({ id = "heading-tabela-dividendos", rows }: DividendTableSimpleProps) {
  return (
    <section aria-labelledby={id} className={ui.pageSection}>
      <h2 id={id} className={cn("text-left", ui.sectionTitle)}>
        Em um relance
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm dark:shadow-none">
        <table className="w-full min-w-[var(--table-min-glance)] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-neutral-50 dark:bg-neutral-900/80">
              <th className="px-4 py-3 font-semibold text-neutral-700 dark:text-neutral-200">Campo</th>
              <th className="px-4 py-3 font-semibold text-neutral-700 dark:text-neutral-200">Último</th>
              <th className="px-4 py-3 font-semibold text-neutral-700 dark:text-neutral-200">Próximo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{row.label}</td>
                <td className="px-4 py-3 font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                  {row.last}
                </td>
                <td className="px-4 py-3 font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                  {row.next}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
