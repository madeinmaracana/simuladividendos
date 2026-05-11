import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

interface MetricRowProps {
  /** Label pequeno acima (usa ui.metricLabel — xs, uppercase, muted) */
  label: string;
  /** Valor principal tabulado */
  value: string;
  /** Linha opcional abaixo do valor (ex.: "Dividend yield: 8,2%") */
  sub?: string;
  /**
   * "base" (padrão) — text-base, compacto, para grades de métricas
   * "lg"            — text-lg, para resumos e destaques side-by-side
   */
  valueSize?: "base" | "lg";
  className?: string;
}

/**
 * Bloco label + valor + sub-texto opcional.
 * Unifica o padrão `Metric` (ComparCard) e `SummaryItem` (ComparVerdict).
 *
 * Sem borda nem fundo — use MetricTile para a variante com card.
 */
export function MetricRow({
  label,
  value,
  sub,
  valueSize = "base",
  className,
}: MetricRowProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <p className={ui.metricLabel}>{label}</p>
      <p
        className={cn(
          "font-semibold tabular-nums text-[var(--color-text)]",
          valueSize === "lg" ? "text-lg" : "text-base",
        )}
      >
        {value}
      </p>
      {sub && (
        <p className="text-xs text-[var(--color-text-muted)]">{sub}</p>
      )}
    </div>
  );
}
