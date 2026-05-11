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
    <div className="flex w-full flex-col overflow-hidden rounded-[28px] shadow-[var(--shadow-lg)] md:flex-row">

      {/* ════════════════════════════════════════
          LEFT PANEL — dark
      ════════════════════════════════════════ */}
      <div className="flex w-full shrink-0 flex-col gap-10 bg-[var(--color-dark-bg)] p-6 md:w-[420px]">

        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-dark-muted)]">
          Comece por aqui
        </p>

        <div className="flex flex-col gap-5">
          {/* Ticker */}
          <div className="flex flex-col gap-2" ref={wrapRef}>
            <label htmlFor="hero-ticker" className="text-xs font-medium text-[var(--color-dark-muted)]">
              Ação ou FII (ticker B3)
            </label>
            <div className="relative">
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 transition focus-within:border-white/25 focus-within:bg-white/[0.10]">
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
                  className="flex-1 bg-transparent text-2xl font-semibold text-[var(--color-dark-text)] outline-none placeholder:text-white/20"
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
            <label htmlFor="hero-shares" className="text-xs font-medium text-[var(--color-dark-muted)]">
              Quantidade de cotas
            </label>
            <input
              id="hero-shares"
              type="text"
              inputMode="numeric"
              value={sharesStr}
              onChange={(e) => setSharesStr(e.target.value.replace(/\D/g, ""))}
              className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-2xl font-light tabular-nums text-[var(--color-dark-text)] outline-none transition focus:border-white/25 focus:bg-white/[0.10]"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => void onSimulate()}
          disabled={loading || !hasValidTicker}
          className={cn(
            "flex items-center justify-between rounded-full pl-6 pr-2 py-2 transition-all",
            "bg-[var(--brand)] hover:bg-[var(--brand-hover)]",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          <span className="text-[1.1rem] font-semibold tracking-[-0.4px] text-[var(--brand-foreground)]">
            {loading ? "Carregando…" : "Simular dividendos"}
          </span>
          <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[var(--color-dark-bg)]">
            <span
              className="material-symbols-outlined select-none leading-none text-[var(--brand)]"
              style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
            >
              arrow_forward
            </span>
          </span>
        </button>

      </div>

      {/* ════════════════════════════════════════
          RIGHT PANEL — surface
      ════════════════════════════════════════ */}
      {showResults && stock ? (
        <div className="flex flex-1 flex-col divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">

          {/* Preço atual */}
          {stock.regularMarketPrice != null && (
            <div className="flex flex-col gap-1 p-6">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Preço atual da ação</p>
              <Amount value={stock.regularMarketPrice} currency={currency} />
            </div>
          )}

          {/* Último dividendo */}
          {lastPayment && (
            <div className="flex flex-col gap-1 p-6">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Último dividendo</p>
              <Amount value={lastPayment.totalForShares} currency={currency} />
              {lastPayment.paymentDate && (
                <p className="text-xs text-[var(--color-text-soft)]">
                  Pago em {formatDatePt(lastPayment.paymentDate)}
                </p>
              )}
            </div>
          )}

          {/* Próximo pagamento */}
          <div className="flex flex-1 flex-col justify-between p-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Próximo pagamento</p>
              {nextPayment ? (
                <>
                  <Amount value={nextPayment.totalForShares} currency={currency} highlight />
                  {nextPayment.paymentDate && (
                    <p className="text-xs text-[var(--color-text-soft)]">
                      Previsto: {formatDatePt(nextPayment.paymentDate)}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-3xl font-light leading-none tracking-[-0.64px] text-[var(--color-text-soft)]">—</p>
              )}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-[var(--color-text-soft)]">
                {perShareValue != null
                  ? `Cerca de ${formatBRL(perShareValue, currency)} por cota`
                  : "—"}
              </p>
              {displayTicker && (
                <Link
                  href={`/acoes/${displayTicker.toLowerCase()}`}
                  className="text-sm font-medium text-[var(--color-text)] no-underline hover:underline"
                >
                  Mais sobre {displayTicker} →
                </Link>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* Placeholder / Error */
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-[var(--color-surface)] p-8 text-center">
          {error ? (
            <div className="flex flex-col items-center gap-2">
              <span
                className="material-symbols-outlined text-3xl leading-none text-[var(--color-text-soft)]"
                style={{ fontVariationSettings: "'opsz' 32, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
              >
                info
              </span>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                {/bloqueia|token|plano pago/i.test(error)
                  ? "Este ticker precisa de autenticação na API."
                  : /não encontrado|inválido/i.test(error)
                  ? "Ticker não encontrado. Verifique se está correto."
                  : "Não foi possível buscar este ticker."}
              </p>
              {/bloqueia|token|plano pago/i.test(error) && (
                <p className="text-xs text-[var(--color-text-soft)]">
                  Tente um ticker PN — ex.:{" "}
                  <strong>ITUB4</strong>, <strong>PETR4</strong>, <strong>VALE3</strong>
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-muted)]">
                <span
                  className="material-symbols-outlined leading-none text-[var(--color-text-soft)]"
                  style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
                >
                  trending_up
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-soft)]">
                Informe um ticker e clique em
                <br />
                <span className="font-semibold text-[var(--color-text-muted)]">&ldquo;Simular dividendos&rdquo;</span>
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
