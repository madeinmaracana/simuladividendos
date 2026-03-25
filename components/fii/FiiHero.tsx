import Image from "next/image";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export type FiiHeroProps = {
  symbol: string;
  fundName: string;
  shortDescription: string;
  logoUrl?: string | null;
  title: string;
};

export function FiiHero({ symbol, fundName, shortDescription, logoUrl, title }: FiiHeroProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className={ui.eyebrow}>{symbol}</p>
          <span className="rounded-full border border-[var(--border)] bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-900/60 dark:text-neutral-300">
            Fundo imobiliário
          </span>
        </div>
        <h1 className={cn("text-left", ui.pageTitle)}>{title}</h1>
        <p className="text-left text-sm font-medium text-neutral-700 dark:text-neutral-300">{fundName}</p>
        <p className={cn(ui.body, "text-pretty")}>{shortDescription}</p>
      </div>
      {logoUrl ? (
        <div className="shrink-0 self-start rounded-2xl border border-[var(--border)] bg-white p-3 dark:bg-neutral-900">
          <Image
            src={logoUrl}
            alt=""
            width={72}
            height={72}
            unoptimized
            className="h-[72px] w-[72px] object-contain"
          />
        </div>
      ) : null}
    </header>
  );
}
