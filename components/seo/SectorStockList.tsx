import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { formatPercent, getTickerPath, type StockSeoRecord } from "@/lib/stocks-data";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type SectorStockListProps = {
  stocks: StockSeoRecord[];
};

export function SectorStockList({ stocks }: SectorStockListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {stocks.map((s) => (
        <li key={s.ticker}>
          <Card className="transition hover:border-[rgba(0,0,0,0.15)]">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Link
                href={getTickerPath(s.ticker)}
                className="text-lg font-semibold text-[#111827] transition hover:opacity-70"
              >
                {s.ticker}
              </Link>
              <span className={cn(ui.bodyMuted, "tabular-nums")}>
                Yield ref.: {formatPercent(s.dividendYieldPct)}
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold text-[#111827]">{s.companyName}</p>
            <p className={cn(ui.body, "mt-2")}>{s.listDescription}</p>
            <p className="mt-4">
              <TextLink href={getTickerPath(s.ticker)} className="text-sm">
                Ver página de {s.ticker} com simulador →
              </TextLink>
            </p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
