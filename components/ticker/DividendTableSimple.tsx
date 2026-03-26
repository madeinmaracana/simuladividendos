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
      <div className="mt-4 overflow-x-auto rounded-[length:var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <table className="w-full min-w-[var(--table-min-glance)] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-muted)]">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-soft)]">
                Campo
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-soft)]">
                Último
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-soft)]">
                Próximo
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {rows.map((row) => (
              <tr key={row.label} className="odd:bg-[var(--surface)] even:bg-[var(--surface)]">
                <td className="px-4 py-3 text-[color:var(--text-secondary)]">{row.label}</td>
                <td className="px-4 py-3 font-mono font-semibold tabular-nums text-[color:var(--text)]">
                  {row.last}
                </td>
                <td className="px-4 py-3 font-mono font-semibold tabular-nums text-[color:var(--text)]">
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
