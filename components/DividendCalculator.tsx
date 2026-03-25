"use client";

import { useEffect, useState } from "react";
import type { StockQuote } from "@/lib/types";
import { HomeSimulatorCard } from "@/components/home/HomeSimulatorCard";
import { DividendSimulatorSimple } from "@/components/simulator/DividendSimulatorSimple";

const DEFAULT_TICKER = "PETR4";

export type DividendCalculatorProps = {
  initialTicker?: string;
  /** Home e /simulador: ticker e simulação em um único card ({@link HomeSimulatorCard}). */
  showTickerPicker?: boolean;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
  showBackLink?: boolean;
  /** Repassado ao {@link HomeSimulatorCard} quando `showTickerPicker`. */
  simulatorFetchMode?: "auto" | "manual";
  compactHero?: boolean;
};

/**
 * Na home (picker ligado): {@link HomeSimulatorCard}. Caso contrário: {@link DividendSimulatorSimple} com ticker fixo.
 */
export function DividendCalculator({
  initialTicker = DEFAULT_TICKER,
  showTickerPicker = false,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
  showBackLink = false,
  simulatorFetchMode = "auto",
  compactHero = false,
}: DividendCalculatorProps) {
  const [ticker, setTicker] = useState(() => (initialTicker?.trim() ? initialTicker.trim() : DEFAULT_TICKER));

  useEffect(() => {
    setTicker(initialTicker?.trim() ? initialTicker.trim() : DEFAULT_TICKER);
  }, [initialTicker]);

  if (showTickerPicker) {
    return (
      <HomeSimulatorCard
        ticker={ticker}
        onTickerChange={setTicker}
        initialStock={initialStock}
        serverError={serverError}
        defaultShares={defaultShares}
        showBackLink={showBackLink}
        fetchMode={simulatorFetchMode}
        compactHero={compactHero}
      />
    );
  }

  return (
    <DividendSimulatorSimple
      ticker={ticker}
      initialStock={initialStock}
      serverError={serverError}
      defaultShares={defaultShares}
      showBackLink={showBackLink}
    />
  );
}
