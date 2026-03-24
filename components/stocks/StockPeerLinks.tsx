import Link from "next/link";
import { getSectorPath, getTickerPath, type StockSeoRecord } from "@/lib/stocks-data";

type StockPeerLinksProps = {
  sectorSlug: string;
  sectorLabel: string;
  peers: StockSeoRecord[];
};

export function StockPeerLinks({ sectorSlug, sectorLabel, peers }: StockPeerLinksProps) {
  return (
    <nav
      aria-label="Navegação por setor e pares"
      className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 p-5 dark:border-neutral-700 dark:bg-neutral-900/40"
    >
      <p className="text-left text-sm font-medium text-neutral-800 dark:text-neutral-200">
        Continue navegando
      </p>
      <p className="mt-2 text-left text-sm text-neutral-600 dark:text-neutral-400">
        Setor:{" "}
        <Link
          href={getSectorPath(sectorSlug)}
          className="font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-400"
        >
          {sectorLabel}
        </Link>
      </p>
      {peers.length > 0 ? (
        <div className="mt-3">
          <p className="text-left text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
            Outras ações no mesmo setor
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {peers.map((p) => (
              <li key={p.ticker}>
                <Link
                  href={getTickerPath(p.ticker)}
                  className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-teal-700 hover:border-teal-300 hover:bg-teal-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-teal-400 dark:hover:border-teal-700"
                >
                  {p.ticker}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
