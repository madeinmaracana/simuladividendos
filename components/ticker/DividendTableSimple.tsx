import type { DividendTableColumn } from "@/lib/ticker-page/table";

type DividendTableSimpleProps = {
  id?: string;
  rows: DividendTableColumn[];
};

export function DividendTableSimple({ id = "heading-tabela-dividendos", rows }: DividendTableSimpleProps) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-[24px] font-medium leading-tight text-[#111827]">Em um relance</h2>
      </div>
      <div className="overflow-x-auto rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[rgba(0,0,0,0.08)]">
              <th className="px-4 py-3 text-[13px] font-medium text-[#6B7280]">Campo</th>
              <th className="px-4 py-3 text-[13px] font-medium text-[#6B7280]">Último</th>
              <th className="px-4 py-3 text-[13px] font-medium text-[#6B7280]">Próximo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(0,0,0,0.08)]">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-4 py-3 text-[13px] font-medium text-[#6B7280]">{row.label}</td>
                <td className="px-4 py-3 text-[13px] font-semibold tabular-nums text-[#111827]">{row.last}</td>
                <td className="px-4 py-3 text-[13px] font-semibold tabular-nums text-[#111827]">{row.next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
