"use client";

import { useMemo } from "react";
import type { StockQuote } from "@/lib/types";
import { calculateDividends, getLastDividendPayment } from "@/lib/calculations";
import { formatBRL, formatDatePt } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export type FiiIncomeCardsProps = {
  stock: StockQuote;
  sharesStr: string;
  currency: string;
  className?: string;
};

/**
 * Renda mensal/anual de referência (média 12m) + último pagamento — FIIs.
 */
export function FiiIncomeCards({ stock, sharesStr, currency, className }: FiiIncomeCardsProps) {
  const shares = Math.max(0, parseInt(sharesStr, 10) || 0);

  const calc = useMemo(() => {
    if (!stock.dividends?.length) return null;
    return calculateDividends(stock.dividends, shares);
  }, [stock.dividends, shares]);

  const last = useMemo(() => {
    if (!stock.dividends?.length) return null;
    return getLastDividendPayment(stock.dividends, shares);
  }, [stock.dividends, shares]);

  if (!calc) {
    return (
      <p className={cn("text-[13px] font-medium text-[#6B7280]", className)}>
        Sem histórico de distribuições nos dados para calcular renda de referência.
      </p>
    );
  }

  const hasMonthly = calc.monthlyAvgEstimate > 0;

  return (
    <div className={cn("grid w-full gap-3 sm:grid-cols-2", className)}>
      <div className="flex flex-col gap-1 rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-5">
        <span className="text-[13px] font-medium text-[#6B7280]">Você receberia em média</span>
        <p className="text-[27px] font-medium leading-tight tabular-nums text-[#111827]">
          {hasMonthly ? `~${formatBRL(calc.monthlyAvgEstimate, currency)}` : "—"}
        </p>
        <p className="text-[13px] font-medium text-[#6B7280]">por mês (referência)</p>
        <p className="mt-2 text-[13px] font-medium text-[#6B7280]">
          Média simples: total distribuído nos últimos ~12 meses ÷ 12, aplicado às suas cotas. Não é promessa de rendimento futuro.
        </p>
      </div>

      <div className="flex flex-col gap-1 rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-5">
        <span className="text-[13px] font-medium text-[#6B7280]">Total de referência</span>
        <p className="text-[27px] font-medium leading-tight tabular-nums text-[#111827]">
          {calc.annualEstimate > 0 ? `~${formatBRL(calc.annualEstimate, currency)}` : "—"}
        </p>
        <p className="text-[13px] font-medium text-[#6B7280]">em ~12 meses</p>
        <p className="mt-2 text-[13px] font-medium text-[#6B7280]">
          Soma das distribuições por cota no período × número de cotas (conforme histórico disponível).
        </p>
      </div>

      <div className="flex flex-col gap-1 rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-5 sm:col-span-2">
        <span className="text-[13px] font-medium text-[#6B7280]">Último pagamento</span>
        {last ? (
          <>
            <p className="text-[27px] font-medium leading-tight tabular-nums text-[#111827]">
              {formatBRL(last.totalForShares, currency)}
            </p>
            <p className="text-[13px] font-medium text-[#6B7280]">Pago em {formatDatePt(last.paymentDate)}</p>
          </>
        ) : (
          <p className="text-[13px] font-medium text-[#6B7280]">Não identificamos um pagamento passado com as datas atuais.</p>
        )}
      </div>
    </div>
  );
}
