import Image from "next/image";
import Link from "next/link";
import type { TickerComparData } from "@/lib/comparar";
import { formatBRL } from "@/lib/format";

interface ComparCardProps {
  data: TickerComparData;
  shares: number;
}

export function ComparCard({ data, shares }: ComparCardProps) {
  const { ticker, shortName, logoUrl, currentPrice, calc, currency } = data;

  const total = calc.total12mEstimate > 0 ? formatBRL(calc.total12mEstimate, currency) : "—";
  const perCota = calc.perShare12m > 0 ? `Cerca de ${formatBRL(calc.perShare12m, currency)} por cota` : "—";

  return (
    <div className="flex flex-col gap-6 rounded-[24px] border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">

      {/* Header — logo + ticker + cotas */}
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={ticker}
            width={40}
            height={40}
            unoptimized
            className="h-10 w-10 shrink-0 rounded-full object-contain"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-sm font-bold text-[#374151]">
            {ticker[0]}
          </span>
        )}
        <div>
          <p className="text-[27px] font-medium leading-tight text-[#111827]">{ticker}</p>
          <p className="text-[13px] font-medium text-[#6B7280]">{shares} cotas</p>
        </div>
      </div>

      {/* Metric rows */}
      <div className="flex flex-col divide-y divide-[rgba(0,0,0,0.05)]">
        {currentPrice && (
          <MetricRow label="Preço atual da ação:" value={formatBRL(currentPrice, currency)} />
        )}
        <MetricRow
          label="Pagamentos"
          sublabel="(12 meses)"
          value={calc.total12mEstimate > 0 ? formatBRL(calc.total12mEstimate, currency) : "—"}
        />
        <MetricRow
          label="Último dividendo"
          value={
            calc.nextDividend && !calc.nextDividend.isFuture
              ? formatBRL(calc.nextDividend.totalPerShare, currency)
              : "—"
          }
        />
        <MetricRow
          label="Últimos 12 meses"
          sublabel="(por cota)"
          value={calc.perShare12m > 0 ? formatBRL(calc.perShare12m, currency) : "—"}
        />
        <MetricRow
          label="Média mensal"
          sublabel="(por cota)"
          value={calc.monthlyAvgEstimate > 0 ? formatBRL(calc.monthlyAvgEstimate, currency) : "—"}
        />
      </div>

      {/* Total — destaque */}
      <div className="flex items-end justify-between gap-4 pt-2">
        <p className="text-[13px] font-medium text-[#6B7280]">Total ({shares} cotas)</p>
        <div className="shrink-0 text-right">
          <p className="text-[32px] font-medium leading-tight tabular-nums text-[#111827]">{total}</p>
          <p className="mt-0.5 text-[13px] font-medium text-[#6B7280]">{perCota}</p>
        </div>
      </div>

      {/* Link */}
      <Link
        href={`/acoes/${ticker.toLowerCase()}`}
        className="flex items-center gap-1.5 text-[13px] font-medium text-[#111827] no-underline transition-opacity hover:opacity-60"
      >
        Mais sobre {ticker}
        <span
          className="material-symbols-outlined leading-none"
          style={{ fontSize: 16, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
        >
          arrow_forward
        </span>
      </Link>
    </div>
  );
}

function MetricRow({
  label,
  sublabel,
  value,
}: {
  label: string;
  sublabel?: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="text-[13px] font-medium text-[#6B7280]">{label}</p>
        {sublabel && (
          <p className="text-[13px] font-medium text-[#6B7280]">{sublabel}</p>
        )}
      </div>
      <p className="shrink-0 text-[13px] font-medium tabular-nums text-[#111827]">{value}</p>
    </div>
  );
}
