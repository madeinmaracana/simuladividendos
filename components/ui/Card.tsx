import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ui } from "./classes";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** padding interno padrão */
  padded?: boolean;
};

export function Card({ children, className, padded = true }: CardProps) {
  return (
    <div className={cn(ui.card, padded && "p-5 sm:p-6", className)}>{children}</div>
  );
}
