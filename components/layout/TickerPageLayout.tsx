import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type TickerPageLayoutProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Grade única da página de ticker (mobile: 1 coluna; desktop: 12 colunas, gutter `lg:gap-x-6`).
 * Cada bloco principal deve usar `TickerPageRow` para ocupar `col-span-full` e alinhar bordas.
 */
export function TickerPageLayout({ children, className }: TickerPageLayoutProps) {
  return <div className={cn(ui.tickerPageGrid, className)}>{children}</div>;
}

type TickerPageRowProps = {
  children: ReactNode;
  className?: string;
};

export function TickerPageRow({ children, className }: TickerPageRowProps) {
  return <div className={cn(ui.tickerPageRow, className)}>{children}</div>;
}
