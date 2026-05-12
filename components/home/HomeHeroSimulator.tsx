"use client";

import { useState } from "react";
import Link from "next/link";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { formatBRL, formatDatePt } from "@/lib/format";
import { TickerLogo } from "@/components/ui/TickerLogo";
import { SuggestionDropdown } from "@/components/ui/SuggestionDropdown";
import { useTickerSuggestions } from "@/hooks/useTickerSuggestions";

export function HomeHeroSimulator() {
  const [ticker, setTicker] = useState("");

  const {
    suggestions,
    isOpen: sugOpen,
    setIsOpen: setSugOpen,
    highlight: sugHighlight,
    setHighlight: setSugHighlight,
    isLoading: sugLoading,
    wrapRef,
    pick: pickSuggestion,
    handleKeyDown: handleSugKeyDown,
  } = useTickerSuggestions(ticker, (symbol) => setTicker(symbol));

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
  } = useDividendSimulator(ticker, null, null, 100, "homeManual");

  const displayTicker = ticker.trim().toUpperCase();
  const hasValidTicker = displayTicker.length >= 4;
  const perShareValue =
    lastPayment && Number(sharesStr || 1) > 0 ? lastPayment.totalPerShare : null;

  return (
    <div
      className="rounded-[24px] border border-white/10 p-[24px]"
      style={{ background: "rgba(111,111,111,0.18)", backdropFilter: "blur(16px)" }}
    >

      {/* ── Labels + Inputs ── */}
      <div className="flex flex-col gap-3">

        {/* Labels */}
        <div className="grid grid-cols-2 gap-3">
          <label htmlFor="hero-ticker" className="text-[13px] font-medium text-[#808080]">
            Ação ou FII (ticker B3)
          </label>
          <label htmlFor="hero-shares" className="text-[13px] font-medium text-[#808080]">
            Quantidade
          </label>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-3">

          {/* Ticker */}
          <div className="relative" ref={wrapRef}>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-[14px] transition focus-within:border-white/30">
              <TickerLogo ticker={displayTicker} size={24} theme="dark" />
              <input
                id="hero-ticker"
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={sugOpen && suggestions.length > 0}
                value={ticker}
                onChange={(e) => {
                  setTicker(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
                  setSugOpen(true);
                }}
                onKeyDown={handleSugKeyDown}
                placeholder="Ex.: BBAS3"
                maxLength={8}
                autoComplete="off"
                autoCapitalize="characters"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:font-normal placeholder:text-[#808080]"
              />
              {sugLoading && (
                <span className="shrink-0 text-xs text-[#808080]">…</span>
              )}
            </div>
            <SuggestionDropdown
              suggestions={suggestions}
              isOpen={sugOpen}
              highlight={sugHighlight}
              onHighlight={setSugHighlight}
              onPick={pickSuggestion}
              theme="dark"
            />
          </div>

          {/* Quantidade */}
          <input
            id="hero-shares"
            type="text"
            inputMode="numeric"
            value={sharesStr}
            onChange={(e) => setSharesStr(e.target.value.replace(/\D/g, ""))}
            className="rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-[14px] text-sm font-semibold tabular-nums text-white outline-none transition focus:border-white/30 placeholder:text-[#808080]"
          />
        </div>
      </div>

      {/* ── CTA — 40px acima dos inputs ── */}
      <button
        type="button"
        onClick={() => void onSimulate()}
        disabled={loading || !hasValidTicker}
        className="mt-10 flex w-full items-center gap-4 rounded-full bg-[var(--brand)] px-5 py-[14px] transition hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black">
          <span
            className="material-symbols-outlined leading-none text-[var(--brand)]"
            style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
          >
            arrow_forward
          </span>
        </span>
        <span className="text-base font-semibold text-[var(--brand-foreground)]">
          {loading ? "Carregando…" : "Simular dividendos"}
        </span>
      </button>

      {/* ── Resultados — 16px abaixo do botão ── */}
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

          {/* Link */}
          {displayTicker && (
            <div className="border-t border-white/10 pt-[24px] text-center">
              <Link
                href={`/acoes/${displayTicker.toLowerCase()}`}
                className="flex items-center justify-center gap-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-60"
              >
                Mais sobre {displayTicker}
                <span className="material-symbols-outlined leading-none" style={{ fontSize: 16 }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          )}
        </div>
      ) : error ? (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-[13px] font-medium text-[#808080]">
            {/bloqueia|token|plano pago/i.test(error)
              ? "Este ticker precisa de autenticação na API."
              : /não encontrado|inválido/i.test(error)
              ? "Ticker não encontrado. Verifique se está correto."
              : "Não foi possível buscar este ticker."}
          </p>
          {/bloqueia|token|plano pago/i.test(error) && (
            <p className="text-[11px] text-[#808080]">
              Tente: <strong className="text-white">ITUB4</strong>,{" "}
              <strong className="text-white">PETR4</strong>,{" "}
              <strong className="text-white">VALE3</strong>
            </p>
          )}
        </div>
      ) : null}

    </div>
  );
}
