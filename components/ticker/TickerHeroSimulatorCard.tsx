"use client";

import { useState } from "react";
import Image from "next/image";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { formatBRL, formatDatePt } from "@/lib/format";
import type { StockQuote } from "@/lib/types";

/* ── helpers ──────────────────────────────────────────── */

/** Bicolor "R$ " + number display — identical to HomeHeroSimulator */
function Amount({
  value,
  currency,
  highlight = false,
}: {
  value: number;
  currency: string;
  highlight?: boolean;
}) {
  const formatted = formatBRL(value, currency);
  const match = formatted.match(/^(R\$[  \s]*)(.+)$/);
  const prefix = match?.[1] ?? "R$ ";
  const number = match?.[2] ?? formatted;

  return (
    <span className="text-3xl font-light leading-none tracking-[-0.64px]">
      <span className={highlight ? "text-[#9B9B9B]" : "text-[#A3A3A3]"}>{prefix}</span>
      <span className={highlight ? "text-black" : "text-[#A3A3A3]"}>{number}</span>
    </span>
  );
}

/* ── main component ───────────────────────────────────── */

export type TickerHeroSimulatorCardProps = {
  ticker: string;
  companyName: string;
  logoUrl?: string | null;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
  /** Short descriptive text shown at the bottom of the left panel */
  dividendSummary?: string | null;
};

export function TickerHeroSimulatorCard({
  ticker,
  companyName,
  logoUrl,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
  dividendSummary,
}: TickerHeroSimulatorCardProps) {
  const [logoErr, setLogoErr] = useState(false);

  const {
    sharesStr,
    setSharesStr,
    stock,
    error,
    loading,
    showResults,
    currency,
    lastPayment,
    nextPayment,
    onSimulate,
  } = useDividendSimulator(ticker, initialStock, serverError, defaultShares, "tickerHeroCard");

  const perShareValue =
    lastPayment && Number(sharesStr || 1) > 0 ? lastPayment.totalPerShare : null;

  const symbol = ticker.toUpperCase();

  return (
    <div className="flex w-full overflow-hidden rounded-[32px]">

      {/* ═══════════════════════════════════════
          LEFT PANEL — teal #00939A
      ═══════════════════════════════════════ */}
      <div className="flex w-[440px] shrink-0 flex-col gap-8 bg-[#00939A] p-6">

        {/* Company badge */}
        <div className="flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
          {logoUrl && !logoErr ? (
            <Image
              src={logoUrl}
              alt={`Logo ${symbol}`}
              width={20}
              height={20}
              unoptimized
              className="h-5 w-5 shrink-0 rounded-full object-contain"
              onError={() => setLogoErr(true)}
            />
          ) : (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
              {symbol[0]}
            </span>
          )}
          <span className="text-sm font-semibold text-white">{symbol}</span>
          <span className="text-xs text-white/60 truncate max-w-[120px]">{companyName}</span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-20">

          {/* Quantity input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="ticker-card-shares" className="text-xs font-medium text-white/60">
              Quantidade
            </label>
            <input
              id="ticker-card-shares"
              type="text"
              inputMode="numeric"
              value={sharesStr}
              onChange={(e) => {
                setSharesStr(e.target.value.replace(/\D/g, ""));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") void onSimulate();
              }}
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-2xl font-light tabular-nums text-white outline-none focus:border-white/40 placeholder:text-white/30"
              placeholder="100"
            />
            <button
              type="button"
              onClick={() => void onSimulate()}
              disabled={loading}
              className="mt-1 self-start rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white hover:bg-white/25 transition disabled:opacity-40"
            >
              {loading ? "Carregando…" : "Simular"}
            </button>
          </div>

          {/* Dividend summary info */}
          <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-black/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Resumo de dividendos
            </p>
            {dividendSummary ? (
              <p className="text-xs font-medium leading-relaxed text-white/80">
                {dividendSummary.length > 140
                  ? dividendSummary.slice(0, 137) + "…"
                  : dividendSummary}
              </p>
            ) : lastPayment ? (
              <p className="text-xs font-medium leading-relaxed text-white/80">
                Último dividendo de {symbol}:{" "}
                <span className="text-white font-semibold">
                  {formatBRL(lastPayment.totalPerShare, currency)}
                </span>{" "}
                por cota
                {lastPayment.paymentDate
                  ? `, pago em ${formatDatePt(lastPayment.paymentDate)}`
                  : ""}
                .
              </p>
            ) : (
              <p className="text-xs font-medium text-white/50">
                Simule para ver os resultados.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          RIGHT PANEL — white, 3 sections
      ═══════════════════════════════════════ */}
      {showResults && stock ? (
        <div className="flex flex-1 flex-col divide-y divide-[#E5E5E5] bg-white">

          {/* Section 1 — Preço atual */}
          {stock.regularMarketPrice != null && (
            <div className="flex flex-col gap-1 p-6">
              <p className="text-xs font-medium text-black">Preço atual da ação:</p>
              <Amount value={stock.regularMarketPrice} currency={currency} />
            </div>
          )}

          {/* Section 2 — Último dividendo */}
          {lastPayment && (
            <div className="flex flex-col gap-1 p-6">
              <p className="text-xs font-medium text-black">Último dividendo</p>
              <Amount value={lastPayment.totalForShares} currency={currency} />
              {lastPayment.paymentDate && (
                <p className="text-xs font-medium text-[#A3A3A3]">
                  Pago em {formatDatePt(lastPayment.paymentDate)}
                </p>
              )}
            </div>
          )}

          {/* Section 3 — Próximo pagamento */}
          <div className="flex flex-1 flex-col justify-between p-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-black">Próximo pagamento</p>
              {nextPayment ? (
                <>
                  <Amount value={nextPayment.totalForShares} currency={currency} highlight />
                  {nextPayment.paymentDate && (
                    <p className="text-xs font-medium text-[#A3A3A3]">
                      Previsto: {formatDatePt(nextPayment.paymentDate)}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-3xl font-light leading-none tracking-[-0.64px] text-[#A3A3A3]">
                  —
                </p>
              )}
            </div>

            {/* Footer row */}
            {perShareValue != null && (
              <p className="pt-4 text-xs font-medium text-[#A3A3A3]">
                Cerca de {formatBRL(perShareValue, currency)} por cota
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Placeholder / Error */
        <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-white p-8 text-center">
          {error ? (
            <div className="flex flex-col items-center gap-2">
              <span
                className="material-symbols-outlined text-3xl leading-none text-neutral-300"
                style={{ fontVariationSettings: "'opsz' 32, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
              >
                info
              </span>
              <p className="text-sm font-medium text-neutral-600">
                {/bloqueia|token|plano pago/i.test(error)
                  ? "Este ticker precisa de autenticação na API."
                  : /não encontrado|inválido/i.test(error)
                  ? "Ticker não encontrado."
                  : "Não foi possível carregar os dados."}
              </p>
            </div>
          ) : (
            <p className="text-sm text-neutral-400">
              Carregando dados de <span className="font-semibold text-neutral-600">{symbol}</span>…
            </p>
          )}
        </div>
      )}

    </div>
  );
}
