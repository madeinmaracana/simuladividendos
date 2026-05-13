import type { ComparResult } from "@/lib/comparar";
import { formatBRL } from "@/lib/format";
import { MetricRow } from "@/components/ui/MetricRow";

interface ComparVerdictProps {
  result: ComparResult;
}

export function ComparVerdict({ result }: ComparVerdictProps) {
  const { a, b, yieldA, yieldB } = result;

  return (
    <div className="rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-5 sm:p-6">
      <p className="mb-4 text-[13px] font-medium text-[#6B7280]">
        Resumo — últimos 12 meses
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-[13px] font-medium text-[#6B7280]">{a.ticker}</p>
          <p className="mt-1 text-[27px] font-medium leading-tight tabular-nums text-[#111827]">
            {a.calc.perShare12m > 0 ? `${formatBRL(a.calc.perShare12m, a.currency)}/cota` : "—"}
          </p>
          {yieldA !== null && (
            <p className="mt-1 text-[13px] font-medium text-[#6B7280]">Dividend yield: {yieldA}%</p>
          )}
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#6B7280]">{b.ticker}</p>
          <p className="mt-1 text-[27px] font-medium leading-tight tabular-nums text-[#111827]">
            {b.calc.perShare12m > 0 ? `${formatBRL(b.calc.perShare12m, b.currency)}/cota` : "—"}
          </p>
          {yieldB !== null && (
            <p className="mt-1 text-[13px] font-medium text-[#6B7280]">Dividend yield: {yieldB}%</p>
          )}
        </div>
      </div>

      <p className="mt-4 text-[13px] font-medium text-[#6B7280]">
        Estimativa educacional com base em dados históricos públicos (via brapi.dev).
        Não é recomendação de investimento.
      </p>
    </div>
  );
}

