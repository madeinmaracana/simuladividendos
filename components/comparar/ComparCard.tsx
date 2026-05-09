import Image from "next/image";
import Link from "next/link";
import type { TickerComparData } from "@/lib/comparar";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

interface ComparCardProps {
  data: TickerComparData;
  isWinner: boolean;
  shares: number;
}

export function ComparCard({ data, isWinner, shares }: ComparCardProps) {
  const { ticker, shortName, logoUrl, currentPrice, calc, currency } = data;

  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-2xl border p-5 sm:p-6",
        isWinner
          ? "border-[var(--brand)] bg-[var(--color-surface)] shadow-[0_0_0_2px_var(--brand)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)]"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={ticker}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-sm font-bold text-[var(--color-text-muted)]">
            {ticker[0]}
          </span>
        )}
        <div>
          <p className="text-xl font-bold text-[var(--color-text)]">{ticker}</p>
          <p className="text-xs text-[var(--color-text-soft)] line-clamp-1">{shortName}</p>
        </div>
        {isWinner && (
          <span className="ml-auto rounded-full bg-[var(--brand)] px-2.5 py-0.5 text-xs font-bold text-[var(--brand-foreground)]">
            Pagou mais
          </span>
        )}
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-3">
        <Metric
          label="Últimos 12m (por cota)"
          value={calc.perShare12m > 0 ? formatBRL(calc.perShare12m, currency) : "—"}
          highlight={isWinner}
        />
        <Metric
          label={`Total (${shares} cotas)`}
          value={calc.total12mEstimate > 0 ? formatBRL(calc.total12mEstimate, currency) : "—"}
          highlight={isWinner}
        />
        <Metric
          label="Média mensal (por cota)"
          value={calc.monthlyAvgEstimate > 0 ? formatBRL(calc.monthlyAvgEstimate, currency) : "—"}
        />
        <Metric
          label="Último dividendo"
          value={
            calc.nextDividend && !calc.nextDividend.isFuture
              ? formatBRL(calc.nextDividend.totalPerShare, currency)
              : "—"
          }
        />
        {currentPrice && (
          <Metric label="Preço atual" value={formatBRL(currentPrice, currency)} />
        )}
        <Metric
          label="Pagamentos (12m)"
          value={calc.dividendsLast12m.length > 0 ? String(calc.dividendsLast12m.length) : "—"}
        />
      </div>

      <Link
        href={`/acoes/${ticker}`}
        className={cn(
          ui.ctaSecondary,
          "mt-auto w-full justify-center text-sm no-underline"
        )}
      >
        Ver {ticker} completo →
      </Link>
    </div>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className={ui.metricLabel}>{label}</p>
      <p
        className={cn(
          "text-base font-semibold tabular-nums",
          highlight ? "text-[var(--brand)]" : "text-[var(--color-text)]"
        )}
      >
        {value}
      </p>
    </div>
  );
}
