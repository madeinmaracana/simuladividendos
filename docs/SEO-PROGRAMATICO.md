# SEO programático em escala — SimulaDividendos

Este documento descreve a arquitetura para gerar **dezenas ou centenas de páginas** (tickers, setores, artigos) com **mínimo retrabalho**: dados centralizados, metadata e JSON-LD padronizados, breadcrumbs e blocos reutilizáveis.

## Visão geral do fluxo

1. **Dados** vivem em `data/stocks/` e `data/articles/` (registries).
2. **Rotas** (`app/acoes/[ticker]`, `app/setores/[slug]`, `app/artigos/[slug]`) leem esses dados via funções getter.
3. **SEO** (título, descrição, OG, Twitter, schemas) é montado por helpers em `lib/seo/`.
4. **UI repetida** (artigos relacionados, links internos, blocos editoriais de ticker) usa componentes em `components/seo/` e `components/templates/`.

---

## 1. Tickers (páginas `/acoes/[ticker]`)

### Onde editar

| Arquivo | Função |
|--------|--------|
| `data/stocks/tickers.registry.ts` | **Único lugar** para adicionar ou editar um ticker com conteúdo SEO. |
| `data/stocks/sectors.ts` | Setores: intro, FAQ do setor, nome exibido. |
| `data/stocks/types.ts` | Tipos `StockSeoRecord`, `StockSeoDefinition`, etc. |

### Adicionar um novo ticker (checklist)

1. Abra `data/stocks/tickers.registry.ts`.
2. Inclua um novo objeto em `TICKER_DEFINITIONS` com os campos obrigatórios (veja tipo `StockSeoDefinition` em `types.ts`).
3. Use `sectorSlug` que já exista em `SECTOR_SLUGS` / `SECTORS` em `sectors.ts`.
4. **Não precisa** definir `sectorLabel`: ele é preenchido automaticamente com o `name` do setor (a menos que você queira sobrescrever com `sectorLabel?: string`).

Após salvar:

- `generateStaticParams` em `app/acoes/[ticker]/page.tsx` usa `getAllMockTickers()` → a rota estática passa a existir no build.
- `app/sitemap.ts` já inclui todos os tickers do registry.
- **Pares do mesmo setor** e links para o setor vêm de `getPeerTickers` / `StockSeoEditorial`.
- **Artigos relacionados**: em `data/articles/registry.ts`, inclua o ticker em `relatedTickers` dos artigos pertinentes (ou crie artigo novo).

### Camada pública de dados

- Import recomendado: `@/data/stocks` ou `@/lib/stocks-data` (re-export).
- Funções úteis: `getStockSeo`, `getAllMockTickers`, `getTickerPath`, `getPeerTickers`, `getSectorNavItems`, etc. (ver `data/stocks/index.ts`).

---

## 2. Setores (páginas `/setores/[slug]`)

### Onde editar

- `data/stocks/sectors.ts`: objeto `SECTORS` e constante `SECTOR_SLUGS`.

### Adicionar um setor novo

1. Inclua o slug em `SECTOR_SLUGS` (em `types.ts` o tipo `SectorSlug` deriva dessa lista — ajuste **types** e **sectors** de forma coerente).
2. Adicione a entrada em `SECTORS[slug]` com `name`, `intro`, `dividendRelevance`, `faqs`.
3. Associe tickers do registry ao novo `sectorSlug`.

`getSectorNavItems()` (home, simulador) e o sitemap passam a refletir o novo setor automaticamente.

---

## 3. Artigos (páginas `/artigos/[slug]`)

### Onde editar

| Arquivo | Função |
|--------|--------|
| `data/articles/registry.ts` | Lista `ARTICLES`: um registro por artigo (conteúdo, FAQ, `relatedTickers`, `relatedSectors`). |
| `data/articles/types.ts` | Formato `ArticleRecord` / `ArticleSection`. |
| `data/articles/index.ts` | Getters: `getArticleBySlug`, `getAllArticleSlugs`, `getArticlesForTicker`, `getArticlesForSector`. |

