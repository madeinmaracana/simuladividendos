"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type PrimarySimulationButtonProps = {
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export function PrimarySimulationButton({
  loading,
  onClick,
  disabled = false,
  className,
}: PrimarySimulationButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "min-h-[52px] w-full px-6 text-sm shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] transition-shadow",
        "hover:shadow-[0_6px_10px_-2px_rgba(0,0,0,0.12),0_3px_6px_-2px_rgba(0,0,0,0.10)]",
        className
      )}
    >
      {loading ? "Carregando…" : "Simular dividendos"}
    </Button>
  );
}
