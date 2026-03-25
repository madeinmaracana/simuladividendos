import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type PageContentProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Coluna única com ritmo vertical (`stackPage`). Limite e padding vêm de `ui.pageShell` no layout.
 * Página de ticker usa `TickerPageLayout` + `TickerPageRow` (grade 12 col) em vez deste wrapper.
 */
export function PageContent({ children, className }: PageContentProps) {
  return <div className={cn(ui.stackPage, className)}>{children}</div>;
}
