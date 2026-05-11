import Image from "next/image";
import Link from "next/link";
import type { TickerComparData } from "@/lib/comparar";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { MetricRow } from "@/components/ui/MetricRow";

interface ComparCardProps {
  data: TickerComparData;
  shares: number;
}

export function ComparCard({ data, shares }: ComparCardProps) {
  const { ticker, shortName, logoUrl, currentPrice, calc, currency } = data;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
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
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-3">
        <MetricRow
          label="Últimos 12m (por cota)"
          value={calc.perShare12m > 0 ? formatBRL(calc.perShare12m, currency) : "—"}
        />
        <MetricRow
          label={`Total (${shares} cotas)`}
          value={calc.total12mEstimate > 0 ? formatBRL(calc.total12mEstimate, currency) : "—"}
        />
        <MetricRow
          label="Média mensal (por cota)"
          value={calc.monthlyAvgEstimate > 0 ? formatBRL(calc.monthlyAvgEstimate, currency) : "—"}
        />
        <MetricRow
          label="Último dividendo"
          value={
            calc.nextDividend && !calc.nextDividend.isFuture
              ? formatBRL(calc.nextDividend.totalPerShare, currency)
              : "—"
          }
        />
        {currentPrice && (
          <MetricRow label="Preço atual" value={formatBRL(currentPrice, currency)} />
        )}
        <MetricRow
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

