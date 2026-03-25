import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type StockPageHeadingProps = {
  ticker: string;
  companyName: string;
};

/** Título da página (um único h1) antes do bloco do simulador. */
export function StockPageHeading({ ticker, companyName }: StockPageHeadingProps) {
  return (
    <header className={cn(ui.divider, "flex flex-col gap-2")}>
      <p className={ui.eyebrow}>{ticker}</p>
      <h1 className={cn("text-left", ui.pageTitle)}>
        {ticker}: {companyName}
      </h1>
    </header>
  );
}
