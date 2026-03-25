import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { getSectorPath } from "@/lib/stocks-data";

type StockHeroProps = {
  ticker: string;
  companyName: string;
  shortDescription: string;
  sectorLabel: string;
  sectorSlug: string;
  /** Quando true, o título vira h2 e o texto vem após o simulador (evita dois h1). */
  afterCalculator?: boolean;
};

export function StockHero({
  ticker,
  companyName,
  shortDescription,
  sectorLabel,
  sectorSlug,
  afterCalculator = false,
}: StockHeroProps) {
  if (afterCalculator) {
    return (
      <section aria-labelledby={`heading-sobre-${ticker}`}>
        <Card>
          <h2 id={`heading-sobre-${ticker}`} className={cn("text-left", ui.sectionTitle)}>
            Sobre {ticker}: {companyName}
          </h2>
          <p className={cn(ui.body, "mt-3 max-w-3xl")}>{shortDescription}</p>
          <p className={cn(ui.body, "mt-4")}>
            Setor:{" "}
            <TextLink href={getSectorPath(sectorSlug)} className="text-sm">
              {sectorLabel}
            </TextLink>
          </p>
        </Card>
      </section>
    );
  }

  return (
    <header className={cn(ui.divider, "flex flex-col gap-3")}>
      <p className={ui.eyebrow}>{ticker}</p>
      <h1 className={cn("text-left", ui.pageTitle)}>
        {ticker}: {companyName}
      </h1>
      <p className={cn(ui.body, "max-w-3xl")}>{shortDescription}</p>
      <p className={ui.body}>
        Setor:{" "}
        <TextLink href={getSectorPath(sectorSlug)} className="text-sm">
          {sectorLabel}
        </TextLink>
      </p>
    </header>
  );
}
