"use client";

import { SharesInput } from "@/components/SharesInput";
import { PrimarySimulationButton } from "@/components/home/PrimarySimulationButton";
import { SimulatorCardContainer } from "@/components/simulator/SimulatorCardContainer";
import { Callout } from "@/components/ui/Callout";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export type DividendSimulatorFormProps = {
  inputId: string;
  sharesStr: string;
  onSharesChange: (v: string) => void;
  loading: boolean;
  onSimulate: () => void;
  error: string | null;
  embedOnTickerPage?: boolean;
  /** Na página de ticker, texto do H2 com o código (ex.: “Simular dividendos de PETR4”). */
  tickerSymbolForHeading?: string;
  /** `none`: resultados automáticos (home/ticker); `primary`: exige clique para carregar dados. */
  simulateCta?: "none" | "primary";
  /** Com `simulateCta="none"` e erro de rede/API, oferece nova tentativa. */
  showRetryLink?: boolean;
  /** Coluna estreita na página de ticker: padding um pouco menor. */
  compact?: boolean;
  /** Destaque extra (sombra) na coluna direita. */
  elevated?: boolean;
  /** FII: textos falam em rendimentos e renda mensal; ação: dividendos. */
  assetKind?: "stock" | "fii";
  /** Preço atual (ou mais recente) exibido como contexto (não altera cálculo). */
  currentPrice?: number | null;
  currency?: string;
  lastUpdated?: string;
  className?: string;
  cardClassName?: string;
};

export function DividendSimulatorForm({
  inputId,
  sharesStr,
  onSharesChange,
  loading,
  onSimulate,
  error,
  embedOnTickerPage = false,
  tickerSymbolForHeading,
  simulateCta = "none",
  showRetryLink = true,
  compact = false,
  elevated = false,
  assetKind = "stock",
  currentPrice = null,
  currency = "BRL",
  lastUpdated,
  className,
  cardClassName,
}: DividendSimulatorFormProps) {
  const autoMode = simulateCta === "none";
  const fii = assetKind === "fii";

  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      <SimulatorCardContainer
        className={cn(
          "mx-0 max-w-none",
          compact && "p-5 sm:p-6 md:p-7",
          elevated &&
            "shadow-[0_8px_32px_-8px_rgb(15_23_42/0.12),0_4px_12px_rgb(15_23_42/0.06)] ring-1 ring-neutral-900/5 dark:shadow-[0_8px_32px_-8px_rgb(0_0_0/0.45)] dark:ring-white/5",
          cardClassName
        )}
      >
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2
            id="heading-simulacao-ticker"
            className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-50"
          >
            {embedOnTickerPage && tickerSymbolForHeading && fii
              ? `Simular rendimentos de ${tickerSymbolForHeading}`
              : embedOnTickerPage && tickerSymbolForHeading
                ? `Simular dividendos de ${tickerSymbolForHeading}`
                : embedOnTickerPage
                  ? "Simule quanto você receberia"
                  : fii
                    ? "Simule renda com este FII"
                    : "Simule quanto essa ação paga em dividendos"}
          </h2>
          <p
            className={cn(
              ui.body,
              "text-balance",
              embedOnTickerPage ? "w-full text-left" : "mx-auto max-w-prose sm:mx-0"
            )}
          >
            {embedOnTickerPage && autoMode && fii
              ? "Informe quantas cotas você possui. Mostramos renda mensal de referência e o último pagamento com base no histórico disponível — tudo atualiza ao mudar a quantidade."
              : embedOnTickerPage && autoMode
                ? "Informe a quantidade de ações para ver quanto você teria recebido conforme os proventos da lista. Os valores são atualizados automaticamente ao alterar a quantidade."
                : embedOnTickerPage
                  ? fii
                    ? "Informe suas cotas. Os valores usam as distribuições por cota do histórico disponível."
                    : "Informe quantas ações você possui. Os valores usam os dividendos por ação da lista retornada pela fonte."
                  : autoMode
                    ? "Informe a quantidade de cotas. Quando os dados do ativo estiverem carregados, os totais são atualizados automaticamente."
                    : "Veja quanto você teria recebido e quanto pode receber no próximo pagamento — com base nos proventos disponíveis na fonte de dados. Use o botão abaixo para carregar ou atualizar os dados."}
          </p>
        </div>

        <div className={cn("flex flex-col gap-6", compact ? "mt-6" : "mt-8")}>
          <SharesInput id={inputId} value={sharesStr} onChange={onSharesChange} disabled={loading} size="lg" />

          {currentPrice != null ? (
            <p className={cn(ui.bodyMuted, "font-mono tabular-nums")}>
              {assetKind === "fii" ? "Preço atual da cota" : "Preço atual da ação"}:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(currentPrice)}
              {lastUpdated ? ` · atualizado ${new Date(lastUpdated).toLocaleString("pt-BR")}` : ""}
            </p>
          ) : null}

          {simulateCta === "primary" ? (
            <PrimarySimulationButton loading={loading} onClick={() => onSimulate()} />
          ) : null}

          {error ? (
            <Callout tone="danger" role="alert">
              <div className="flex flex-col gap-2">
                <span>{error}</span>
                {autoMode && showRetryLink ? (
                  <button
                    type="button"
                    className="w-fit text-left text-sm font-semibold text-red-800 underline decoration-red-800/40 underline-offset-2 hover:decoration-red-800 dark:text-red-200 dark:decoration-red-200/40"
                    onClick={() => onSimulate()}
                  >
                    Tentar novamente
                  </button>
                ) : null}
              </div>
            </Callout>
          ) : null}
        </div>
      </SimulatorCardContainer>
    </div>
  );
}
