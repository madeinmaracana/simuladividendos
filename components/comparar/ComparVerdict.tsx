import type { ComparResult } from "@/lib/comparar";
import { formatBRL } from "@/lib/format";

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
        <SummaryItem
          ticker={a.ticker}
          perShare={a.calc.perShare12m}
          currency={a.currency}
          yield_={yieldA}
        />
        <SummaryItem
          ticker={b.ticker}
          perShare={b.calc.perShare12m}
          currency={b.currency}
          yield_={yieldB}
        />
      </div>

      <p className="mt-4 text-xs text-[var(--color-text-soft)]">
        Estimativa educacional com base em dados históricos públicos (via brapi.dev).
        Não é recomendação de investimento. Proventos passados não garantem pagamentos futuros.
      </p>
    </div>
  );
}

function SummaryItem({
  ticker,
  perShare,
  currency,
  yield_,
}: {
  ticker: string;
  perShare: number;
  currency: string;
  yield_: number | null;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
        {ticker}
      </p>
      <p className="text-lg font-semibold tabular-nums text-[var(--color-text)]">
        {perShare > 0 ? `${formatBRL(perShare, currency)}/cota` : "—"}
      </p>
      {yield_ !== null && (
        <p className="text-xs text-[var(--color-text-muted)]">
          Dividend yield estimado: <span className="font-medium">{yield_}%</span>
        </p>
      )}
    </div>
  );
}
