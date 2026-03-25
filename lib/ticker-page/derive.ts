import type { DividendEntry } from "@/lib/types";
import { getLastDividendPayment, getNextScheduledDividend } from "@/lib/calculations";
import type { DividendStatus } from "./model";

function parseT(iso: string): number {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : NaN;
}

/** Inferência simples a partir das datas de pagamento (não substitui informação oficial). */
export function inferPaymentFrequencyLabel(dividends: DividendEntry[]): string | null {
  if (dividends.length < 2) return null;

  const times = [...dividends]
    .map((d) => parseT(d.paymentDate))
    .filter((t) => Number.isFinite(t))
    .sort((a, b) => a - b);

  if (times.length < 2) return null;

  const gaps: number[] = [];
  for (let i = 1; i < times.length; i++) {
    const days = (times[i]! - times[i - 1]!) / (1000 * 60 * 60 * 24);
    if (days > 0) gaps.push(days);
  }
  if (!gaps.length) return null;

  gaps.sort((a, b) => a - b);
  const median = gaps[Math.floor(gaps.length / 2)]!;

  if (median < 45) return "mensal (aprox.)";
  if (median < 100) return "trimestral (aprox.)";
  if (median < 200) return "semestral (aprox.)";
  if (median < 400) return "anual (aprox.)";
  return "irregular no histórico disponível";
}

export type PerShareSnapshot = {
  amountPerShare: number;
  paymentDate: string;
  status: DividendStatus;
  type: string;
};

export function getLastPerShareSnapshot(dividends: DividendEntry[]): PerShareSnapshot | null {
  const ev = getLastDividendPayment(dividends, 1);
  if (!ev) return null;
  return {
    amountPerShare: ev.totalPerShare,
    paymentDate: ev.paymentDate,
    status: "pago",
    type: "Provento",
  };
}

export function getNextPerShareSnapshot(dividends: DividendEntry[]): PerShareSnapshot | null {
  const ev = getNextScheduledDividend(dividends, 1);
  if (!ev) return null;
  return {
    amountPerShare: ev.totalPerShare,
    paymentDate: ev.paymentDate,
    status: "estimado",
    type: "Provento",
  };
}
