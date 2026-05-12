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
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">

      {/* ── Inputs lado a lado ── */}
      <div className="grid grid-cols-2 gap-3">

        {/* Ticker */}
        <div className="flex flex-col gap-2" ref={wrapRef}>
          <label htmlFor="hero-ticker" className="text-xs text-[var(--color-text-muted)]">
            Ação ou FII (ticker B3)
          </label>
          <div className="relative">
            <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-3 transition focus-within:border-[var(--color-border-strong)]">
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
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[var(--color-text)] outline-none placeholder:font-normal placeholder:text-[var(--color-text-soft)]"
              />
              {sugLoading && (
                <span className="shrink-0 text-xs text-[var(--color-text-soft)]">…</span>
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

        {/* Quantidade */}
        <div className="flex flex-col gap-2">
          <label htmlFor="hero-shares" className="text-xs text-[var(--color-text-muted)]">
            Quantidade
          </label>
          <input
            id="hero-shares"
            type="text"
            inputMode="numeric"
            value={sharesStr}
            onChange={(e) => setSharesStr(e.target.value.replace(/\D/g, ""))}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm font-semibold tabular-nums text-[var(--color-text)] outline-none transition focus:border-[var(--color-border-strong)]"
          />
        </div>
      </div>

      {/* ── CTA ── */}
      <button
        type="button"
        onClick={() => void onSimulate()}
        disabled={loading || !hasValidTicker}
        className="mt-4 flex w-full items-center gap-4 rounded-full bg-[var(--brand)] px-5 py-[14px] transition hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black">
          <span
            className="material-symbols-outlined leading-none text-[var(--brand)]"
            style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
          >
            arrow_forward
          </span>
        </span>
        <span className="text-base font-semibold tracking-tight text-[var(--brand-foreground)]">
          {loading ? "Carregando…" : "Simular dividendos"}
        </span>
      </button>

      {/* ── Resultados ── */}
      {showResults && stock ? (
        <div className="mt-5 flex flex-col gap-4 border-t border-[var(--color-border)] pt-5">

          {/* Preço atual */}
          {stock.regularMarketPrice != null && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-[var(--color-text-muted)]">Preço atual da ação</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--color-text)]">
                {formatBRL(stock.regularMarketPrice, currency)}
              </p>
            </div>
          )}

          {/* Último dividendo */}
          {lastPayment && (
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Último dividendo</p>
                {lastPayment.paymentDate && (
                  <p className="mt-0.5 text-[11px] text-[var(--color-text-soft)]">
                    Pago em {formatDatePt(lastPayment.paymentDate)}
                  </p>
                )}
              </div>
              <p className="shrink-0 text-sm font-semibold tabular-nums text-[var(--color-text)]">
                {formatBRL(lastPayment.totalForShares, currency)}
              </p>
            </div>
          )}

          {/* Próximo pagamento — destaque */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">Próximo pagamento</p>
              {nextPayment?.paymentDate && (
                <p className="mt-0.5 text-[11px] text-[var(--color-text-soft)]">
                  Previsão: {formatDatePt(nextPayment.paymentDate)}
                </p>
              )}
            </div>
            <div className="shrink-0 text-right">
              {nextPayment ? (
                <>
                  <p className="text-2xl font-bold tabular-nums text-[var(--color-text)]">
                    {formatBRL(nextPayment.totalForShares, currency)}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-soft)]">
                    {perShareValue != null
                      ? `Cerca de ${formatBRL(perShareValue, currency)} por cota`
                      : "—"}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-bold text-[var(--color-text-soft)]">—</p>
              )}
            </div>
          </div>

          {/* Link */}
          {displayTicker && (
            <div className="border-t border-[var(--color-border)] pt-4 text-center">
              <Link
                href={`/acoes/${displayTicker.toLowerCase()}`}
                className="text-sm text-[var(--color-text-muted)] no-underline transition-colors hover:text-[var(--color-text)]"
              >
                Mais sobre {displayTicker} →
              </Link>
            </div>
          )}
        </div>
      ) : error ? (
        <div className="mt-5 border-t border-[var(--color-border)] pt-5">
          <p className="text-sm text-[var(--color-text-muted)]">
            {/bloqueia|token|plano pago/i.test(error)
              ? "Este ticker precisa de autenticação na API."
              : /não encontrado|inválido/i.test(error)
              ? "Ticker não encontrado. Verifique se está correto."
              : "Não foi possível buscar este ticker."}
          </p>
          {/bloqueia|token|plano pago/i.test(error) && (
            <p className="mt-1 text-xs text-[var(--color-text-soft)]">
              Tente: <strong>ITUB4</strong>, <strong>PETR4</strong>, <strong>VALE3</strong>
            </p>
          )}
        </div>
      ) : null}

    </div>
  );
}
