import Link from "next/link";
import { formatPercent, getTickerPath, type StockSeoRecord } from "@/lib/stocks-data";

type SectorStockListProps = {
  stocks: StockSeoRecord[];
};

export function SectorStockList({ stocks }: SectorStockListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {stocks.map((s) => (
        <li
          key={s.ticker}
          className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-teal-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-teal-900"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Link
              href={getTickerPath(s.ticker)}
              className="text-lg font-semibold text-teal-700 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
            >
              {s.ticker}
            </Link>
            <span className="text-sm tabular-nums text-neutral-500 dark:text-neutral-400">
              Yield ref.: {formatPercent(s.dividendYieldPct)}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-neutral-800 dark:text-neutral-200">{s.companyName}</p>
          <p className="mt-2 text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {s.listDescription}
          </p>
          <p className="mt-3 text-left text-xs text-neutral-500 dark:text-neutral-500">
            <Link
              href={getTickerPath(s.ticker)}
              className="font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-400"
            >
              Ver página de {s.ticker} com simulador →
            </Link>
          </p>
        </li>
      ))}
    </ul>
  );
}
