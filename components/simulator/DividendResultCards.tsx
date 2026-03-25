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
};

export function DividendResultCards({
  currency,
  lastPayment,
  nextPayment,
  hasDividendRows,
  embedOnTickerPage = false,
  className,
}: DividendResultCardsProps) {
  return (
    <div className={cn("grid w-full gap-4 sm:grid-cols-2 sm:gap-6", className)}>
      <DividendResultCard
        label={embedOnTickerPage ? "Último pagamento" : "Último dividendo pago"}
        lead="Você teria recebido"
        value={lastPayment ? formatBRL(lastPayment.totalForShares, currency) : "—"}
        footer={lastPayment ? `Pago em ${formatDatePt(lastPayment.paymentDate)}` : undefined}
        emptyMessage={
          !hasDividendRows
            ? "Não há histórico de proventos para este ativo na fonte consultada."
            : !lastPayment
              ? "Não foi possível identificar um pagamento passado com base nas datas disponíveis."
              : undefined
        }
      />

      <DividendResultCard
        label={embedOnTickerPage ? "Próximo pagamento estimado" : "Próximo dividendo (estimado)"}
        lead={embedOnTickerPage ? "Você pode receber aproximadamente" : "Você deve receber aproximadamente"}
        value={nextPayment ? formatBRL(nextPayment.totalForShares, currency) : "—"}
        footer={nextPayment ? `Previsto para ${formatDatePt(nextPayment.paymentDate)}` : undefined}
        emptyMessage={
          !hasDividendRows
            ? "Sem dados de proventos anunciados ou agendados."
            : !nextPayment
              ? embedOnTickerPage
                ? "Próximo dividendo ainda não anunciado na fonte."
                : "Próximo dividendo ainda não anunciado na lista retornada pela fonte."
              : undefined
        }
      />
    </div>
  );
}
