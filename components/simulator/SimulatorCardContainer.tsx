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
        "mx-auto w-full max-w-[var(--simulator-card-max)] rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm sm:p-8 md:p-12",
        className
      )}
    >
      {children}
    </div>
  );
}
