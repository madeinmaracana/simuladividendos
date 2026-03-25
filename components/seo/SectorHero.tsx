import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type SectorHeroProps = {
  name: string;
  intro: string;
};

export function SectorHero({ name, intro }: SectorHeroProps) {
  return (
    <header className={cn(ui.divider, "flex flex-col gap-3")}>
      <p className={ui.eyebrow}>Setor</p>
      <h1 className={cn("text-left", ui.pageTitle)}>Ações do setor de {name}</h1>
      <p className={cn(ui.body, "max-w-3xl text-left")}>{intro}</p>
    </header>
  );
}
