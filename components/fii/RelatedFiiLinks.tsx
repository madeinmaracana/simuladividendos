import Link from "next/link";
import { TickerCard } from "@/components/ui/TickerCard";
import { tickerAccentColor } from "@/lib/ticker-colors";
import { getFiiPath, type FiiSeoRecord } from "@/data/fiis";

export type RelatedFiiLinksProps = {
  symbol: string;
  peers: FiiSeoRecord[];
  hasRelatedArticles?: boolean;
};

export function RelatedFiiLinks({ symbol: _symbol, peers }: RelatedFiiLinksProps) {
  if (!peers.length) return null;

  const displayed = peers.slice(0, 5);

  return (
    <section aria-labelledby="heading-fiis-similares" className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id="heading-fiis-similares" className="text-[24px] font-medium leading-tight text-[#111827]">
          FIIs similares
        </h2>
        <p className="text-[16px] font-normal text-[#808080]">
          Outros fundos imobiliários para explorar
        </p>
      </div>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {displayed.map((fii) => (
          <li key={fii.ticker}>
            <TickerCard
              ticker={fii.ticker}
              href={getFiiPath(fii.ticker)}
              accentColor={tickerAccentColor(fii.ticker)}
              theme="light"
            />
          </li>
        ))}
      </ul>
      <Link
        href="/fiis"
        className="flex items-center gap-2 text-[13px] font-medium text-[#111827] no-underline transition-opacity hover:opacity-70"
      >
        Ver todos
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
      </Link>
    </section>
  );
}
