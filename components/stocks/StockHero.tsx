import Link from "next/link";
import { getSectorPath } from "@/lib/stocks-data";

type StockHeroProps = {
  ticker: string;
  companyName: string;
  shortDescription: string;
  sectorLabel: string;
  sectorSlug: string;
  /** Quando true, o título vira h2 e o texto vem após o simulador (evita dois h1). */
  afterCalculator?: boolean;
};

export function StockHero({
  ticker,
  companyName,
  shortDescription,
  sectorLabel,
  sectorSlug,
  afterCalculator = false,
}: StockHeroProps) {
  if (afterCalculator) {
    return (
      <section
        aria-labelledby={`heading-sobre-${ticker}`}
        className="flex flex-col gap-3 border-b border-neutral-200 pb-8 dark:border-neutral-800"
      >
        <h2
          id={`heading-sobre-${ticker}`}
          className="text-left text-lg font-semibold text-neutral-900 dark:text-neutral-50"
        >
          Sobre {ticker}: {companyName}
        </h2>
        <p className="max-w-3xl text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {shortDescription}
        </p>
        <p className="text-left text-sm text-neutral-500 dark:text-neutral-500">
          Setor:{" "}
          <Link
            href={getSectorPath(sectorSlug)}
            className="font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-400"
          >
            {sectorLabel}
          </Link>
        </p>
      </section>
    );
  }

  return (
    <header className="flex flex-col gap-3 border-b border-neutral-200 pb-8 dark:border-neutral-800">
      <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
        {ticker}
      </p>
      <h1 className="text-left text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
        {ticker}: {companyName}
      </h1>
      <p className="max-w-3xl text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {shortDescription}
      </p>
      <p className="text-left text-sm text-neutral-500 dark:text-neutral-500">
        Setor:{" "}
        <Link
          href={getSectorPath(sectorSlug)}
          className="font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-400"
        >
          {sectorLabel}
        </Link>
      </p>
    </header>
  );
}
