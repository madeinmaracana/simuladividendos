import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TickerPill } from "@/components/ui/TickerPill";
import { Icon } from "@/components/ui/Icon";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { HomeHeroSimulator } from "@/components/home/HomeHeroSimulator";
import { getAllMockTickers, getSectorNavItems } from "@/lib/stocks-data";
import { ALL_ARTICLES, type ArticleRecord } from "@/data/articles";
import { getAllMockFiiTickers, getFiiPath } from "@/data/fiis";
import { getTickerPath } from "@/data/stocks";
import { buildPageMetadata, buildWebPageSchema, SITE_NAME } from "@/lib/seo";

const HOME_TITLE = "Simulador de dividendos e renda passiva com ações na B3";
const HOME_DESCRIPTION =
  "Simule dividendos de ações na B3: escolha o ticker, informe cotas e veja último e próximo pagamento. Explore setores, tickers e artigos. Uso educacional.";

export const metadata: Metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  canonicalPath: "/",
  keywords: ["simulador de dividendos", "dividendos ações", "renda passiva", "calcular dividendos", "B3", "proventos", "ações", "FII"],
});

const HOME_ARTICLE_SLUGS = [
  "melhores-fiis-para-renda-mensal",
  "quanto-investir-para-viver-de-dividendos",
  "o-que-e-dividend-yield",
  "como-calcular-renda-passiva",
  "acoes-que-pagam-dividendos-todo-mes",
  "melhores-acoes-de-dividendos-brasil",
];

const FAQ_ITEMS = [
  { question: "O que este simulador faz?", answer: "Multiplica o dividendo por ação pela quantidade de cotas que você informa. Serve para entender o histórico recente em valores, sem prever o futuro." },
  { question: "Os valores são garantidos?", answer: "Não. Dividendos dependem da companhia e do calendário oficial. O site é educacional e não recomenda compra ou venda de ativos." },
  { question: "De onde vêm os dados?", answer: "De uma fonte pública de cotações e proventos. Sempre confira RI e comunicados da empresa para decisões reais." },
];


export default function HomePage() {
  const popularTickers = getAllMockTickers().slice(0, 8);
  const popularFiis = getAllMockFiiTickers().filter((t) =>
    ["MXRF11", "HGLG11", "XPLG11", "KNRI11", "VGHF11"].includes(t)
  );
  const homeArticles = HOME_ARTICLE_SLUGS
    .map((slug) => ALL_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is ArticleRecord => Boolean(a));

  return (
    <main className="flex w-full flex-col items-center">
      <JsonLd data={buildWebPageSchema({ name: `${HOME_TITLE} | ${SITE_NAME}`, description: HOME_DESCRIPTION, path: "/" })} />

      {/* Max-width container for all content */}
      <div className="flex w-full max-w-[840px] flex-col gap-20 pb-20">

        {/* ── Hero ── */}
        <section className="flex flex-col items-center gap-6 pt-12 text-center">
          <h1 className="max-w-[18ch] text-xl font-semibold leading-tight tracking-tight text-[var(--color-text)]">
            Simule quanto você pode receber em dividendos
          </h1>
          <p className="max-w-[52ch] text-base text-[var(--color-text-muted)]">
            Compare ações, estime pagamentos e visualize a renda potencial da sua carteira em poucos segundos.
          </p>
        </section>

        {/* ── Split Simulator Card ── */}
        <section className="-mt-12">
          <HomeHeroSimulator />
          <div className="mt-6 flex flex-col gap-2 text-xs text-[var(--color-text-soft)]">
            <p>⚠ Não é recomendação de investimento. Fonte pública de proventos.</p>
            <p className="font-medium">Como funciona</p>
            <ol className="ml-4 list-decimal space-y-1">
              <li>Escolha o ticker (sugestões após duas letras).</li>
              <li>Informe a quantidade de ações e clique em Simular dividendos.</li>
              <li>Confira último e próximo pagamento logo abaixo.</li>
            </ol>
          </div>
        </section>

        {/* ── Ações populares ── */}
        <SectionBlock
          title="Ações populares"
          subtitle="Explore os principais pagadores de dividendos da B3"
          viewAllHref="/setores"
        >
          <ul className="flex flex-wrap gap-2">
            {popularTickers.map((t) => (
              <li key={t}><TickerPill ticker={t} href={getTickerPath(t)} /></li>
            ))}
          </ul>
        </SectionBlock>

        {/* ── FIIs ── */}
        <SectionBlock
          title="FIIs"
          subtitle="Principais fundos imobiliários para renda mensal"
          viewAllHref="/fiis"
        >
          <ul className="flex flex-wrap gap-2">
            {popularFiis.map((t) => (
              <li key={t}><TickerPill ticker={t} href={getFiiPath(t)} /></li>
            ))}
          </ul>
        </SectionBlock>

        {/* ── Setores ── */}
        <SectionBlock
          title="Setores"
          subtitle="Descubra ações por setor da economia"
          viewAllHref="/setores"
        >
          <ul className="flex gap-3">
            {getSectorNavItems().slice(0, 5).map(({ slug, label, href, icon }) => (
              <li key={slug} className="flex-1">
                <Link
                  href={href}
                  className="flex h-[140px] flex-col justify-between rounded-2xl bg-[var(--color-surface)] p-4 no-underline transition hover:shadow-md"
                >
                  <Icon name={icon} size="md" className="text-[var(--color-text)]" />
                  <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </SectionBlock>

        {/* ── Ad slot (aguardando integração AdSense) ── */}

        {/* ── Artigos ── */}
        <SectionBlock
          title="Artigos"
          subtitle="Aprenda sobre dividendos e renda passiva"
          viewAllHref="/artigos"
        >
          <div className="grid grid-cols-3 gap-3">
            {homeArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </SectionBlock>

        {/* ── Ad slot (aguardando integração AdSense) ── */}

        {/* ── FAQ ── */}
        <SectionBlock
          title="Perguntas frequentes"
          subtitle="Tire suas dúvidas sobre o simulador"
          viewAllHref="/artigos"
          viewAllLabel="Ver todos →"
        >
          <ul className="flex flex-col gap-2">
            {FAQ_ITEMS.map((item) => (
              <li key={item.question}>
                <details className="group rounded-2xl bg-[var(--color-surface)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 marker:content-none [&::-webkit-details-marker]:hidden">
                    <p className="text-sm font-medium text-[var(--color-text)]">{item.question}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 group-open:rotate-180"
                    >
                      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {item.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </SectionBlock>

      </div>
    </main>
  );
}
