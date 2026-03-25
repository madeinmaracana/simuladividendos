"use client";

import { SharesInput } from "@/components/SharesInput";
import { SimulatorCardContainer } from "@/components/simulator/SimulatorCardContainer";
import { Button } from "@/components/ui/Button";
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
  /** Coluna estreita na página de ticker: padding um pouco menor. */
  compact?: boolean;
  /** Destaque extra (sombra) na coluna direita. */
  elevated?: boolean;
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
  compact = false,
  elevated = false,
  className,
  cardClassName,
}: DividendSimulatorFormProps) {
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
            {embedOnTickerPage ? "Simule quanto você receberia" : "Simule quanto essa ação paga em dividendos"}
          </h2>
          <p
            className={cn(
              ui.body,
              "text-balance",
              embedOnTickerPage ? "w-full text-left" : "mx-auto max-w-prose sm:mx-0"
            )}
          >
            {embedOnTickerPage
              ? "Informe quantas ações você possui. Os valores usam os dividendos por ação da lista retornada pela fonte."
              : "Veja quanto você teria recebido e quanto pode receber no próximo pagamento — com base nos proventos disponíveis na fonte de dados."}
          </p>
        </div>

        <div className={cn("flex flex-col gap-6", compact ? "mt-6" : "mt-8")}>
          <SharesInput id={inputId} value={sharesStr} onChange={onSharesChange} disabled={loading} size="lg" />

          <Button
            type="button"
            onClick={() => onSimulate()}
            disabled={loading}
            className={cn(
              "w-full rounded-xl bg-teal-600 px-6 py-4 text-base font-semibold text-white shadow-md transition-shadow",
              "hover:bg-teal-500 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
              "disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-teal-500"
            )}
          >
            {loading ? "Carregando…" : "Simular dividendos"}
          </Button>

          {error ? (
            <Callout tone="danger" role="alert">
              {error}
            </Callout>
          ) : null}
        </div>
      </SimulatorCardContainer>
    </div>
  );
}
