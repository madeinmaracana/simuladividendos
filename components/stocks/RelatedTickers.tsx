import Link from "next/link";
import { TickerCard } from "@/components/ui/TickerCard";
import { getSectorPath, getTickerPath, type StockSeoRecord } from "@/lib/stocks-data";

export type RelatedTickersProps = {
  symbol: string;
  sectorSlug: string;
  sectorLabel: string;
  peers: StockSeoRecord[];
  hasRelatedArticles?: boolean;
};

export function RelatedTickers({
  symbol: _symbol,
  sectorSlug,
  sectorLabel,
  peers,
}: RelatedTickersProps) {
  if (!peers.length) return null;

  const displayed = peers.slice(0, 7);

  return (
    <section aria-labelledby="heading-acoes-similares" className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id="heading-acoes-similares" className="text-[24px] font-medium leading-tight text-white">
          Ações similares
        </h2>
        <p className="text-[13px] font-medium text-[#808080]">
          Outras ações do setor de {sectorLabel}
        </p>
      </div>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
        {displayed.map((stock) => (
          <li key={stock.ticker}>
            <TickerCard ticker={stock.ticker} href={getTickerPath(stock.ticker)} />
          </li>
        ))}
      </ul>
      <Link
        href={getSectorPath(sectorSlug)}
        className="flex items-center gap-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
      >
        Ver todos
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
      </Link>
    </section>
  );
}
