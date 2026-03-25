import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SimulatorCardContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Container principal do simulador: largura confortável, fundo claro, sombra leve.
 */
export function SimulatorCardContainer({ children, className }: SimulatorCardContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--simulator-card-max)] rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_24px_-4px_rgb(15_23_42/0.08),0_2px_8px_rgb(15_23_42/0.04)] sm:p-8 md:p-10",
        "dark:border-neutral-800 dark:bg-[var(--card)] dark:shadow-[0_4px_24px_-4px_rgb(0_0_0/0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}
