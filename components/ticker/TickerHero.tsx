import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export type TickerHeroProps = {
  symbol: string;
  companyName: string;
  sectorLabel: string;
  shortDescription: string;
  logoUrl?: string | null;
  currentPrice?: number | null;
  currency?: string;
  lastUpdated?: string;
  /** Ex.: "Dividendos de TAEE11" */
  title: string;
  /** Conteúdo logo abaixo do H1 (ex.: resumo para intenção de busca). */
  afterTitle?: ReactNode;
  /**
   * `split`: coluna esquerda ao lado do simulador (sem divisor inferior; logo alinhado ao topo).
   * `default`: layout completo da página de ticker isolada.
   */
  variant?: "default" | "split";
};

export function TickerHero({
  symbol,
  companyName,
  sectorLabel,
  shortDescription,
  logoUrl,
  currentPrice,
  currency = "BRL",
  lastUpdated,
  title,
  afterTitle,
  variant = "default",
}: TickerHeroProps) {
  const isSplit = variant === "split";

  return (
    <header
      className={cn(
        !isSplit && ui.divider,
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn(ui.eyebrow, "font-mono tracking-normal text-[#6B7280]")}>{symbol}</p>
          <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-medium text-[#6B7280]">
            {sectorLabel}
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
        <p className="text-left text-sm font-medium text-[#6B7280]">{companyName}</p>
        <p className={cn(ui.body, "text-pretty")}>{shortDescription}</p>
        {currentPrice != null && lastUpdated ? (
          <p className={cn(ui.bodyMuted, "font-mono tabular-nums")}>Atualizado: {new Date(lastUpdated).toLocaleString("pt-BR")}</p>
        ) : null}
      </div>
      {logoUrl ? (
        <div className="shrink-0 self-start rounded-[length:var(--radius-lg)] border border-[rgba(0,0,0,0.08)] bg-white p-3 shadow-[var(--shadow-sm)]">
          <Image
            src={logoUrl}
            alt={`Logo ${symbol}`}
            width={72}
            height={72}
            unoptimized
            className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]"
          />
        </div>
      ) : null}
    </header>
  );
}
