import { formatBRL, formatDatePt } from "@/lib/format";
import type { PerShareSnapshot } from "./derive";

export type DividendTableColumn = { label: string; last: string; next: string };

export function buildDividendTableRows(
  last: PerShareSnapshot | null,
  next: PerShareSnapshot | null,
  currency: string
): DividendTableColumn[] {
  const v = (n: number | undefined) =>
    n != null && Number.isFinite(n) ? formatBRL(n, currency) : "—";

  return [
    {
      label: "Status",
      last: last ? "Pago (último na fonte)" : "—",
      next: next ? "Futuro (lista)" : "Não anunciado",
    },
    {
      label: "Tipo / frequência",
      last: last?.type ?? "—",
      next: next ? next.type : "—",
    },
    {
      label: "Valor por ação",
      last: v(last?.amountPerShare),
      next: v(next?.amountPerShare),
    },
    {
      label: "Data ex",
      last: "—",
      next: "—",
    },
    {
      label: "Data de pagamento",
      last: last ? formatDatePt(last.paymentDate) : "—",
      next: next ? formatDatePt(next.paymentDate) : "—",
    },
  ];
}
