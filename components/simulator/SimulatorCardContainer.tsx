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
        "mx-auto w-full max-w-[var(--simulator-card-max)] rounded-[length:var(--radius-card)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-card sm:p-8 md:p-10",
        className
      )}
    >
      {children}
    </div>
  );
}
