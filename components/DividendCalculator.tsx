"use client";

import { useEffect, useState } from "react";
import type { StockQuote } from "@/lib/types";
import { HomeSimulatorCard } from "@/components/home/HomeSimulatorCard";
import { DividendSimulatorSimple } from "@/components/simulator/DividendSimulatorSimple";

const DEFAULT_TICKER = "PETR4";

function resolveInitialTicker(initialTicker: string | undefined, showTickerPicker: boolean): string {
  const cleaned = initialTicker?.trim();
  if (cleaned) return cleaned;
  // Na home com combobox, começamos vazio para não parecer valor pré-selecionado.
  if (showTickerPicker) return "";
  return DEFAULT_TICKER;
}

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
  initialTicker,
  showTickerPicker = false,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
  showBackLink = false,
  simulatorFetchMode = "auto",
  compactHero = false,
}: DividendCalculatorProps) {
  const [ticker, setTicker] = useState(() => resolveInitialTicker(initialTicker, showTickerPicker));

  useEffect(() => {
    setTicker(resolveInitialTicker(initialTicker, showTickerPicker));
  }, [initialTicker, showTickerPicker]);

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
