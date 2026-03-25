import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type TickerMiniMetricsProps = {
  yieldDisplay: string | null;
  avgMonthlyPerShare: string | null;
  total12mPerShare: string | null;
};

export function TickerMiniMetrics({ yieldDisplay, avgMonthlyPerShare, total12mPerShare }: TickerMiniMetricsProps) {
  if (!yieldDisplay && !avgMonthlyPerShare && !total12mPerShare) return null;

  return (
    <div className={cn(ui.pageSection, "grid gap-4 sm:grid-cols-3")}>
      {yieldDisplay ? (
        <Card className="p-5">
          <p className={ui.metricLabel}>Dividend yield (ref. 12m)</p>
          <p className="mt-2 text-xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-50">
            {yieldDisplay}
          </p>
          <p className={cn(ui.bodyMuted, "mt-2")}>Relação entre proventos por ação em 12 meses e cotação atual.</p>
        </Card>
      ) : null}
      {avgMonthlyPerShare ? (
        <Card className="p-5">
          <p className={ui.metricLabel}>Média mensal (12m)</p>
          <p className="mt-2 text-xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-50">
            {avgMonthlyPerShare}
          </p>
          <p className={cn(ui.bodyMuted, "mt-2")}>Média simples: total do período ÷ 12.</p>
        </Card>
      ) : null}
      {total12mPerShare ? (
        <Card className="p-5">
          <p className={ui.metricLabel}>Total por ação (12m)</p>
          <p className="mt-2 text-xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-50">
            {total12mPerShare}
          </p>
          <p className={cn(ui.bodyMuted, "mt-2")}>Soma dos proventos por ação no período.</p>
        </Card>
      ) : null}
    </div>
  );
}
