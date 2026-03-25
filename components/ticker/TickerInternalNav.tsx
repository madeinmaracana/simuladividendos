import { TextLink } from "@/components/ui/TextLink";
import { ROUTES } from "@/lib/seo/constants";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type TickerInternalNavProps = {
  sectorHref: string;
  sectorLabel: string;
};

export function TickerInternalNav({ sectorHref, sectorLabel }: TickerInternalNavProps) {
  return (
    <nav aria-label="Links úteis" className={cn(ui.pageSection, "flex flex-col gap-3")}>
      <p className={ui.metricLabel}>Navegue também</p>
      <ul className={cn(ui.body, "flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-4")}>
        <li>
          <TextLink href={ROUTES.simulador}>Simulador geral</TextLink>
        </li>
        <li>
          <TextLink href={ROUTES.setores}>Todos os setores</TextLink>
        </li>
        <li>
          <TextLink href={sectorHref}>Setor: {sectorLabel}</TextLink>
        </li>
        <li>
          <TextLink href={ROUTES.artigos}>Artigos educativos</TextLink>
        </li>
      </ul>
    </nav>
  );
}
