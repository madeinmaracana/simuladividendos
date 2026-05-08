# Design Tokens — SimulaDividendos

Fonte: Figma **"Simulador"** (`node-id=0-1`)  
Gerado em: 2026-05-08

---

## Onde ficam

| Arquivo | Papel |
|---|---|
| `app/tokens.css` | Variáveis CSS (`:root`) — consumidas por Tailwind e estilos inline |
| `lib/tokens.ts` | Referência TypeScript — use para evitar strings mágicas em componentes |
| `app/globals.css` | Estilos base + classes utilitárias (`ds-text-*`, `ds-surface-*`) |
| `components/ui/classes.ts` | Receitas de classe Tailwind (ex.: `ui.pill`, `ui.card`) |

---

## Tipografia

> Text styles do Figma: todos com line-height **Auto**

| Token CSS | Token TS | px | Uso |
|---|---|---|---|
| `--text-2xs` | `fontSize["2xs"]` | 12 | rótulos, badges, notas legais |
| `--text-sm` | `fontSize.sm` | 16 | corpo padrão |
| `--text-md` | `fontSize.md` | 24 | subtítulos, valores de destaque |
| `--text-lg` | `fontSize.lg` | 32 | títulos de seção (H2) |
| `--text-xl` | `fontSize.xl` | 52 | hero / H1 display |

**Pesos:** `400 · 500 · 600 · 700` → `--font-normal/medium/semibold/bold`

---

## Espaçamento

> Variable collection Figma: valores exatos `4 · 8 · 16 · 24 · 40`

| Token CSS | Token TS (`space`) | px | Alias semântico |
|---|---|---|---|
| `--space-1` | `space[1]` | 4 | `gap.xs` — ícone ↔ texto |
| `--space-2` | `space[2]` | 8 | `gap.sm` — entre itens |
| `--space-4` | `space[4]` | 16 | `gap.md` — entre componentes |
| `--space-6` | `space[6]` | 24 | `gap.lg` — entre seções internas |
| `--space-10` | `space[10]` | 40 | `gap.xl` — entre seções de página |

---

## Cores

### Brand
| Token | Valor | Uso |
|---|---|---|
| `--brand` | `#A6FF00` | Verde neon — CTA, logo, destaque |
| `--brand-hover` | `#8fe000` | Estado hover do brand |
| `--brand-foreground` | `#0b0b0b` | Texto sobre fundo brand |

> Hex confirmado pelo usuário em 2026-05-08.

### Neutros (light mode)
| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#f3f2ef` | Fundo de página |
| `--color-surface` | `#ffffff` | Cards, inputs |
| `--color-surface-muted` | `#f7f7f5` | Superfícies secundárias |
| `--color-text` | `#111111` | Texto primário |
| `--color-text-muted` | `#4b4b4b` | Texto secundário |
| `--color-text-soft` | `#7a7a7a` | Placeholders, labels suaves |
| `--color-border` | `#e6e6e6` | Divisores, bordas |
| `--color-border-strong` | `#d0d0d0` | Bordas em hover/focus |

### Dark surfaces (card simulador, header, footer)
| Token | Valor |
|---|---|
| `--color-dark-bg` | `#0b0b0b` |
| `--color-dark-surface` | `#161616` |
| `--color-dark-border` | `#2a2a2a` |
| `--color-dark-text` | `#ededed` |
| `--color-dark-muted` | `#8a8a8a` |

---

## Border Radius

| Token | px | Uso |
|---|---|---|
| `--radius-xs` | 6 | badges, chips pequenos |
| `--radius-sm` | 10 | inputs, pills |
| `--radius-md` | 14 | botões, selects |
| `--radius-lg` | 18 | cards |
| `--radius-xl` | 24 | modais, drawers |
| `--radius-full` | 9999 | pill completo |

---

## Sombras

| Token | Uso |
|---|---|
| `--shadow-xs` | Sutil, ícones |
| `--shadow-sm` | Pills, inputs |
| `--shadow-md` | Cards (padrão) |
| `--shadow-lg` | Dropdowns, overlays |

---

## Como usar

### CSS / Tailwind inline
```tsx
// Cor brand
<button className="bg-[var(--brand)] text-[var(--brand-foreground)]">

// Tipografia
<h1 className="text-[length:var(--text-xl)] leading-[var(--leading-display)]">

// Espaçamento
<section className="gap-[var(--gap-xl)]">
```

### TypeScript (lib/tokens.ts)
```tsx
import { tokens } from "@/lib/tokens";

// Verificação de tipo + autocomplete
const green = tokens.color.brand;           // "#CAFF00"
const titleSize = tokens.fontSize.xl;       // "3.25rem"
const sectionGap = tokens.gap.xl;          // "2.5rem"
```

### Classes utilitárias (globals.css)
```tsx
<h1 className="ds-text-xl">Hero title</h1>
<div className="ds-surface-dark">Card simulador</div>
<div className="ds-surface-brand">CTA verde</div>
```

---

## Regras de retrocompatibilidade

Os aliases antigos (`--bg`, `--text`, `--border`, etc.) continuam funcionando e apontam para os novos tokens via `var()`. A migração pode ser feita gradualmente: novos componentes usam `--color-*`, existentes mantêm os aliases até refatoração.
