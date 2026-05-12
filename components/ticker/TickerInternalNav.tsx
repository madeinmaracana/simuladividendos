import { TextLink } from "@/components/ui/TextLink";
import { ROUTES } from "@/lib/seo/constants";

type TickerInternalNavProps = {
  sectorHref: string;
  sectorLabel: string;
};

export function TickerInternalNav({ sectorHref, sectorLabel }: TickerInternalNavProps) {
  return (
    <nav aria-label="Links úteis" className="flex flex-col gap-3">
      <p className="text-[13px] font-medium text-[#808080]">Navegue também</p>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-4">
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
