# Como importar os tokens no Figma

## Plugin necessário
**Tokens Studio for Figma** — gratuito  
→ https://www.figma.com/community/plugin/843461159747178978

---

## Passo a passo

### 1. Abrir o plugin
No Figma: **Plugins → Tokens Studio for Figma**

### 2. Importar o arquivo
- Na aba **Tokens**, clique no ícone de **Import** (ou use o menu ☰ → Import)
- Selecione o arquivo `design/figma-tokens.json`
- Confirme o import

### 3. Ativar os token sets
Depois de importar, você verá 8 conjuntos na sidebar do plugin.  
Ative os seguintes para o tema **Light**:

| Set | Ativar? |
|---|---|
| `primitives` | ✅ sempre |
| `brand` | ✅ sempre |
| `light` | ✅ para light mode |
| `dark` | ❌ desativar |
| `typography` | ✅ sempre |
| `spacing` | ✅ sempre |
| `radii` | ✅ sempre |
| `effects` | ✅ sempre |
| `layout` | ✅ sempre |

Para criar um tema **Dark**: ative `dark` no lugar de `light`.

### 4. Aplicar ao Figma Variables
- No menu do plugin: **Sync variables** (ou **Tools → Create Figma Variables**)
- Os tokens viram **Figma Variables** nativas com suporte a light/dark modes

---

## Fonte Satoshi
Os tokens referenciam `Satoshi` como fonte principal.  
Baixe grátis em: https://www.fontshare.com/fonts/satoshi  
Instale no sistema antes de abrir o Figma.

---

## Estrutura dos token sets

```
primitives/   → cores brutas (#050505, #DFFF72 etc.)
brand/        → cor da marca e variantes hover/foreground
light/        → semântica de cor para light mode
dark/         → semântica de cor para dark mode (override do light)
typography/   → fontes, tamanhos, pesos, line-heights, estilos compostos
spacing/      → escala de espaçamento (4px → 96px)
radii/        → border radius (6px → 9999px)
effects/      → box-shadows xs / sm / md / lg
layout/       → larguras de página, gutters, dimensões do simulador
```

---

## Breakpoints para os frames

| Nome | Largura | Uso |
|---|---|---|
| Mobile | `390` | iPhone 14 Pro — referência principal |
| Desktop | `1280` | Alinhado com `page-max` do design system |

Os 6 templates × 2 breakpoints = **12 frames** no Figma.

---

## Templates a criar

| # | Frame | Rota |
|---|---|---|
| 1 | Home | `/` |
| 2 | Ticker / FII Detail | `/acoes/[slug]` · `/fiis/[slug]` |
| 3 | Index / Listagem | `/artigos` · `/fiis` · `/setores` |
| 4 | Article Detail | `/artigos/[slug]` |
| 5 | Comparar Form | `/comparar` |
| 6 | Comparar Result | `/comparar/[slug]` |
