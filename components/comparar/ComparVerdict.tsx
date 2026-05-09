import type { ComparResult } from "@/lib/comparar";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/cn";

interface ComparVerdictProps {
  result: ComparResult;
}

export function ComparVerdict({ result }: ComparVerdictProps) {
  const { a, b, winner12m, diffPct, yieldA, yieldB } = result;

  const winnerData = winner12m === "a" ? a : winner12m === "b" ? b : null;
  const loserData  = winner12m === "a" ? b : winner12m === "b" ? a : null;
  const absDiff = Math.abs(diffPct);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5 sm:p-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-soft)]">
        Veredicto — últimos 12 meses
      </p>

      {winnerData && loserData ? (
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-[var(--color-text)]">
            <span className="text-[var(--brand)]">{winnerData.ticker}</span> pagou{" "}
            <span className="font-bold">
              {formatBRL(winnerData.calc.perShare12m, winnerData.currency)}/cota
            </span>{" "}
            contra{" "}
            <span className="font-bold">
              {formatBRL(loserData.calc.perShare12m, loserData.currency)}/cota
            </span>{" "}
            do {loserData.ticker}
            {absDiff > 0 && (
              <span className="text-[var(--color-text-muted)]">
                {" "}— {absDiff}% {winner12m === "a" ? "a mais" : "a mais"}
              </span>
            )}
            .
          </p>

          {(yieldA !== null || yieldB !== null) && (
            <p className="text-sm text-[var(--color-text-muted)]">
              {yieldA !== null && (
                <>Dividend yield estimado de {a.ticker}: <strong>{yieldA}%</strong>. </>
              )}
              {yieldB !== null && (
                <>Dividend yield estimado de {b.ticker}: <strong>{yieldB}%</strong>.</>
              )}
            </p>
          )}
        </div>
      ) : (
        <p className="text-base text-[var(--color-text-muted)]">
          {a.ticker} e {b.ticker} pagaram valores equivalentes nos últimos 12 meses.
          Considere outros fatores como preço, setor e perspectivas de crescimento.
        </p>
      )}

      <p className="mt-4 text-xs text-[var(--color-text-soft)]">
        Estimativa educacional com base em dados históricos públicos (via brapi.dev).
        Não é recomendação de investimento. Proventos passados não garantem pagamentos futuros.
      </p>
    </div>
  );
}
