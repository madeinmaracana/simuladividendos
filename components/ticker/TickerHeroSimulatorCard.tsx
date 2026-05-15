"use client";

import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { formatBRL, formatDatePt } from "@/lib/format";
import type { StockQuote } from "@/lib/types";

export type TickerHeroSimulatorCardProps = {
  ticker: string;
  companyName: string;
  logoUrl?: string | null;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
  dividendSummary?: string | null;
};

export function TickerHeroSimulatorCard({
  ticker,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
}: TickerHeroSimulatorCardProps) {
  const {
    sharesStr,
    setSharesStr,
    stock,
    error,
    showResults,
    currency,
    lastPayment,
    nextPayment,
  } = useDividendSimulator(ticker, initialStock, serverError, defaultShares, "tickerPage");

  const perShareValue =
    lastPayment && Number(sharesStr || 1) > 0 ? lastPayment.totalPerShare : null;

  return (
    <div
      className="rounded-[24px] border border-white/10 p-[24px]"
      style={{ background: "rgba(111,111,111,0.18)", backdropFilter: "blur(16px)" }}
    >
      {/* ── Label + Input ── */}
      <div className="flex flex-col gap-3">
        <label htmlFor="ticker-page-shares" className="text-[13px] font-medium text-[#808080]">
          Quantidade
        </label>
        <input
          id="ticker-page-shares"
          type="text"
          inputMode="numeric"
          value={sharesStr}
          onChange={(e) => setSharesStr(e.target.value.replace(/\D/g, ""))}
          placeholder="100"
          className="rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-[14px] text-[16px] font-normal tabular-nums text-white outline-none transition focus:border-white/30 placeholder:text-[#808080]"
        />
      </div>

      {/* ── Resultados ── */}
      {showResults && stock ? (
        <div className="mt-6 flex flex-col gap-[40px]">

          {stock.regularMarketPrice != null && (
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-[#808080]">Preço atual da ação</p>
              <p className="text-[24px] font-light tabular-nums text-white">
                {formatBRL(stock.regularMarketPrice, currency)}
              </p>
            </div>
          )}

          {lastPayment && (
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-[#808080]">Último dividendo</p>
                {lastPayment.paymentDate && (
                  <p className="mt-0.5 text-[13px] font-medium text-[#808080]">
                    Pago em {formatDatePt(lastPayment.paymentDate)}
                  </p>
                )}
              </div>
              <p className="shrink-0 text-[24px] font-light tabular-nums text-white">
                {formatBRL(lastPayment.totalForShares, currency)}
              </p>
            </div>
          )}

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[13px] font-medium text-[#808080]">Próximo pagamento</p>
              {nextPayment?.paymentDate && (
                <p className="mt-0.5 text-[13px] font-medium text-[#808080]">
                  Previsão: {formatDatePt(nextPayment.paymentDate)}
                </p>
              )}
            </div>
            <div className="shrink-0 text-right">
              {nextPayment ? (
                <>
                  <p className="text-[24px] font-light tabular-nums text-white">
                    {formatBRL(nextPayment.totalForShares, currency)}
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-[#808080]">
                    {perShareValue != null
                      ? `Cerca de ${formatBRL(perShareValue, currency)} por cota`
                      : "—"}
                  </p>
                </>
              ) : (
                <p className="text-[24px] font-light text-[#808080]">—</p>
              )}
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="mt-6">
          <p className="text-[13px] font-medium text-[#808080]">
            {/bloqueia|token|plano pago/i.test(error)
              ? "Este ticker precisa de autenticação na API."
              : /não encontrado|inválido/i.test(error)
              ? "Ticker não encontrado."
              : "Não foi possível carregar os dados."}
          </p>
        </div>
      ) : null}
    </div>
  );
}
