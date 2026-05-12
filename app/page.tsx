import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TickerCard } from "@/components/ui/TickerCard";
import { Icon } from "@/components/ui/Icon";
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
];

const FAQ_ITEMS = [
  {
    question: "O que este simulador faz?",
    answer: "Multiplica o dividendo por ação pela quantidade de cotas que você informa. Serve para entender o histórico recente em valores, sem prever o futuro.",
  },
  {
    question: "Os valores são garantidos?",
    answer: "Não. Dividendos dependem da companhia e do calendário oficial. O site é educacional e não recomenda compra ou venda de ativos.",
  },
  {
    question: "De onde vêm os dados?",
    answer: "De uma fonte pública de cotações e proventos. Sempre confira RI e comunicados da empresa para decisões reais.",
  },
];

/** Cor de fundo por setor — hex sólido, seguindo paleta do Figma */
const SECTOR_COLORS: Record<string, string> = {
  bancos:              "#4CAF50",
  consumo:             "#2196F3",
  energia:             "#FF9800",
  mineracao:           "#E91E63",
  industria:           "#F5C518",
  petroleo:            "#9E9E9E",
  servicos_financeiros:"#9C27B0",
};

export default function HomePage() {
  const popularTickers = getAllMockTickers().slice(0, 7);
  const popularFiis = getAllMockFiiTickers().filter((t) =>
    ["MXRF11", "HGLG11", "XPLG11", "KNRI11", "VGHF11"].includes(t)
  );
  const homeArticles = HOME_ARTICLE_SLUGS
    .map((slug) => ALL_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is ArticleRecord => Boolean(a));
  const sectors = getSectorNavItems();

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
          HERO — 2 colunas em lg+, empilhado em mobile
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full">
        <div className="mx-auto grid max-w-[var(--page-max)] grid-cols-1 gap-12 px-[var(--page-gutter)] py-16 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-24">

          {/* Esquerda — copy + como funciona */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h1 className="ds-display-sm font-bold leading-[1.1] tracking-tight text-[var(--color-text)] sm:ds-display-md">
                Simule quanto você pode receber em dividendos
              </h1>
              <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
                Compare ações, estime pagamentos e visualize a renda potencial da sua carteira em poucos segundos.
              </p>
            </div>

            {/* Como funciona */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-soft)]">
                Como funciona
              </p>
              <ol className="flex flex-col gap-2">
                {[
                  "Escolha o ticker.",
                  "Informe a quantidade de cotas e clique em Simular dividendos.",
                  "Confira o último e próximo pagamento.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                    <span className="mt-[2px] shrink-0 font-semibold text-[var(--color-text-soft)]">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-1 flex items-start gap-1.5 text-xs text-[var(--color-text-soft)]">
                <span>⚠</span>
                <span>Não é recomendação de investimento. Fonte pública de proventos.</span>
              </p>
            </div>
          </div>

          {/* Direita — simulador */}
          <div id="simulador">
            <HomeHeroSimulator />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SEÇÕES
      ══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-16 px-[var(--page-gutter)] pb-24">

        {/* ── Ações populares ── */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">Ações populares</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Explore os principais pagadores de dividendos da B3
            </p>
          </div>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {popularTickers.map((t) => (
              <li key={t}>
                <TickerCard ticker={t} href={getTickerPath(t)} />
              </li>
            ))}
          </ul>
          <Link href="/setores" className="text-sm text-[var(--color-text-muted)] no-underline hover:text-[var(--color-text)] transition-colors">
            Ver todos →
          </Link>
        </section>

        {/* ── Fundos imobiliários ── */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">Fundos imobiliários</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Principais FIIs da B3 para investir
            </p>
          </div>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {popularFiis.map((t) => (
              <li key={t}>
                <TickerCard ticker={t} href={getFiiPath(t)} />
              </li>
            ))}
          </ul>
          <Link href="/fiis" className="text-sm text-[var(--color-text-muted)] no-underline hover:text-[var(--color-text)] transition-colors">
            Ver todos →
          </Link>
        </section>

        {/* ── Setores ── */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">Setores</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Descubra ações por setor da economia
            </p>
          </div>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {sectors.slice(0, 7).map(({ slug, label, href, icon }) => {
              const bg = SECTOR_COLORS[slug] ?? "#333333";
              return (
                <li key={slug}>
                  <Link
                    href={href}
                    className="flex h-[120px] w-full flex-col justify-between rounded-[16px] p-4 no-underline transition hover:opacity-90"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon name={icon} size="md" className="text-black/70" />
                    <span className="text-sm font-semibold text-black">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/setores" className="text-sm text-[var(--color-text-muted)] no-underline hover:text-[var(--color-text)] transition-colors">
            Ver todos →
          </Link>
        </section>

        {/* ── Artigos ── */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">Artigos</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Aprenda sobre dividendos e renda passiva
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homeArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <Link href="/artigos" className="text-sm text-[var(--color-text-muted)] no-underline hover:text-[var(--color-text)] transition-colors">
            Ver todos →
          </Link>
        </section>

        {/* ── FAQ ── */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">Perguntas frequentes</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Tire suas dúvidas sobre o simulador
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {FAQ_ITEMS.map((item) => (
              <li key={item.question}>
                <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                    <p className="text-sm font-medium text-[var(--color-text)]">{item.question}</p>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] transition-transform duration-200 group-open:rotate-180">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                        <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {item.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
          <Link href="/artigos" className="text-sm text-[var(--color-text-muted)] no-underline hover:text-[var(--color-text)] transition-colors">
            Ver artigos →
          </Link>
        </section>

      </div>
    </main>
  );
}
