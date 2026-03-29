"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StockQuote } from "@/lib/types";
import { TextLink } from "@/components/ui/TextLink";
import { Callout } from "@/components/ui/Callout";
import { SimulatorCardContainer } from "@/components/simulator/SimulatorCardContainer";
import { DividendResultCards } from "@/components/simulator/DividendResultCards";
import { DividendResultCardsSkeleton } from "@/components/simulator/DividendResultCardsSkeleton";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { inferPaymentFrequencyLabel } from "@/lib/ticker-page";
import { PrimarySimulationButton } from "@/components/home/PrimarySimulationButton";
import { SharesInputField } from "@/components/home/SharesInputField";
import { TickerSelectField, type TickerSelectionMeta } from "@/components/home/TickerSelectField";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export type HomeSimulatorCardProps = {
  ticker: string;
  onTickerChange: (ticker: string) => void;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
  showBackLink?: boolean;
  className?: string;
  /**
   * `auto`: carrega proventos após debounce do ticker (ex.: /simulador).
   * `manual`: exige clique em “Simular dividendos” (ex.: home focada em ação).
   */
  fetchMode?: "auto" | "manual";
  /** Esconde título interno longo — use quando o h1 da página já explica o produto. */
  compactHero?: boolean;
};

/**
 * Card da home e /simulador: ticker + quantidade (+ botão se `fetchMode="manual"`).
 */
export function HomeSimulatorCard({
  ticker,
  onTickerChange,
  initialStock = null,
  serverError = null,
  defaultShares = 100,
  showBackLink = false,
  className,
  fetchMode = "auto",
  compactHero = false,
}: HomeSimulatorCardProps) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [selectionMeta, setSelectionMeta] = useState<TickerSelectionMeta | null>(null);

  const variant = fetchMode === "manual" ? "homeManual" : "home";

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
  } = useDividendSimulator(ticker, initialStock, serverError, defaultShares, variant);

  const handleTickerChange = useCallback(
    (v: string, meta?: TickerSelectionMeta) => {
      onTickerChange(v);
      setSelectionMeta(meta ?? null);
    },
    [onTickerChange]
  );

  const handleSimulate = useCallback(() => {
    void onSimulate();
  }, [onSimulate]);

  useEffect(() => {
    if (!stock?.symbol) return;
    if (stock.symbol.toUpperCase() !== ticker.trim().toUpperCase()) return;
    setSelectionMeta({
      name: stock.longName || stock.shortName || stock.symbol,
      logoUrl: stock.logoUrl,
    });
  }, [stock, ticker]);

  const wasLoadingRef = useRef(false);
  useEffect(() => {
    const finishedLoad = wasLoadingRef.current && !loading;
    wasLoadingRef.current = loading;
    if (!finishedLoad || !showResults) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [loading, showResults]);

  const gapMain = compactHero ? "gap-4 sm:gap-5" : "gap-8";

  return (
    <div className={cn("flex w-full min-w-0 flex-col", gapMain, className)}>
      {showBackLink ? (
        <TextLink href="/" className="inline-flex w-fit text-sm">
          ← Voltar ao início
        </TextLink>
      ) : null}

      <SimulatorCardContainer
        className={cn(
          "mx-auto w-full",
          compactHero &&
            "max-w-[576px] border-[color:#E2E2E0] p-8 md:p-9 shadow-[0_6px_18px_rgba(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10"
        )}
      >
        {!compactHero ? (
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-50">
              Simule quanto essa ação paga em dividendos
            </h2>
            <p className={cn(ui.body, "mx-auto max-w-prose text-pretty sm:mx-0")}>
              Escolha a ação na B3 e informe quantas cotas você tem. Os proventos são carregados automaticamente após o
              ticker (com uma breve pausa enquanto você digita). Os totais são atualizados na hora quando você muda a
              quantidade — estimativas educacionais, sem garantia de pagamentos futuros.
            </p>
          </div>
        ) : null}

        <div
          className={cn(
            "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5",
            compactHero ? "mt-0" : "mt-6"
          )}
        >
          <TickerSelectField
            id="home-ticker-field"
            value={ticker}
            onChange={handleTickerChange}
            disabled={loading}
            selectionMeta={selectionMeta}
          />
          <SharesInputField
            id="home-shares-field"
            value={sharesStr}
            onChange={setSharesStr}
            disabled={loading}
            size="lg"
          />
        </div>

        {stock?.regularMarketPrice != null ? (
          <p className={cn(ui.bodyMuted, "mt-4 font-mono tabular-nums")}>
            Preço atual da ação:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: currency ?? "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(stock.regularMarketPrice)}
          </p>
        ) : null}

        {fetchMode === "manual" ? (
          <div className="mt-5">
            <PrimarySimulationButton loading={loading} onClick={() => void handleSimulate()} />
          </div>
        ) : null}

        {error ? (
          <Callout tone="danger" role="alert" className="mt-5">
            <div className="flex flex-col gap-2">
              <span>{error}</span>
              <button
                type="button"
                className="w-fit text-left text-sm font-semibold text-red-800 underline decoration-red-800/40 underline-offset-2 hover:decoration-red-800 dark:text-red-200 dark:decoration-red-200/40"
                onClick={() => void handleSimulate()}
              >
                Tentar novamente
              </button>
            </div>
          </Callout>
        ) : null}

        {compactHero && fetchMode === "manual" ? (
          <p className={cn(ui.bodyMuted, "mt-4 text-center text-[color:#5F5F5F] sm:text-left")}>
            Depois de carregar, altere a quantidade de ações para atualizar os valores na hora.
          </p>
        ) : null}
      </SimulatorCardContainer>

      <div ref={resultsRef} id="home-sim-results" className="scroll-mt-16" tabIndex={-1}>
        {loading ? (
          <DividendResultCardsSkeleton className="mx-auto w-full max-w-[var(--simulator-card-max)]" />
        ) : showResults ? (
          <DividendResultCards
            currency={currency}
            lastPayment={lastPayment}
            nextPayment={nextPayment}
            hasDividendRows={hasDividendRows}
            paymentFrequencyHint={
              stock?.dividends?.length ? inferPaymentFrequencyLabel(stock.dividends) : null
            }
            className="mx-auto w-full max-w-[var(--simulator-card-max)]"
          />
        ) : null}
      </div>

      {showResults && stock ? (
        <p className={cn(ui.bodyMuted, "mx-auto w-full max-w-[var(--simulator-card-max)] text-center sm:text-left")}>
          <TextLink href={`/acoes/${encodeURIComponent(stock.symbol)}`} className="text-sm font-medium">
            Página de {stock.symbol}
          </TextLink>
          {" · "}
          Educacional; sem garantia de pagamentos futuros.
        </p>
      ) : null}

      <p
        className={cn(
          ui.bodyMuted,
          "mx-auto w-full max-w-[var(--simulator-card-max)] text-center text-[color:#5F5F5F] sm:text-left"
        )}
      >
        Fonte pública de proventos. Não é recomendação de investimento.
      </p>
    </div>
  );
}
