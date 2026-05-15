import { formatBRL } from "@/lib/format";
import { formatPercent } from "@/lib/stocks-data";
import { Card } from "@/components/ui/Card";
import { MetricTile } from "@/components/ui/MetricTile";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

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
    <section aria-labelledby="heading-metricas-acao">
      <Card>
        <h2 id="heading-metricas-acao" className={cn("text-left", ui.sectionTitle)}>
          Dados principais (referência editorial)
        </h2>
        <p className={cn(ui.bodyMuted, "mt-2 max-w-2xl")}>
          Valores ilustrativos para contexto nesta página. A calculadora usa dados da API quando disponíveis e
          pode diferir.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <MetricTile label="Ticker">{ticker}</MetricTile>
          <MetricTile label="Setor">{sectorLabel}</MetricTile>
          <MetricTile label="Preço de referência">{formatBRL(priceBrl)}</MetricTile>
          <MetricTile label="Dividend yield (ref.)">{formatPercent(dividendYieldPct)}</MetricTile>
          <MetricTile label="Payout (ref.)">{formatPercent(payoutPct, 0)}</MetricTile>
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-4 sm:col-span-2">
            <p className={ui.metricLabel}>Frequência de pagamento</p>
            <p className={cn(ui.body, "mt-2 font-normal text-[#374151]")}>
              {paymentFrequency}
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
