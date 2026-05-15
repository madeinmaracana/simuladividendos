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
        "rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-[#F3F4F6] p-4 shadow-sm",
        className
      )}
    >
      <p className={ui.metricLabel}>{label}</p>
      <p className="mt-1.5 font-mono text-base font-semibold tabular-nums text-[#111827]">
        {children}
      </p>
    </div>
  );
}
