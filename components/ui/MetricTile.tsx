import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ui } from "./classes";

type MetricTileProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function MetricTile({ label, children, className }: MetricTileProps) {
  return (
    <div
      className={cn(
        "rounded-[length:var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 shadow-[var(--shadow-sm)]",
        className
      )}
    >
      <p className={ui.metricLabel}>{label}</p>
      <p className="mt-1.5 font-mono text-base font-semibold tabular-nums text-[var(--color-text)]">
        {children}
      </p>
    </div>
  );
}
