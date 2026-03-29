import type { Metadata } from "next";
import Link from "next/link";
import { DividendCalculator } from "@/components/DividendCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { ArticleCard } from "@/components/articles/ArticleCard";
import type { FaqItem } from "@/lib/stocks-data";
import { getAllMockTickers, getSectorNavItems } from "@/lib/stocks-data";
import { ALL_ARTICLES, type ArticleRecord } from "@/data/articles";
import { getAllMockFiiTickers, getFiiPath } from "@/data/fiis";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { buildPageMetadata, buildWebPageSchema, SITE_NAME } from "@/lib/seo";

const HOME_TITLE = "Simulador de dividendos e renda passiva com ações na B3";
const HOME_DESCRIPTION =
  "Simule dividendos de ações na B3: escolha o ticker, informe cotas e veja último e próximo pagamento. Explore setores, tickers e artigos. Uso educacional.";

export const metadata: Metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  canonicalPath: "/",
  keywords: [
    "simulador de dividendos",
    "dividendos ações",
    "renda passiva",
    "calcular dividendos",
    "B3",
    "proventos",
    "ações",
    "FII",
    "fundos imobiliários",
  ],
});

const faq: FaqItem[] = [
  {
    question: "O que este simulador faz?",
    answer:
      "Multiplica o dividendo por ação (lista pública) pela quantidade de cotas que você informa. Serve para entender o histórico recente em valores, sem prever o futuro.",
  },
  {
    question: "Os valores são garantidos?",
    answer:
      "Não. Dividendos dependem da companhia e do calendário oficial. O site é educacional e não recomenda compra ou venda de ativos.",
  },
  {
    question: "De onde vêm os dados?",
    answer:
      "De uma fonte pública de cotações e proventos. Sempre confira RI e comunicados da empresa para decisões reais.",
  },
];

const sectionGap = "flex w-full min-w-0 flex-col gap-3 sm:gap-4";
const sectionTitle = cn(ui.sectionTitle, "text-base sm:text-xl");

/** Artigos em destaque na home (intenção de busca + FIIs). */
const HOME_ARTICLE_SLUGS: string[] = [
  "melhores-fiis-para-renda-mensal",
  "quanto-investir-para-viver-de-dividendos",
  "o-que-e-dividend-yield",
  "como-calcular-renda-passiva",
  "acoes-que-pagam-dividendos-todo-mes",
  "melhores-acoes-de-dividendos-brasil",
];

function homeFeaturedArticles(): ArticleRecord[] {
  return HOME_ARTICLE_SLUGS.map((slug) => ALL_ARTICLES.find((a) => a.slug === slug)).filter(
    (a): a is ArticleRecord => Boolean(a)
  );
}

export default function HomePage() {
  const popularTickers = getAllMockTickers().slice(0, 8);
  const popularFiis = getAllMockFiiTickers().filter((t) =>
    ["MXRF11", "HGLG11", "XPLG11", "KNRI11", "VGHF11"].includes(t)
  );
  const homeArticles = homeFeaturedArticles();

  return (
    <main className={cn(ui.stackPage, "gap-12 sm:gap-16 lg:gap-20")}>
      <JsonLd
        data={buildWebPageSchema({
          name: `${HOME_TITLE} | ${SITE_NAME}`,
          description: HOME_DESCRIPTION,
          path: "/",
        })}
      />

      <section aria-labelledby="heading-hero-sim" className="grid grid-cols-1 gap-9 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-5 lg:col-span-6 lg:pt-10">
          <p className={ui.eyebrow}>Simulador de dividendos</p>
          <h1
            id="heading-hero-sim"
            className={cn(ui.pageTitle, "max-w-[18ch] text-4xl leading-[1.06] sm:text-5xl sm:leading-[1.04]")}
          >
            Simule quanto você pode receber em dividendos
          </h1>
          <p className={cn(ui.body, "max-w-[56ch] text-base leading-relaxed text-[color:var(--text-muted)] sm:text-base")}>
            Compare ações, estime pagamentos e visualize a renda potencial da sua carteira em poucos segundos.
          </p>

          <div className="mt-1 flex flex-wrap gap-3">
            <Link
              href="#home-ticker-field"
              className={cn(
                "no-underline",
                ui.ctaSecondary,
                "bg-[var(--surface-muted)] px-6 text-[var(--text)] hover:bg-[var(--border)]"
              )}
            >
              Simular agora
            </Link>
            <Link href="/setores" className={cn(ui.ctaSecondary, "no-underline")}>
              Ver ações
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-1">
          <DividendCalculator
            initialTicker=""
            showTickerPicker
            defaultShares={100}
            simulatorFetchMode="manual"
            compactHero
          />
        </div>
      </section>

      <section aria-labelledby="heading-como" className={sectionGap}>
        <h2 id="heading-como" className={sectionTitle}>
          Como funciona
        </h2>
        <ol className="ml-5 max-w-xl list-decimal space-y-1.5 text-sm leading-snug text-neutral-600 dark:text-neutral-400">
          <li>Escolha o ticker (sugestões após duas letras).</li>
          <li>Informe a quantidade de ações e clique em Simular dividendos.</li>
          <li>Confira último e próximo pagamento logo abaixo.</li>
        </ol>
      </section>

      <p className="max-w-2xl text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">
        Ferramenta educacional. Para comparar contexto, abra{" "}
        <Link href="/setores" className={cn(ui.link, "text-xs")}>
          setores
        </Link>{" "}
        ou a{" "}
        <Link href="/simulador" className={cn(ui.link, "text-xs")}>
          página do simulador
        </Link>{" "}
        (carrega proventos automaticamente ao digitar o ticker).
      </p>

      <section aria-labelledby="heading-populares" className={sectionGap}>
        <h2 id="heading-populares" className={sectionTitle}>
          Ações populares
        </h2>
        <ul className="flex flex-wrap gap-2">
          {popularTickers.map((t) => (
            <li key={t}>
              <Link href={`/acoes/${encodeURIComponent(t)}`} className={cn(ui.pill, "no-underline")}>
                {t}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="heading-fiis-home" className={sectionGap}>
        <h2 id="heading-fiis-home" className={sectionTitle}>
          Simular FIIs
        </h2>
        <p className="max-w-xl text-sm leading-snug text-neutral-600 dark:text-neutral-400">
          Páginas dedicadas com renda mensal de referência e histórico de rendimentos.
        </p>
        <ul className="flex flex-wrap gap-2">
          {popularFiis.map((t) => (
            <li key={t}>
              <Link href={getFiiPath(t)} className={cn(ui.pill, "no-underline")}>
                {t}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/fiis" className={cn(ui.pillGhost, "no-underline")}>
              Ver todos os FIIs →
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="heading-setores" className={sectionGap}>
        <h2 id="heading-setores" className={sectionTitle}>
          Setores
        </h2>
        <ul className="flex flex-wrap gap-2">
          {getSectorNavItems().map(({ slug, label, href }) => (
            <li key={slug}>
              <Link href={href} className={cn(ui.pill, "no-underline")}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/setores" className={cn(ui.pillGhost, "no-underline")}>
              Todos
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="heading-artigos" className={sectionGap}>
        <h2 id="heading-artigos" className={sectionTitle}>
          Artigos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {homeArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Link href="/artigos" className={cn(ui.link, "text-sm")}>
          Ver todos →
        </Link>
      </section>

      <section aria-labelledby="heading-faq-home" className="pt-2">
        <StockFAQ title="Perguntas frequentes" items={faq} id="heading-faq-home" />
      </section>
    </main>
  );
}
