import { TextLink } from "@/components/ui/TextLink";
import { ROUTES } from "@/lib/seo/constants";

export function FiiInternalNav() {
  return (
    <nav aria-label="Links úteis" className="flex flex-col gap-3">
      <p className="text-[13px] font-medium text-[#808080]">Navegue também</p>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-4">
        <li>
          <TextLink href={ROUTES.simulador}>Simulador</TextLink>
        </li>
        <li>
          <TextLink href={ROUTES.fiis}>Todos os FIIs</TextLink>
        </li>
        <li>
          <TextLink href={ROUTES.setores}>Setores (ações)</TextLink>
        </li>
        <li>
          <TextLink href={ROUTES.artigos}>Artigos</TextLink>
        </li>
      </ul>
    </nav>
  );
}
