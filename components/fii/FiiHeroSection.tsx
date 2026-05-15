"use client";

import { useState } from "react";
import Image from "next/image";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { formatBRL, formatDatePt } from "@/lib/format";
import type { StockQuote } from "@/lib/types";
import { SiteNav } from "@/components/layout/SiteNav";

interface FiiHeroSectionProps {
  ticker: string;
  fundName: string;
  shortDescription: string;
  logoUrl?: string | null;
  heroTitle: string;
  introText: string;
  bodyText?: string | null;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
}

export function FiiHeroSection({
  ticker,
  fundName,
  shortDescription,
  logoUrl,
  heroTitle,
  introText,
  bodyText,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
}: FiiHeroSectionProps) {
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
  } = useDividendSimulator(ticker, initialStock, serverError, defaultShares, "fiiHero");

  const symbol = ticker.toUpperCase();
  const perShareValue =
    lastPayment && Number(sharesStr || 1) > 0 ? lastPayment.totalPerShare : null;

  return (
    <section
      className="flex w-full flex-col items-center rounded-[32px]"
      style={{
        backgroundImage: "url(/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#2A2A2A",
        paddingTop: 24,
        paddingBottom: 120,
        gap: 120,
      }}
    >
      <SiteNav />
      <div className="flex w-full flex-col items-start gap-[40px] px-4 lg:flex-row" style={{ maxWidth: 980 }}>

        {/* ── Esquerda — breadcrumb + copy ── */}
        <div className="flex flex-1 flex-col justify-between gap-10 self-stretch">

          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2">
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
            <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-[13px] font-medium text-[#808080]">
              Fundo imobiliário
            </span>
          </div>

          {/* Headline + subtitle */}
          <div className="flex flex-col gap-8">
            <h1 className="text-white" style={{ fontSize: 56, fontWeight: 300, lineHeight: "63px" }}>
              {heroTitle}
            </h1>
            <p className="text-white" style={{ fontSize: 24, fontWeight: 300 }}>
              {introText}
            </p>
          </div>

          {/* Fund name + description */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-white/60">{fundName}</p>
            {shortDescription && (
              <p className="text-[13px] font-medium leading-relaxed text-[#808080]">
                {shortDescription}
              </p>
            )}
          </div>

          {/* Disclaimer */}
          <p className="flex items-start gap-1.5 text-[13px] font-medium text-[#808080]">
            <span className="shrink-0">◆</span>
            <span>Não é recomendação de investimento. Fonte pública de proventos.</span>
          </p>
        </div>

        {/* ── Direita — card simulador glass ── */}
        <div
          className="w-full flex-shrink-0 rounded-[24px] border border-white/10 p-[24px] lg:w-[410px]"
          style={{ background: "rgba(111,111,111,0.18)", backdropFilter: "blur(16px)" }}
        >
          {/* Quantity input */}
          <div className="flex flex-col gap-3">
            <label htmlFor="fii-hero-shares" className="text-[13px] font-medium text-[#808080]">
              Quantidade de cotas
            </label>
            <input
              id="fii-hero-shares"
              type="text"
              inputMode="numeric"
              value={sharesStr}
              onChange={(e) => setSharesStr(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => { if (e.key === "Enter") void onSimulate(); }}
              placeholder="000000"
              className="rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-[14px] text-[16px] font-normal tabular-nums text-white outline-none transition focus:border-white/30 placeholder:text-[#808080]"
            />
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => void onSimulate()}
            disabled={loading}
            className="mt-6 flex w-full items-center gap-4 rounded-full bg-white p-[4px] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="flex shrink-0 items-center justify-center rounded-full bg-black p-[10px]">
              <span
                className="material-symbols-outlined leading-none text-white"
                style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
              >
                arrow_forward
              </span>
            </span>
            <span className="text-base font-medium text-black">
              {loading ? "Carregando…" : "Simular rendimentos"}
            </span>
          </button>

          {/* Resultados */}
          {showResults && stock ? (
            <div className="mt-4 flex flex-col gap-[40px]">

              {/* Preço atual da cota */}
              {stock.regularMarketPrice != null && (
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-[#808080]">Preço atual da cota:</p>
                  <p className="text-[24px] font-light tabular-nums text-white">
                    {formatBRL(stock.regularMarketPrice, currency)}
                  </p>
                </div>
              )}

              {/* Último rendimento */}
              {lastPayment && (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-medium text-[#808080]">Último rendimento</p>
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
