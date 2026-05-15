import Image from "next/image";
import type { ReactNode } from "react";
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
  /** Conteúdo logo abaixo do H1 (ex.: resumo para intenção de busca). */
  afterTitle?: ReactNode;
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
  afterTitle,
}: FiiHeroProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn(ui.eyebrow, "font-mono tracking-normal text-[#6B7280]")}>{symbol}</p>
          <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-medium text-[#6B7280]">
            Fundo imobiliário
          </span>
          {currentPrice != null ? (
            <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-2.5 py-0.5 text-xs font-semibold text-[#111827] shadow-[var(--shadow-sm)]">
              <span className="text-[#6B7280]">Preço</span>{" "}
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
        {afterTitle}
        <p className="text-left text-sm font-medium text-[#6B7280]">{fundName}</p>
        <p className={cn(ui.body, "text-pretty")}>{shortDescription}</p>
        {currentPrice != null && lastUpdated ? (
          <p className={cn(ui.bodyMuted, "font-mono tabular-nums")}>Atualizado: {new Date(lastUpdated).toLocaleString("pt-BR")}</p>
        ) : null}
      </div>
      {logoUrl ? (
        <div className="shrink-0 self-start rounded-[length:var(--radius-lg)] border border-[rgba(0,0,0,0.08)] bg-white p-3 shadow-[var(--shadow-sm)]">
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
