/**
 * Design tokens — SimulaDividendos
 * Fonte: Figma "Simulador" (node 0-1)
 *
 * Este arquivo é a referência TypeScript dos tokens definidos em app/tokens.css.
 * Use as constantes abaixo para garantir consistência nos componentes:
 *
 *   className={`text-[${tokens.text.md}] font-[${tokens.font.semibold}]`}
 *
 * Para valores que já existem como variável CSS, prefira usar a var() nos
 * estilos inline ou as classes do `ui` (components/ui/classes.ts).
 */

// ---------------------------------------------------------------------------
// Tipografia
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Fontes
// ---------------------------------------------------------------------------

export const fontFamily = {
  sans:  "Inter",         // UI principal — carregada via next/font, var(--font-sans)
  serif: "Merriweather",  // Editorial / artigos — var(--font-serif)
  mono:  "Inter",         // Números tabulares — Inter com slashed-zero ("zero" 1), var(--font-mono)
} as const;

// ---------------------------------------------------------------------------
// Tipografia
// ---------------------------------------------------------------------------

/** Escala de tamanhos — alinhada com Text styles do Figma (px) */
export const fontSize = {
  "2xs": "0.75rem",  //  12px — rótulos, badges, notas legais
  sm:   "1rem",      //  16px — corpo padrão
  md:   "1.5rem",    //  24px — subtítulos, valores de destaque
  lg:   "2rem",      //  32px — títulos de seção
  xl:   "3.25rem",   //  52px — hero, H1 display
} as const;

export const fontWeight = {
  normal:   "400",
  medium:   "500",
  semibold: "600",
  bold:     "700",
} as const;

export const lineHeight = {
  display: "1.08",  // Títulos grandes (xl, lg)
  snug:    "1.3",   // Subtítulos (md)
  body:    "1.5",   // Corpo (sm, 2xs)
} as const;

// ---------------------------------------------------------------------------
// Espaçamento — Variable collection Figma: 4 · 8 · 16 · 24 · 40
// ---------------------------------------------------------------------------

/**
 * Escala de espaçamento em rem — cobre todos os valores em uso no codebase.
 * Âncoras Figma: 1 · 2 · 4 · 6 · 10 (4 · 8 · 16 · 24 · 40px).
 * Corresponde 1:1 aos utilitários Tailwind gap-N / p-N / m-N.
 */
export const space = {
  "0.5": "0.125rem",  //  2px
  1:     "0.25rem",   //  4px ★
  "1.5": "0.375rem",  //  6px
  2:     "0.5rem",    //  8px ★
  "2.5": "0.625rem",  // 10px
  3:     "0.75rem",   // 12px
  4:     "1rem",      // 16px ★
  5:     "1.25rem",   // 20px
  6:     "1.5rem",    // 24px ★
  8:     "2rem",      // 32px
  12:    "3rem",      // 48px
  20:    "5rem",      // 80px
} as const;

/** Aliases semânticos para gap/padding */
export const gap = {
  xs: space[1],    //  4px — ícone ↔ texto, entre badges
  sm: space[2],    //  8px — entre itens de lista
  md: space[4],    // 16px — entre componentes
  lg: space[6],    // 24px — entre seções internas
  xl: space[12],   // 48px — entre seções de página
} as const;

// ---------------------------------------------------------------------------
// Cores
// ---------------------------------------------------------------------------

export const color = {
  // Brand
  brand:            "#A6FF00",  // verde neon — CTA, logo, destaque
  brandHover:       "#8fe000",
  brandForeground:  "#0b0b0b",  // texto sobre fundo brand

  // Neutros (light)
  bg:            "#f3f2ef",
  surface:       "#ffffff",
  surfaceMuted:  "#f7f7f5",
  text:          "#111111",
  textMuted:     "#4b4b4b",
  textSoft:      "#7a7a7a",
  border:        "#e6e6e6",
  borderStrong:  "#d0d0d0",

  // Dark surfaces
  darkBg:      "#0b0b0b",
  darkSurface: "#161616",
  darkBorder:  "#2a2a2a",
  darkText:    "#ededed",
  darkMuted:   "#8a8a8a",

  // Semânticas
  success:     "#22c55e",
  successSoft: "#dcfce7",
  warning:     "#f59e0b",
  danger:      "#ef4444",
} as const;

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

export const radius = {
  xs:   "6px",      // badges, chips pequenos
  sm:   "10px",     // inputs, pills
  md:   "14px",     // botões, selects
  lg:   "18px",     // cards
  xl:   "24px",     // modais, drawers
  full: "9999px",   // pill completo
} as const;

// ---------------------------------------------------------------------------
// Sombras
// ---------------------------------------------------------------------------

export const shadow = {
  xs: "0 1px 2px rgba(0,0,0,0.04)",
  sm: "0 2px 8px rgba(0,0,0,0.06)",
  md: "0 6px 20px rgba(0,0,0,0.08)",
  lg: "0 12px 40px rgba(0,0,0,0.12)",
} as const;

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export const layout = {
  pageMax:    "80rem",   // 1280px
  gutterMobile:  "1rem",    // 16px
  gutterTablet:  "1.5rem",  // 24px
  gutterDesktop: "2.5rem",  // 40px
} as const;

// ---------------------------------------------------------------------------
// Export consolidado (para uso: import { tokens } from "@/lib/tokens")
// ---------------------------------------------------------------------------

export const tokens = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  gap,
  color,
  radius,
  shadow,
  layout,
} as const;

export type Tokens = typeof tokens;
