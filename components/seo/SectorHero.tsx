type SectorHeroProps = {
  name: string;
  intro: string;
};

export function SectorHero({ name, intro }: SectorHeroProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-neutral-200 pb-8 dark:border-neutral-800">
      <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
        Setor
      </p>
      <h1 className="text-left text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
        Ações do setor de {name}
      </h1>
      <p className="max-w-3xl text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {intro}
      </p>
    </header>
  );
}
