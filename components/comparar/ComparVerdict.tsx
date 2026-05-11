import type { ComparResult } from "@/lib/comparar";
import { formatBRL } from "@/lib/format";
import { MetricRow } from "@/components/ui/MetricRow";

interface ComparVerdictProps {
  result: ComparResult;
}

export function ComparVerdict({ result }: ComparVerdictProps) {
  const { a, b, yieldA, yieldB } = result;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5 sm:p-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-soft)]">
        Resumo — últimos 12 meses
      </p>

      <div className="grid grid-cols-2 gap-4">
        <MetricRow
          label={a.ticker}
          value={a.calc.perShare12m > 0 ? `${formatBRL(a.calc.perShare12m, a.currency)}/cota` : "—"}
          sub={yieldA !== null ? `Dividend yield estimado: ${yieldA}%` : undefined}
          valueSize="lg"
        />
        <MetricRow
          label={b.ticker}
          value={b.calc.perShare12m > 0 ? `${formatBRL(b.calc.perShare12m, b.currency)}/cota` : "—"}
          sub={yieldB !== null ? `Dividend yield estimado: ${yieldB}%` : undefined}
          valueSize="lg"
        />
      </div>

      <p className="mt-4 text-xs text-[var(--color-text-soft)]">
        Estimativa educacional com base em dados históricos públicos (via brapi.dev).
        Não é recomendação de investimento. Proventos passados não garantem pagamentos futuros.
      </p>
    </div>
  );
}

