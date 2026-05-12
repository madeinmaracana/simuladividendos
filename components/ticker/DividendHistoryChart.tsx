import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import type { DividendEntry } from "@/lib/types";

interface Props {
  dividends: DividendEntry[];
  currency?: string;
  frequencyHint?: string | null;
}

const PT_MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

/**
 * Gráfico de barras CSS-only (server component) com métricas de consistência.
 * Mostra os últimos 12 meses de pagamentos por cota.
 */
export function DividendHistoryChart({ dividends, currency = "BRL", frequencyHint }: Props) {
  // Monta os 12 meses de calendário (do mais antigo ao mais recente)
  const now = new Date();
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  // Agrupa dividendos por mês (soma caso haja mais de um pagamento no mês)
  const byMonth = new Map<string, number>();
  for (const div of dividends) {
    const d = new Date(div.paymentDate);
    if (isNaN(d.getTime())) continue;
    // Filtra apenas os últimos 12 meses
    const minDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    if (d < minDate) continue;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    byMonth.set(key, (byMonth.get(key) ?? 0) + div.ratePerShare);
  }

  const data = months.map(({ year, month }) => ({
    label: PT_MONTHS[month]!,
    value: byMonth.get(`${year}-${month}`) ?? 0,
  }));

  const maxValue = Math.max(...data.map((d) => d.value), 0.001);
  const paidMonths = data.filter((d) => d.value > 0).length;

  if (paidMonths === 0) return null;

  // Meses consecutivos mais recentes com pagamento
  let consecutiveRecent = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i]!.value > 0) consecutiveRecent++;
    else break;
  }

  return (
    <section className={cn(ui.pageSection, "flex flex-col gap-5")}>
      <div className="flex flex-col gap-1">
        <h2 className="text-[27px] font-medium leading-tight text-white">Histórico de pagamentos</h2>
        <p className="text-[13px] font-medium text-[#808080]">Últimos 12 meses · valor por cota</p>
      </div>

      {/* Gráfico de barras */}
      <div className="flex h-28 items-end gap-[3px]">
        {data.map(({ label, value }) => {
          const heightPct = value > 0 ? Math.max((value / maxValue) * 100, 6) : 0;
          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="relative flex w-full flex-1 items-end">
                {value > 0 && (
                  <div
                    className="group/bar relative w-full cursor-default rounded-t-[3px]"
                    style={{
                      height: `${heightPct}%`,
                      background: "var(--brand)",
                    }}
                    title={formatBRL(value, currency)}
                  >
                    {/* Tooltip no hover */}
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--color-dark-bg)] px-2 py-1 text-[10px] font-medium text-[var(--color-dark-text)] opacity-0 shadow-md transition-opacity group-hover/bar:opacity-100">
                      {formatBRL(value, currency)}
                    </span>
                  </div>
                )}
                {value === 0 && (
                  <div
                    className="w-full rounded-t-[3px]"
                    style={{ height: "3px", background: "var(--color-border)" }}
                  />
                )}
              </div>
              <span className="text-[9px] font-medium text-[var(--color-text-soft)]">{label}</span>
            </div>
          );
        })}
      </div>

      {/* Consistência */}
      <div className="flex flex-col gap-2 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Pontos visuais */}
          <div className="flex gap-[5px]" aria-label={`Pagou em ${paidMonths} dos últimos 12 meses`}>
            {data.map(({ label, value }) => (
              <div
                key={label}
                title={label}
                className={cn(
                  "h-2 w-2 rounded-full",
                  value > 0
                    ? "bg-[var(--brand)]"
                    : "border border-[var(--color-border-strong)] bg-transparent"
                )}
              />
            ))}
          </div>

          <span className="text-[13px] font-medium text-[#808080]">
            Pagou em{" "}
            <strong className="font-semibold text-white">{paidMonths}/12</strong>{" "}
            meses
          </span>

          {consecutiveRecent > 1 && (
            <span className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-2.5 py-0.5 text-xs font-medium text-[#808080]">
              {consecutiveRecent} consecutivos
            </span>
          )}
        </div>

        {frequencyHint && (
          <p className="text-[13px] font-medium text-[#808080]">
            Frequência estimada: <span className="font-medium text-white">{frequencyHint}</span>
          </p>
        )}
      </div>
    </section>
  );
}
