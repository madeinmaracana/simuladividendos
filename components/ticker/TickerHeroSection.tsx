"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { formatBRL, formatDatePt } from "@/lib/format";
import type { StockQuote } from "@/lib/types";
import { SiteNav } from "@/components/layout/SiteNav";

interface TickerHeroSectionProps {
  ticker: string;
  sectorLabel: string;
  sectorHref: string;
  logoUrl?: string | null;
  heroTitle: string;
  introText: string;
  bodyText?: string | null;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
}

export function TickerHeroSection({
  ticker,
  sectorLabel,
  sectorHref,
  logoUrl,
  heroTitle,
  introText,
  bodyText,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
}: TickerHeroSectionProps) {
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
  } = useDividendSimulator(ticker, initialStock, serverError, defaultShares, "tickerHero");

  const symbol = ticker.toUpperCase();
  const perShareValue =
    lastPayment && Number(sharesStr || 1) > 0 ? lastPayment.totalPerShare : null;

  return (
    <section className="overflow-hidden rounded-[32px]" style={{ background: "url(/hero-bg.jpg) center / cover no-repeat, #1A1A1A" }}>
      <SiteNav />
      <div className="mx-auto grid max-w-[var(--page-max)] grid-cols-1 gap-12 px-[var(--page-gutter)] pb-16 lg:grid-cols-2 lg:items-start lg:gap-16 lg:pb-24">

        {/* ── Esquerda — breadcrumb + copy ── */}
        <div className="flex flex-col gap-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3">
            {logoUrl && !logoErr ? (
              <Image
                src={logoUrl}
                alt={symbol}
                width={24}
                height={24}
                unoptimized
                className="h-6 w-6 shrink-0 rounded-full object-contain"
                onError={() => setLogoErr(true)}
              />
            ) : (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                {symbol[0]}
              </span>
            )}
            <span className="text-sm font-semibold text-white">{symbol}</span>
            <span className="select-none text-white/30">·</span>
            <Link
              href={sectorHref}
              className="flex items-center gap-1 text-[13px] font-medium text-[#808080] no-underline transition hover:text-white/80"
            >
              <span
                className="material-symbols-outlined leading-none"
                style={{ fontSize: 16, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
              >
                apartment
              </span>
              {sectorLabel}
            </Link>
          </div>

          {/* Headline + subtitle */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[42px] font-medium leading-[1.15] text-white lg:text-[53px] lg:leading-[63px]">
              {heroTitle}
            </h1>
            <p className="text-lg font-normal leading-relaxed text-white/70 lg:text-[21px]">
              {introText}
            </p>
          </div>

          {/* Body text */}
          {bodyText && (
            <p className="text-[13px] font-medium leading-relaxed text-[#808080]">
              {bodyText}
            </p>
          )}

          {/* Disclaimer */}
          <p className="flex items-start gap-1.5 text-[13px] font-medium text-[#808080]">
            <span className="shrink-0">◆</span>
            <span>Não é recomendação de investimento. Fonte pública de proventos.</span>
          </p>
        </div>

        {/* ── Direita — card simulador glass ── */}
        <div
          className="rounded-[24px] border border-white/10 p-[24px]"
          style={{ background: "rgba(111,111,111,0.18)", backdropFilter: "blur(16px)" }}
        >
          {/* Quantity input */}
          <div className="flex flex-col gap-3">
            <label htmlFor="ticker-hero-shares" className="text-[13px] font-medium text-[#808080]">
              Quantidade
            </label>
            <input
              id="ticker-hero-shares"
              type="text"
              inputMode="numeric"
              value={sharesStr}
              onChange={(e) => setSharesStr(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => { if (e.key === "Enter") void onSimulate(); }}
              placeholder="000000"
              className="rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-[14px] text-sm font-semibold tabular-nums text-white outline-none transition focus:border-white/30 placeholder:text-[#808080]"
            />
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => void onSimulate()}
            disabled={loading}
            className="mt-6 flex w-full items-center gap-4 rounded-full bg-white px-5 py-[14px] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black">
              <span
                className="material-symbols-outlined leading-none text-white"
                style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
              >
                arrow_forward
              </span>
            </span>
            <span className="text-base font-semibold text-black">
              {loading ? "Carregando…" : "Simular dividendos"}
            </span>
          </button>

          {/* Resultados */}
          {showResults && stock ? (
            <div className="mt-4 flex flex-col gap-[40px]">

              {/* Preço atual */}
              {stock.regularMarketPrice != null && (
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-[#808080]">Preço atual da ação:</p>
                  <p className="text-[13px] font-semibold tabular-nums text-white">
                    {formatBRL(stock.regularMarketPrice, currency)}
                  </p>
                </div>
              )}

              {/* Último dividendo */}
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
                  <p className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                    {formatBRL(lastPayment.totalForShares, currency)}
                  </p>
                </div>
              )}

              {/* Próximo pagamento — destaque */}
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
                      <p className="text-[32px] font-semibold leading-tight tabular-nums text-white">
                        {formatBRL(nextPayment.totalForShares, currency)}
                      </p>
                      <p className="mt-1 text-[13px] font-medium text-[#808080]">
                        {perShareValue != null
                          ? `Cerca de ${formatBRL(perShareValue, currency)} por cota`
                          : "—"}
                      </p>
                    </>
                  ) : (
                    <p className="text-[32px] font-semibold text-[#808080]">—</p>
                  )}
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="mt-4">
              <p className="text-[13px] font-medium text-[#808080]">
                {/bloqueia|token|plano pago/i.test(error)
                  ? "Este ticker precisa de autenticação na API."
                  : /não encontrado|inválido/i.test(error)
                  ? "Ticker não encontrado. Verifique se está correto."
                  : "Não foi possível buscar este ticker."}
              </p>
            </div>
          ) : null}
        </div>

      </div>
    </section>
  );
}