### Adicionar um artigo

1. Acrescente um objeto em `ARTICLES` em `registry.ts`.
2. Preencha `slug`, `title`, `description`, `keywords`, `sections`, `faqs`, `relatedTickers`, `relatedSectors`.
3. O build gera a rota via `getAllArticleSlugs()` e o sitemap inclui o novo slug.

Metadata e JSON-LD de artigo usam `buildArticlePageMetadata` e `buildArticleSchemaFromPath` em `lib/seo/`.

---

## 4. Biblioteca `lib/seo/`

| Módulo | Conteúdo |
|--------|----------|
| `constants.ts` | `SITE_NAME`, `OG_LOCALE`, `ROUTES` (helpers de path). |
| `metadata.ts` | `buildPageMetadata`, `buildStockPageMetadata`, `buildSectorPageMetadata`, `buildArticlePageMetadata`. |
| `schema.ts` | `buildBreadcrumbListSchema`, `buildFaqPageSchema`, `buildArticleSchema`, `buildArticleSchemaFromPath`, `buildWebPageSchema`. |
| `breadcrumbs.ts` | `breadcrumbsTicker`, `breadcrumbsSector`, `breadcrumbsArticle`, tipo `BreadcrumbItem`. |
| `faq.ts` | `genericTickerFaq`, `buildTickerFaqItems` (FAQ genérico + FAQ do registry). |
| `index.ts` | Re-export de tudo acima. |

**Regra:** páginas novas do mesmo tipo devem reutilizar esses builders em `generateMetadata` e passar crumbs para `<Breadcrumbs items={...} />`.

---

## 5. Componentes padronizados

| Componente | Uso |
|------------|-----|
| `components/layout/Breadcrumbs.tsx` | Trilha visual + **BreadcrumbList** JSON-LD via `buildBreadcrumbListSchema`. |
| `components/seo/JsonLd.tsx` | Um ou mais `<script type="application/ld+json">` sem duplicar lógica. |
| `components/stocks/StockFAQ.tsx` | FAQ em `<details>` + **FAQPage** JSON-LD (`buildFaqPageSchema`). |
| `components/seo/RelatedArticlesSection.tsx` | Lista de artigos + CTA opcional para o simulador. |
| `components/seo/InternalLinksRow.tsx` | Linha de links internos (ex.: rodapé de navegação em página de setor). |
| `components/templates/StockSeoEditorial.tsx` | Blocos editoriais completos da página de ticker (hero, métricas, texto, pares). |

---

## 6. Convenções

- **URLs canônicas** e Open Graph usam `getSeoBaseUrl()` (`lib/site.ts`) alinhado ao `metadataBase` do layout.
- **Breadcrumbs**: itens com `href` entram no schema; o último item costuma ser só `label` (página atual).
- **Tickers sem registry**: a rota `/acoes/XYZ` ainda pode existir se você expandir `generateStaticParams` no futuro; hoje só tickers em `TICKER_DEFINITIONS` são pré-gerados. Para simular qualquer ticker na UI, a calculadora já aceita outros símbolos — mas SEO rico depende do objeto no registry.

---

## 7. Resumo: “só inserir dados”

| Meta | Ação |
|------|------|
| Nova página de ticker com SEO | Adicionar objeto em `data/stocks/tickers.registry.ts` + (opcional) vínculos em artigos. |
| Novo setor | Estender `SECTOR_SLUGS` + `SECTORS` + tickers com esse `sectorSlug`. |
| Novo artigo | Adicionar registro em `data/articles/registry.ts`. |
| Metadata / schema / crumbs | Evitar código novo na página: usar `lib/seo` e componentes listados acima. |

Para dúvidas de implementação, siga os exemplos em `app/acoes/[ticker]/page.tsx`, `app/setores/[slug]/page.tsx` e `app/artigos/[slug]/page.tsx`.
