"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import type { StockQuote } from "@/lib/types";
import { DividendSimulatorForm } from "@/components/simulator/DividendSimulatorForm";
import { DividendResultCardsSkeleton } from "@/components/simulator/DividendResultCardsSkeleton";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { FiiIncomeCards } from "@/components/fii/FiiIncomeCards";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export type FiiSimulatorTopProps = {
  hero: ReactNode;
  ticker: string;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
  className?: string;
};

export function FiiSimulatorTop({
  hero,
  ticker,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
  className,
}: FiiSimulatorTopProps) {
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
    onSimulate,
  } = useDividendSimulator(ticker, initialStock, serverError, defaultShares, "tickerPage");

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
    <section
      aria-labelledby="heading-simulacao-ticker"
      className={cn(ui.pageSection, "flex flex-col gap-8 lg:gap-12", className)}
    >
      <div className={ui.tickerTopGrid}>
        <div className={cn(ui.tickerTopMain, "order-1 flex flex-col gap-4")}>
          {hero}
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <TextLink href="#heading-resumo-fii" className="font-medium">
              Ir para o resumo
            </TextLink>
          </p>
        </div>

        <div className={cn(ui.tickerTopAside, "order-2")}>
          <DividendSimulatorForm
            inputId="sim-shares-fii-top"
            sharesStr={sharesStr}
            onSharesChange={setSharesStr}
            loading={loading}
            onSimulate={() => void handleSimulate()}
            error={error}
            embedOnTickerPage
            tickerSymbolForHeading={ticker}
            simulateCta="none"
            assetKind="fii"
            compact
            elevated
            currentPrice={stock?.currentPrice ?? stock?.regularMarketPrice ?? null}
            currency={currency}
            lastUpdated={stock?.lastUpdated}
          />
        </div>
      </div>

      <div ref={resultsRef} id="fii-sim-results" className="scroll-mt-20" tabIndex={-1}>
        {loading ? (
          <DividendResultCardsSkeleton />
        ) : showResults && stock ? (
          <FiiIncomeCards stock={stock} sharesStr={sharesStr} currency={currency} />
        ) : null}
      </div>

      <p className={ui.bodyMuted}>
        Estimativas educacionais com base em dados públicos. Rendimentos de fundos dependem de regulamento e resultado
        do fundo.
      </p>
    </section>
  );
}
