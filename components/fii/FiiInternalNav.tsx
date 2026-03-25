import { TextLink } from "@/components/ui/TextLink";
import { ROUTES } from "@/lib/seo/constants";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export function FiiInternalNav() {
  return (
    <nav aria-label="Links úteis" className={cn(ui.pageSection, "flex flex-col gap-3")}>
      <p className={ui.metricLabel}>Navegue também</p>
      <ul className={cn(ui.body, "flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-4")}>
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
