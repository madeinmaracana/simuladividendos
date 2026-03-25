import { formatBRL, formatDatePt } from "@/lib/format";
import type { NextDividendEstimate } from "@/lib/types";
import { DividendResultCard } from "@/components/simulator/DividendResultCard";
import { cn } from "@/lib/cn";

export type DividendResultCardsProps = {
  currency: string;
  lastPayment: NextDividendEstimate | null;
  nextPayment: NextDividendEstimate | null;
  hasDividendRows: boolean;
  embedOnTickerPage?: boolean;
  className?: string;
  /** Ritmo inferido do histórico (ex.: "mensal (aprox.)") — só quando não há próximo pagamento datado. */
  paymentFrequencyHint?: string | null;
};

function nextEmptyPrimary(hasDividendRows: boolean): string {
  if (!hasDividendRows) {
    return "Ainda não há registro de proventos para este ativo.";
  }
  return "Próximo dividendo ainda não foi anunciado.";
}

function nextEmptySecondary(hasDividendRows: boolean, frequencyHint: string | null | undefined): string | undefined {
  if (!hasDividendRows || !frequencyHint?.trim()) return undefined;
  return `Historicamente, esta ação costuma pagar dividendos com frequência ${frequencyHint.trim()}.`;
}

export function DividendResultCards({
  currency,
  lastPayment,
  nextPayment,
  hasDividendRows,
  embedOnTickerPage = false,
  className,
  paymentFrequencyHint = null,
}: DividendResultCardsProps) {
  const nextSecondaryEmpty =
    !nextPayment && hasDividendRows ? nextEmptySecondary(hasDividendRows, paymentFrequencyHint) : undefined;

  const nextFooter = nextPayment
    ? `Data prevista: ${formatDatePt(nextPayment.paymentDate)}\nCerca de ${formatBRL(nextPayment.totalPerShare, currency)} por cota`
    : undefined;

  return (
    <div className={cn("grid w-full gap-4 sm:grid-cols-2 sm:gap-6", className)}>
      <DividendResultCard
        label={embedOnTickerPage ? "Último pagamento" : "Último dividendo pago"}
        lead="Você teria recebido"
        leadWhenEmpty="Último pagamento"
        value={lastPayment ? formatBRL(lastPayment.totalForShares, currency) : "—"}
        footer={lastPayment ? `Pago em ${formatDatePt(lastPayment.paymentDate)}` : undefined}
        emptyMessage={
          !hasDividendRows
            ? "Ainda não há histórico de proventos para este ativo."
            : !lastPayment
              ? "Não foi possível identificar um pagamento já realizado com as datas disponíveis."
              : undefined
        }
      />

      <DividendResultCard
        label="Próximo pagamento"
        lead="Total estimado para as suas cotas"
        leadWhenEmpty="Sem data futura divulgada ainda"
        value={nextPayment ? formatBRL(nextPayment.totalForShares, currency) : "—"}
        footer={nextFooter}
        emptyMessage={!nextPayment ? nextEmptyPrimary(hasDividendRows) : undefined}
        emptySecondary={nextSecondaryEmpty}
      />
    </div>
  );
}
