import type { Metadata } from "next";
import Link from "next/link";
import { DividendCalculator } from "@/components/DividendCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { ArticleCard } from "@/components/articles/ArticleCard";
import type { FaqItem } from "@/lib/stocks-data";
import { getAllMockTickers, getSectorNavItems } from "@/lib/stocks-data";
import { ALL_ARTICLES } from "@/data/articles";
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
const sectionTitle = cn(ui.sectionTitle, "text-base sm:text-lg");

export default function HomePage() {
  const popularTickers = getAllMockTickers().slice(0, 8);

  return (
    <main className={cn(ui.stackPage, "gap-12 sm:gap-16 lg:gap-20")}>
      <JsonLd
        data={buildWebPageSchema({
          name: `${HOME_TITLE} | ${SITE_NAME}`,
          description: HOME_DESCRIPTION,
          path: "/",
        })}
      />

      <section aria-labelledby="heading-hero-sim" className="flex flex-col gap-6 sm:gap-8">
        <div className="flex max-w-3xl flex-col gap-3 sm:gap-4">
          <p className={ui.eyebrow}>Simula Dividendos</p>
          <h1 id="heading-hero-sim" className={cn(ui.pageTitle, "text-3xl sm:text-4xl")}>
            Simule dividendos de ações da B3
          </h1>
          <p className="max-w-xl text-base leading-snug text-neutral-600 dark:text-neutral-400">
            Escolha uma ação, informe quantas cotas você tem e veja o último e o próximo pagamento — uso educacional,
            dados públicos.
          </p>
        </div>

        <DividendCalculator
          showTickerPicker
          defaultShares={100}
          simulatorFetchMode="manual"
          compactHero
        />
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
          {ALL_ARTICLES.slice(0, 4).map((article) => (
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
