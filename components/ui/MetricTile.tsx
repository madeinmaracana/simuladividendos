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
        "rounded-xl border border-[var(--border)] bg-neutral-50/90 p-4 dark:bg-neutral-950/50",
        className
      )}
    >
      <p className={ui.metricLabel}>{label}</p>
      <p className="mt-1.5 text-base font-semibold tabular-nums text-neutral-900 dark:text-neutral-50">
        {children}
      </p>
    </div>
  );
}
