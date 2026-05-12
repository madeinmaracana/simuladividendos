import Image from "next/image";
import Link from "next/link";
import type { TickerComparData } from "@/lib/comparar";
import { formatBRL } from "@/lib/format";
import { tickerAccentColor } from "@/lib/ticker-colors";
import { ROUTES } from "@/lib/seo/constants";

interface ComparCardProps {
  data: TickerComparData;
  shares: number;
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[rgba(120,120,120,0.20)] py-3 last:border-0">
      <span className="text-[13px] font-medium text-[#808080]">{label}</span>
      <span className="text-[13px] font-medium tabular-nums text-white">{value}</span>
    </div>
  );
}

export function ComparCard({ data, shares }: ComparCardProps) {
  const { ticker, shortName, logoUrl, currentPrice, calc, currency } = data;
  const accent = tickerAccentColor(ticker);

  const isFii = /\d{2}$/.test(ticker) && parseInt(ticker.slice(-2)) >= 11;
  const href = isFii ? ROUTES.fii(ticker) : ROUTES.acao(ticker);

  return (
    <div className="flex flex-col gap-5 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={ticker}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-contain"
          />
        ) : (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {ticker.slice(0, 2)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-white">{ticker}</p>
          <p className="line-clamp-1 text-[13px] font-medium text-[#808080]">{shortName}</p>
        </div>
      </div>

      {/* Métricas */}
      <div className="flex flex-col">
        {currentPrice != null && (
          <MetricRow label="Preço atual" value={formatBRL(currentPrice, currency)} />
        )}
        <MetricRow
          label="Último dividendo (por cota)"
          value={
            calc.nextDividend && !calc.nextDividend.isFuture
              ? formatBRL(calc.nextDividend.totalPerShare, currency)
              : calc.perShare12m > 0
              ? formatBRL(calc.perShare12m / Math.max(calc.dividendsLast12m.length, 1), currency)
              : "—"
          }
        />
        <MetricRow
          label="Total (12m, por cota)"
          value={calc.perShare12m > 0 ? formatBRL(calc.perShare12m, currency) : "—"}
        />
        <MetricRow
          label="Média mensal (por cota)"
          value={calc.monthlyAvgEstimate > 0 ? formatBRL(calc.monthlyAvgEstimate, currency) : "—"}
        />
        <MetricRow
          label={`Total estimado (${shares} cotas)`}
          value={calc.total12mEstimate > 0 ? formatBRL(calc.total12mEstimate, currency) : "—"}
        />
        <MetricRow
          label="Pagamentos (12m)"
          value={calc.dividendsLast12m.length > 0 ? String(calc.dividendsLast12m.length) : "—"}
        />
      </div>

      {/* Link */}
      <Link
        href={href}
        className="mt-auto flex items-center gap-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
      >
        Mais sobre {ticker}
        <span
          className="material-symbols-outlined leading-none"
          style={{ fontSize: 14, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
        >
          arrow_forward
        </span>
      </Link>
    </div>
  );
}
