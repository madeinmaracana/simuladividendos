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
      <p className={cn(ui.bodyMuted, className)}>
        Sem histórico de distribuições nos dados para calcular renda de referência.
      </p>
    );
  }

  const hasMonthly = calc.monthlyAvgEstimate > 0;

  return (
    <div className={cn("grid w-full gap-4 sm:grid-cols-2 sm:gap-6", className)}>
      <div
        className={cn(
          "flex flex-col rounded-2xl border border-[var(--border)] bg-neutral-50/80 p-6 sm:p-8",
          "dark:border-neutral-800 dark:bg-neutral-900/40"
        )}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Renda mensal (referência)
        </span>
        <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Você receberia em média
        </p>
        <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
          {hasMonthly ? `~${formatBRL(calc.monthlyAvgEstimate, currency)}` : "—"}
        </p>
        <p className={cn(ui.bodyMuted, "mt-4")}>
          Média simples: total distribuído nos últimos ~12 meses nos dados ÷ 12, aplicado às suas cotas. Não é
          promessa de rendimento futuro.
        </p>
      </div>

      <div
        className={cn(
          "flex flex-col rounded-2xl border border-[var(--border)] bg-neutral-50/80 p-6 sm:p-8",
          "dark:border-neutral-800 dark:bg-neutral-900/40"
        )}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Rendimentos em ~12 meses
        </span>
        <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">Total de referência</p>
        <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
          {calc.annualEstimate > 0 ? `~${formatBRL(calc.annualEstimate, currency)}` : "—"}
        </p>
        <p className={cn(ui.bodyMuted, "mt-4")}>
          Soma das distribuições por cota no período × número de cotas (conforme histórico disponível).
        </p>
      </div>

      <div
        className={cn(
          "flex flex-col rounded-2xl border border-[var(--border)] bg-neutral-50/80 p-6 sm:p-8 sm:col-span-2",
          "dark:border-neutral-800 dark:bg-neutral-900/40"
        )}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Último pagamento
        </span>
        {last ? (
          <>
            <p className="mt-3 text-2xl font-bold tabular-nums text-neutral-900 dark:text-neutral-50">
              {formatBRL(last.totalForShares, currency)}
            </p>
            <p className={cn(ui.bodyMuted, "mt-2")}>Pago em {formatDatePt(last.paymentDate)}</p>
          </>
        ) : (
          <p className={cn(ui.bodyMuted, "mt-3")}>Não identificamos um pagamento passado com as datas atuais.</p>
        )}
      </div>
    </div>
  );
}
