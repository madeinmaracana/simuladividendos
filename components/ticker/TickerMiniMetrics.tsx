type TickerMiniMetricsProps = {
  yieldDisplay: string | null;
  avgMonthlyPerShare: string | null;
  total12mPerShare: string | null;
};

export function TickerMiniMetrics({ yieldDisplay, avgMonthlyPerShare, total12mPerShare }: TickerMiniMetricsProps) {
  if (!yieldDisplay && !avgMonthlyPerShare && !total12mPerShare) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {yieldDisplay ? (
        <div className="flex flex-col gap-2 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-4">
          <p className="text-[13px] font-medium text-[#808080]">Dividend Yield</p>
          <p className="text-[27px] font-medium tabular-nums text-white">{yieldDisplay}</p>
          <p className="text-[13px] font-medium text-[#808080]">Relação entre proventos por ação em 12 meses e cotação atual.</p>
        </div>
      ) : null}
      {avgMonthlyPerShare ? (
        <div className="flex flex-col gap-2 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-4">
          <p className="text-[13px] font-medium text-[#808080]">Média mensal (12M)</p>
          <p className="text-[27px] font-medium tabular-nums text-white">{avgMonthlyPerShare}</p>
          <p className="text-[13px] font-medium text-[#808080]">Média simples: total do período ÷ 12.</p>
        </div>
      ) : null}
      {total12mPerShare ? (
        <div className="flex flex-col gap-2 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-4">
          <p className="text-[13px] font-medium text-[#808080]">Total por ação (12M)</p>
          <p className="text-[27px] font-medium tabular-nums text-white">{total12mPerShare}</p>
          <p className="text-[13px] font-medium text-[#808080]">Soma dos proventos por ação no período.</p>
        </div>
      ) : null}
    </div>
  );
}
