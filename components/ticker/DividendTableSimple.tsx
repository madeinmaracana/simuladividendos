import type { DividendTableColumn } from "@/lib/ticker-page/table";

type DividendTableSimpleProps = {
  id?: string;
  rows: DividendTableColumn[];
};

export function DividendTableSimple({ id = "heading-tabela-dividendos", rows }: DividendTableSimpleProps) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-[27px] font-medium leading-tight text-white">Em um relance</h2>
      </div>
      <div className="overflow-x-auto rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[rgba(120,120,120,0.20)]">
              <th className="px-4 py-3 text-[13px] font-medium text-[#808080]">Campo</th>
              <th className="px-4 py-3 text-[13px] font-medium text-[#808080]">Último</th>
              <th className="px-4 py-3 text-[13px] font-medium text-[#808080]">Próximo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(120,120,120,0.20)]">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-4 py-3 text-[13px] font-medium text-[#808080]">{row.label}</td>
                <td className="px-4 py-3 text-[13px] font-medium tabular-nums text-white">{row.last}</td>
                <td className="px-4 py-3 text-[13px] font-medium tabular-nums text-white">{row.next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
