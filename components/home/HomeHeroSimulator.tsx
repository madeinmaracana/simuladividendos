"use client";

import { useState } from "react";
import Link from "next/link";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { formatBRL, formatDatePt } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Amount } from "@/components/ui/Amount";
import { TickerLogo } from "@/components/ui/TickerLogo";
import { SuggestionDropdown } from "@/components/ui/SuggestionDropdown";
import { useTickerSuggestions } from "@/hooks/useTickerSuggestions";

/* ── main component ───────────────────────────────────────────────── */

export function HomeHeroSimulator() {
  const [ticker, setTicker] = useState("");

  /* suggestions */
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
  } = useTickerSuggestions(ticker, (symbol) => {
    setTicker(symbol);
  });

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
    <div className="flex w-full flex-col overflow-hidden rounded-[32px] md:flex-row">

      {/* ════════════════════════════════════════
          LEFT PANEL — black
      ════════════════════════════════════════ */}
      <div className="flex w-full shrink-0 flex-col gap-12 bg-black p-6 md:w-[440px]">
        <p className="text-xs font-medium uppercase tracking-widest text-white/40">
          Comece por aqui
        </p>

        <div className="flex flex-col gap-5">
          {/* Ticker */}
          <div className="flex flex-col gap-2" ref={wrapRef}>
            <label htmlFor="hero-ticker" className="text-xs font-medium text-white/50">
              Ação ou FII (ticker B3)
            </label>
            <div className="relative">
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[rgba(255,255,255,0.08)] px-4 py-3 focus-within:border-white/30">
                <TickerLogo ticker={displayTicker} size={28} theme="dark" />
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
                  className="flex-1 bg-transparent text-2xl font-semibold text-white outline-none placeholder:text-white/25"
                />
                {sugLoading && (
                  <span className="text-xs text-white/30">…</span>
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
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <label htmlFor="hero-shares" className="text-xs font-medium text-white/50">
              Quantidade
            </label>
            <input
              id="hero-shares"
              type="text"
              inputMode="numeric"
              value={sharesStr}
              onChange={(e) => setSharesStr(e.target.value.replace(/\D/g, ""))}
              className="rounded-2xl border border-white/15 bg-[rgba(255,255,255,0.08)] px-4 py-3 text-2xl font-light tabular-nums text-white outline-none focus:border-white/30"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => void onSimulate()}
          disabled={loading || !hasValidTicker}
          className={cn(
            "flex items-center justify-between rounded-full pl-8 pr-2 py-2 transition",
            "bg-[#A6FF00] hover:bg-[#8fe000]",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          <span className="text-[1.25rem] font-medium tracking-[-0.6px] text-black">
            {loading ? "Carregando..." : "Simular dividendos"}
          </span>
          <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-black">
            <span
              className="material-symbols-outlined select-none leading-none text-[#A6FF00]"
              style={{ fontSize: 27, fontVariationSettings: "'opsz' 24, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
            >
              arrow_forward
            </span>
          </span>
        </button>
      </div>

      {/* ════════════════════════════════════════
          RIGHT PANEL — white, 3 sections
      ════════════════════════════════════════ */}
      {showResults && stock ? (
        <div className="flex flex-1 flex-col divide-y divide-[#E5E5E5] bg-white">

          {/* Preço atual */}
          {stock.regularMarketPrice != null && (
            <div className="flex flex-col gap-1 p-6">
              <p className="text-xs font-medium text-black">Preço atual da ação:</p>
              <Amount value={stock.regularMarketPrice} currency={currency} />
            </div>
          )}

          {/* Último dividendo */}
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

          {/* Próximo pagamento */}
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
                <p className="text-3xl font-light leading-none tracking-[-0.64px] text-[#A3A3A3]">—</p>
              )}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-xs font-medium text-[#A3A3A3]">
                {perShareValue != null
                  ? `Cerca de ${formatBRL(perShareValue, currency)} por cota`
                  : "—"}
              </p>
              {displayTicker && (
                <Link
                  href={`/acoes/${displayTicker.toLowerCase()}`}
                  className="text-base font-normal text-black hover:underline no-underline"
                >
                  Mais sobre {displayTicker} →
                </Link>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* Placeholder / Error */
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white p-8 text-center">
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
                  ? "Ticker não encontrado. Verifique se está correto."
                  : "Não foi possível buscar este ticker."}
              </p>
              {/bloqueia|token|plano pago/i.test(error) && (
                <p className="text-xs text-neutral-400">
                  Tente um ticker PN — ex.:{" "}
                  <strong>ITUB4</strong>, <strong>PETR4</strong>, <strong>VALE3</strong>
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-neutral-400">
              Informe um ticker e clique em
              <br />
              <span className="font-medium text-neutral-600">&ldquo;Simular dividendos&rdquo;</span>
            </p>
          )}
        </div>
      )}

    </div>
  );
}
