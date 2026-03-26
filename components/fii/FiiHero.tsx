import Image from "next/image";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export type FiiHeroProps = {
  symbol: string;
  fundName: string;
  shortDescription: string;
  logoUrl?: string | null;
  currentPrice?: number | null;
  currency?: string;
  lastUpdated?: string;
  title: string;
};

export function FiiHero({
  symbol,
  fundName,
  shortDescription,
  logoUrl,
  currentPrice,
  currency = "BRL",
  lastUpdated,
  title,
}: FiiHeroProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn(ui.eyebrow, "font-mono tracking-normal text-[color:var(--text-soft)]")}>{symbol}</p>
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--text-secondary)]">
            Fundo imobiliário
          </span>
          {currentPrice != null ? (
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-xs font-semibold text-[color:var(--text)] shadow-[var(--shadow-sm)]">
              <span className="text-[color:var(--text-soft)]">Preço</span>{" "}
              <span className="font-mono tabular-nums">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(currentPrice)}
              </span>
            </span>
          ) : null}
        </div>
        <h1 className={cn("text-left", ui.pageTitle)}>{title}</h1>
        <p className="text-left text-sm font-medium text-[color:var(--text-secondary)]">{fundName}</p>
        <p className={cn(ui.body, "text-pretty")}>{shortDescription}</p>
        {currentPrice != null && lastUpdated ? (
          <p className={cn(ui.bodyMuted, "font-mono tabular-nums")}>Atualizado: {new Date(lastUpdated).toLocaleString("pt-BR")}</p>
        ) : null}
      </div>
      {logoUrl ? (
        <div className="shrink-0 self-start rounded-[length:var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-sm)]">
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
