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
        "w-full rounded-xl bg-teal-600 px-6 py-4 text-base font-semibold text-white shadow-md transition-shadow",
        "hover:bg-teal-500 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
        "disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-teal-500",
        className
      )}
    >
      {loading ? "Carregando…" : "Simular dividendos"}
    </Button>
  );
}
