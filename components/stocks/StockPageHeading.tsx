type StockPageHeadingProps = {
  ticker: string;
  companyName: string;
};

/** Título da página (um único h1) antes do bloco do simulador. */
export function StockPageHeading({ ticker, companyName }: StockPageHeadingProps) {
  return (
    <header className="flex flex-col gap-2 border-b border-neutral-200 pb-6 dark:border-neutral-800">
      <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
        {ticker}
      </p>
      <h1 className="text-left text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
        {ticker}: {companyName}
      </h1>
    </header>
  );
}
