"use client";

import { useCallback, useEffect, useRef } from "react";
import type { StockQuote } from "@/lib/types";
import { TextLink } from "@/components/ui/TextLink";
import { DividendSimulatorForm } from "@/components/simulator/DividendSimulatorForm";
import { DividendResultCards } from "@/components/simulator/DividendResultCards";
import { DividendResultCardsSkeleton } from "@/components/simulator/DividendResultCardsSkeleton";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export type DividendSimulatorSimpleProps = {
  /** Ticker B3 (ex.: PETR4). Obrigatório para buscar proventos na API. */
  ticker: string;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
  showBackLink?: boolean;
  className?: string;
  /** Na página do ticker: textos dos cards e sem link “ver página”. */
  embedOnTickerPage?: boolean;
};

export function DividendSimulatorSimple({
  ticker,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
  showBackLink = false,
  embedOnTickerPage = false,
  className,
}: DividendSimulatorSimpleProps) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollAfterSimulate = useRef(false);

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
    hasDividendRows,
    onSimulate,
  } = useDividendSimulator(ticker, initialStock, serverError, defaultShares);

  const handleSimulate = useCallback(async () => {
    scrollAfterSimulate.current = true;
    await onSimulate();
  }, [onSimulate]);

  useEffect(() => {
    if (loading) return;
    if (!scrollAfterSimulate.current) return;
    scrollAfterSimulate.current = false;
    if (!showResults) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [loading, showResults]);

  return (
    <div className={cn("flex w-full flex-col gap-8", className)}>
      {showBackLink ? (
        <TextLink href="/" className="inline-flex w-fit text-sm">
          ← Voltar ao início
        </TextLink>
      ) : null}

      <DividendSimulatorForm
        inputId="sim-shares-simple"
        sharesStr={sharesStr}
        onSharesChange={setSharesStr}
        loading={loading}
        onSimulate={() => void handleSimulate()}
        error={error}
        embedOnTickerPage={embedOnTickerPage}
      />

      <div ref={resultsRef} id="sim-results-simple" className="scroll-mt-20" tabIndex={-1}>
        {loading ? (
          <DividendResultCardsSkeleton className="w-full" />
        ) : showResults ? (
          <DividendResultCards
            currency={currency}
            lastPayment={lastPayment}
            nextPayment={nextPayment}
            hasDividendRows={hasDividendRows}
            embedOnTickerPage={embedOnTickerPage}
            className="w-full"
          />
        ) : null}
      </div>

      {showResults && stock && !embedOnTickerPage ? (
        <p className={cn(ui.bodyMuted, "w-full text-center sm:text-left")}>
          <TextLink href={`/acoes/${encodeURIComponent(stock.symbol)}`} className="text-sm">
            Ver página de {stock.symbol}
          </TextLink>{" "}
          para mais contexto. Valores por cota × quantidade de ações; não são garantia de pagamentos futuros.
        </p>
      ) : null}

      <p className={ui.bodyMuted}>
        Os valores são estimativas com base em dados públicos. Dividendos dependem de decisão da companhia.
      </p>
    </div>
  );
}
