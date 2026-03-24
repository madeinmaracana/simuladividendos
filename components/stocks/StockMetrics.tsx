import { formatBRL } from "@/lib/format";
import { formatPercent } from "@/lib/stocks-data";

export type StockMetricsProps = {
  ticker: string;
  sectorLabel: string;
  priceBrl: number;
  dividendYieldPct: number;
  payoutPct: number;
  paymentFrequency: string;
};

export function StockMetrics({
  ticker,
  sectorLabel,
  priceBrl,
  dividendYieldPct,
  payoutPct,
  paymentFrequency,
}: StockMetricsProps) {
  return (
    <section
      aria-labelledby="heading-metricas-acao"
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h2
        id="heading-metricas-acao"
        className="text-left text-lg font-semibold text-neutral-900 dark:text-neutral-50"
      >
        Dados principais (referência editorial)
      </h2>
      <p className="mt-1 text-left text-xs text-neutral-500 dark:text-neutral-400">
        Valores ilustrativos para contexto na página. A calculadora abaixo usa dados da API quando
        disponíveis e pode diferir.
      </p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-100 bg-neutral-50/80 p-4 dark:border-neutral-800 dark:bg-neutral-950/40">
          <dt className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Ticker
          </dt>
          <dd className="mt-1 text-base font-semibold text-neutral-900 dark:text-neutral-50">{ticker}</dd>
        </div>
        <div className="rounded-xl border border-neutral-100 bg-neutral-50/80 p-4 dark:border-neutral-800 dark:bg-neutral-950/40">
          <dt className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Setor
          </dt>
          <dd className="mt-1 text-base font-semibold text-neutral-900 dark:text-neutral-50">
            {sectorLabel}
          </dd>
        </div>
        <div className="rounded-xl border border-neutral-100 bg-neutral-50/80 p-4 dark:border-neutral-800 dark:bg-neutral-950/40">
          <dt className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Preço de referência
          </dt>
          <dd className="mt-1 text-base font-semibold tabular-nums text-neutral-900 dark:text-neutral-50">
            {formatBRL(priceBrl)}
          </dd>
        </div>
        <div className="rounded-xl border border-neutral-100 bg-neutral-50/80 p-4 dark:border-neutral-800 dark:bg-neutral-950/40">
          <dt className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Dividend yield (ref.)
          </dt>
          <dd className="mt-1 text-base font-semibold tabular-nums text-neutral-900 dark:text-neutral-50">
            {formatPercent(dividendYieldPct)}
          </dd>
        </div>
        <div className="rounded-xl border border-neutral-100 bg-neutral-50/80 p-4 dark:border-neutral-800 dark:bg-neutral-950/40">
          <dt className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Payout (ref.)
          </dt>
          <dd className="mt-1 text-base font-semibold tabular-nums text-neutral-900 dark:text-neutral-50">
            {formatPercent(payoutPct, 0)}
          </dd>
        </div>
        <div className="rounded-xl border border-neutral-100 bg-neutral-50/80 p-4 sm:col-span-2 dark:border-neutral-800 dark:bg-neutral-950/40">
          <dt className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Frequência de pagamento
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {paymentFrequency}
          </dd>
        </div>
      </dl>
    </section>
  );
}
