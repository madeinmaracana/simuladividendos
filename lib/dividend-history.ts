import type { DividendEntry } from "@/lib/types";

export const HISTORY_PREVIEW_COUNT = 5;

export function sortDividendsByPaymentDesc(rows: DividendEntry[]): DividendEntry[] {
  return [...rows].sort((a, b) => Date.parse(b.paymentDate) - Date.parse(a.paymentDate));
}

export function dividendPaymentStatus(paymentDateIso: string): "Pago" | "Agendado" | "—" {
  const t = Date.parse(paymentDateIso);
  if (!Number.isFinite(t)) return "—";
  const pay = new Date(t);
  const payDay = Date.UTC(pay.getUTCFullYear(), pay.getUTCMonth(), pay.getUTCDate());
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return payDay <= today ? "Pago" : "Agendado";
}
