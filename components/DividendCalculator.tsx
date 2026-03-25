"use client";

import { useEffect, useState } from "react";
import type { StockQuote } from "@/lib/types";
import { SearchInput } from "@/components/SearchInput";
import { DividendSimulatorSimple } from "@/components/simulator/DividendSimulatorSimple";
import { cn } from "@/lib/cn";

const DEFAULT_TICKER = "PETR4";

export type DividendCalculatorProps = {
  initialTicker?: string;
  /** Em home/simulador: exibe busca de ticker acima do card (o card só tem quantidade de cotas). */
  showTickerPicker?: boolean;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
  showBackLink?: boolean;
};

/**
 * Wrapper compatível com páginas existentes. O simulador em si é {@link DividendSimulatorSimple}.
 */
export function DividendCalculator({
  initialTicker = DEFAULT_TICKER,
  showTickerPicker = false,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
  showBackLink = false,
}: DividendCalculatorProps) {
  const [ticker, setTicker] = useState(() => (initialTicker?.trim() ? initialTicker.trim() : DEFAULT_TICKER));

  useEffect(() => {
    setTicker(initialTicker?.trim() ? initialTicker.trim() : DEFAULT_TICKER);
  }, [initialTicker]);

  return (
    <div className={cn("flex w-full flex-col gap-6")}>
      {showTickerPicker ? (
        <div className="mx-auto w-full max-w-[800px]">
          <SearchInput
            value={ticker}
            onChange={setTicker}
            label="Ação (ticker B3)"
            showHelperText={false}
            placeholder="Ex.: PETR4"
          />
        </div>
      ) : null}
      <DividendSimulatorSimple
        ticker={ticker}
        initialStock={initialStock}
        serverError={serverError}
        defaultShares={defaultShares}
        showBackLink={showBackLink}
      />
    </div>
  );
}
