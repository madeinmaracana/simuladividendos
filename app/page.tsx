import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TickerPill } from "@/components/ui/TickerPill";
import { Icon } from "@/components/ui/Icon";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { HomeHeroSimulator } from "@/components/home/HomeHeroSimulator";
import { ScrollToTopCTA } from "@/components/home/ScrollToTopCTA";
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
  {
    question: "O que este simulador faz?",
    answer:
      "Multiplica o dividendo por ação pela quantidade de cotas que você informa. Serve para entender o histórico recente em valores, sem prever o futuro.",
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

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Escolha o ativo",
    description: "Digite o ticker da ação ou FII — sugestões aparecem automaticamente.",
  },
  {
    step: "02",
    title: "Informe suas cotas",
    description: "Coloque quantas ações você possui ou deseja simular.",
  },
  {
    step: "03",
    title: "Veja o resultado",
    description: "Último dividendo pago e próximo pagamento estimado, em reais.",
  },
];

export default function HomePage() {
  const popularTickers = getAllMockTickers().slice(0, 8);
  const popularFiis = getAllMockFiiTickers().filter((t) =>
    ["MXRF11", "HGLG11", "XPLG11", "KNRI11", "VGHF11"].includes(t)
  );
  const homeArticles = HOME_ARTICLE_SLUGS.map((slug) =>
    ALL_ARTICLES.find((a) => a.slug === slug)
  ).filter((a): a is ArticleRecord => Boolean(a));

  return (
    <main className="flex w-full flex-col">
      <JsonLd
        data={buildWebPageSchema({
          name: `${HOME_TITLE} | ${SITE_NAME}`,
          description: HOME_DESCRIPTION,
          path: "/",
        })}
      />

      {/* ══════════════════════════════════════════════════════════════
          HERO — título centralizado + simulador abaixo em largura total
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full border-b border-[var(--color-border)]">
        <div className="mx-auto flex max-w-[var(--page-max)] flex-col items-center gap-10 px-[var(--page-gutter)] py-14 text-center lg:py-20">

          {/* Copy — centralizado */}
          <div className="flex flex-col items-center gap-5 max-w-[54ch]">
            <h1 className="ds-display-sm font-bold tracking-tight text-[var(--color-text)] sm:ds-display-md">
              Simule quanto você pode receber em dividendos
            </h1>
            <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
              Escolha o ticker, informe suas cotas e veja o último e próximo pagamento de dividendos em segundos.
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-sm text-[var(--color-text-soft)]">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                Dados em tempo real
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                Ações e FIIs da B3
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                Gratuito
              </li>
            </ul>
          </div>

          {/* Simulator — largura generosa, centralizado */}
          <div className="w-full max-w-[var(--simulator-card-max)] text-left">
            <HomeHeroSimulator />
            <p className="mt-3 text-xs text-[var(--color-text-soft)]">
              ⚠ Não é recomendação de investimento. Fonte pública de proventos B3.
            </p>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTEÚDO — max-width da página, espaçamento generoso
      ══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-20 px-[var(--page-gutter)] py-20">

        {/* ── Como funciona ── */}
        <section id="como-funciona" className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="ds-display-xs font-bold tracking-tight text-[var(--color-text)]">
              Como funciona
            </h2>
            <p className="text-base text-[var(--color-text-muted)]">
              Três passos para descobrir sua renda de dividendos.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <li
                key={step}
                className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]"
              >
                <span className="font-mono text-xs font-semibold text-[var(--brand)]">{step}</span>
                <p className="font-semibold text-[var(--color-text)]">{title}</p>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Ações populares ── */}
        <SectionBlock
          title="Ações populares"
          subtitle="Explore os principais pagadores de dividendos da B3"
          viewAllHref="/setores"
        >
          <ul className="flex flex-wrap gap-2">
            {popularTickers.map((t) => (
              <li key={t}>
                <TickerPill ticker={t} href={getTickerPath(t)} />
              </li>
            ))}
          </ul>
        </SectionBlock>

        {/* ── FIIs ── */}
        <SectionBlock
          title="Fundos Imobiliários"
          subtitle="Principais FIIs para renda mensal"
          viewAllHref="/fiis"
        >
          <ul className="flex flex-wrap gap-2">
            {popularFiis.map((t) => (
              <li key={t}>
                <TickerPill ticker={t} href={getFiiPath(t)} />
              </li>
            ))}
          </ul>
        </SectionBlock>

        {/* ── Setores ── */}
        <SectionBlock
          title="Setores"
          subtitle="Descubra ações por setor da economia"
          viewAllHref="/setores"
        >
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex">
            {getSectorNavItems()
              .slice(0, 5)
              .map(({ slug, label, href, icon }) => (
                <li key={slug} className="flex-1 min-w-0">
                  <Link
                    href={href}
                    className="flex h-[130px] flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 no-underline shadow-[var(--shadow-sm)] transition hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-md)]"
                  >
                    <Icon name={icon} size="md" className="text-[var(--color-text-muted)]" />
                    <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </SectionBlock>

        {/* ── Artigos ── */}
        <SectionBlock
          title="Artigos"
          subtitle="Aprenda sobre dividendos e renda passiva"
          viewAllHref="/artigos"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {homeArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </SectionBlock>

        {/* ── FAQ ── */}
        <SectionBlock
          title="Perguntas frequentes"
          subtitle="Tire suas dúvidas sobre o simulador"
          viewAllHref="/artigos"
          viewAllLabel="Ver artigos →"
        >
          <ul className="flex flex-col gap-2">
            {FAQ_ITEMS.map((item) => (
              <li key={item.question}>
                <details className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 marker:content-none [&::-webkit-details-marker]:hidden">
                    <p className="text-sm font-semibold text-[var(--color-text)]">{item.question}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-[var(--color-text-soft)] transition-transform duration-200 group-open:rotate-180"
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

        {/* ── Dark CTA ── */}
        <section className="overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--color-dark-bg)] px-8 py-12 text-center sm:px-16">
          <div className="mx-auto flex max-w-[42ch] flex-col items-center gap-6">
            <h2 className="ds-display-xs font-bold tracking-tight text-[var(--color-dark-text)] sm:ds-display-sm">
              Descubra o potencial da sua carteira
            </h2>
            <p className="text-base text-[var(--color-dark-muted)]">
              Simule dividendos de qualquer ação ou FII da B3 em segundos. Gratuito e sem cadastro.
            </p>
            <ScrollToTopCTA />
          </div>
        </section>

      </div>
    </main>
  );
}
