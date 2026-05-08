/**
 * Icon — wrapper para Material Symbols Outlined (Google Icons).
 *
 * A fonte é carregada globalmente em app/layout.tsx.
 * Os nomes dos ícones seguem a nomenclatura do Google Fonts:
 *   https://fonts.google.com/icons
 *
 * Variantes de tamanho mapeadas na escala de espaçamento do Figma:
 *   xs → 16px | sm → 20px | md → 24px | lg → 32px | xl → 40px
 *
 * Uso:
 *   <Icon name="account_balance" />
 *   <Icon name="bolt" size="lg" className="text-[var(--brand)]" />
 *
 * Ajuste das axes da fonte variável:
 *   opsz  = optical size (igual ao tamanho em px para melhor legibilidade)
 *   wght  = 400 padrão
 *   FILL  = 0 (outlined) | 1 (filled)
 *   GRAD  = 0
 */

import { cn } from "@/lib/cn";

export type MaterialSymbol = string; // tipagem aberta — use o nome exato do Google Fonts

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

interface IconProps {
  /** Nome do ícone no Google Fonts Material Symbols (ex.: "account_balance") */
  name: MaterialSymbol;
  size?: IconSize;
  /** Preenchido (true) ou outlined (false, padrão) */
  filled?: boolean;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

const sizeClasses: Record<IconSize, string> = {
  xs: "text-base  leading-none", // 16px
  sm: "text-[20px] leading-none", // 20px
  md: "text-2xl   leading-none", // 24px
  lg: "text-[32px] leading-none", // 32px
  xl: "text-[40px] leading-none", // 40px
};

const fontVariationStyle: Record<IconSize, string> = {
  xs: "'opsz' 16, 'wght' 400, 'FILL' 0, 'GRAD' 0",
  sm: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0",
  md: "'opsz' 24, 'wght' 400, 'FILL' 0, 'GRAD' 0",
  lg: "'opsz' 32, 'wght' 400, 'FILL' 0, 'GRAD' 0",
  xl: "'opsz' 40, 'wght' 400, 'FILL' 0, 'GRAD' 0",
};

export function Icon({
  name,
  size = "md",
  filled = false,
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: IconProps) {
  const variationBase = fontVariationStyle[size];
  const variation = filled
    ? variationBase.replace("'FILL' 0", "'FILL' 1")
    : variationBase;

  return (
    <span
      className={cn("material-symbols-outlined select-none", sizeClasses[size], className)}
      style={{ fontVariationSettings: variation }}
      aria-hidden={ariaLabel ? undefined : ariaHidden}
      aria-label={ariaLabel}
    >
      {name}
    </span>
  );
}
