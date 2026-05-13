import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/layout/SiteNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TickerCard } from "@/components/ui/TickerCard";
import { tickerAccentColor } from "@/lib/ticker-colors";
import { HomeHeroSimulator } from "@/components/home/HomeHeroSimulator";
import { getAllMockTickers, getSectorNavItems } from "@/lib/stocks-data";
import { ALL_ARTICLES, type ArticleRecord } from "@/data/articles";
import { getAllMockFiiTickers, getFiiPath } from "@/data/fiis";
import { getTickerPath } from "@/data/stocks";
import { buildPageMetadata, buildWebPageSchema, buildWebApplicationSchema, SITE_NAME } from "@/lib/seo";

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

/** Ícone por setor (Google Material Symbols) */
const SECTOR_ICONS: Record<string, string> = {
  bancos:               "account_balance",
  consumo:              "shopping_bag",
  energia:              "bolt",
  mineracao:            "diamond",
  industria:            "factory",
  petroleo:             "local_gas_station",
  servicos_financeiros: "payments",
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
        data={[
          buildWebPageSchema({
            name: `${HOME_TITLE} | ${SITE_NAME}`,
            description: HOME_DESCRIPTION,
            path: "/",
          }),
          buildWebApplicationSchema(),
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════
          HERO — card escuro flutuante, rounded-[32px], 8px margin via layout p-2
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="overflow-hidden rounded-[32px]"
        style={{ background: "url(/hero-bg.jpg) center / cover no-repeat, #1A1A1A" }}
      >
        {/* Nav dentro do card hero */}
        <SiteNav />

        <div className="mx-auto grid max-w-[var(--page-max)] grid-cols-1 gap-12 px-[var(--page-gutter)] pb-16 lg:grid-cols-2 lg:items-start lg:gap-16 lg:pb-24">

          {/* Esquerda — copy + como funciona */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-[53px] font-medium leading-[63px] text-white">
                Simule quanto você pode receber em dividendos.
              </h1>
              <p className="text-[21px] font-normal leading-relaxed text-white/70">
                Compare ações, estime pagamentos e visualize a renda potencial da sua carteira em poucos segundos.
              </p>
            </div>

            {/* Como funciona */}
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-medium text-[#808080]">
                Como funciona
              </p>
              <ol className="flex flex-col gap-2">
                {[
                  "Escolha o ticker.",
                  "Informe a quantidade de ações e clique em Simular dividendos.",
                  "Confira o último e próximo pagamento.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-[#808080]">
                    <span className="shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-1 flex items-start gap-1.5 text-[13px] font-medium text-[#808080]">
                <span>◆</span>
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
          SEÇÕES — fundo claro
      ══════════════════════════════════════════════════════════════ */}
      <div className="w-full bg-[#F3F4F6]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-16 px-[var(--page-gutter)] py-16 lg:py-24">

          {/* ── Ações populares ── */}
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[27px] font-medium leading-tight text-[#111827]">Ações populares</h2>
              <p className="text-[13px] font-medium text-[#6B7280]">
                Explore os principais pagadores de dividendos da B3
              </p>
            </div>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
              {popularTickers.map((t) => (
                <li key={t}>
                  <TickerCard ticker={t} href={getTickerPath(t)} theme="light" />
                </li>
              ))}
            </ul>
            <Link href="/setores" className="flex items-center gap-1.5 text-[13px] font-medium text-[#111827] no-underline transition-opacity hover:opacity-60">
              Ver todas
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </Link>
          </section>

          {/* ── Fundos imobiliários ── */}
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[27px] font-medium leading-tight text-[#111827]">Fundos imobiliários</h2>
              <p className="text-[13px] font-medium text-[#6B7280]">
                Principais FIIs da B3 para investir
              </p>
            </div>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {popularFiis.map((t) => (
                <li key={t}>
                  <TickerCard ticker={t} href={getFiiPath(t)} accentColor={tickerAccentColor(t)} theme="light" />
                </li>
              ))}
            </ul>
            <Link href="/fiis" className="flex items-center gap-1.5 text-[13px] font-medium text-[#111827] no-underline transition-opacity hover:opacity-60">
              Ver todas
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </Link>
          </section>

          {/* ── Setores ── */}
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[27px] font-medium leading-tight text-[#111827]">Setores</h2>
              <p className="text-[13px] font-medium text-[#6B7280]">
                Descubra ações por setor da economia
              </p>
            </div>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
              {sectors.slice(0, 7).map(({ slug, label, href }) => {
                const iconName = SECTOR_ICONS[slug] ?? "apartment";
                return (
                  <li key={slug}>
                    <Link
                      href={href}
                      className="flex h-[120px] w-full flex-col justify-between rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-4 no-underline transition hover:border-[rgba(0,0,0,0.15)] hover:shadow-sm"
                    >
                      <span
                        className="material-symbols-outlined leading-none text-[#374151]"
                        style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
                      >
                        {iconName}
                      </span>
                      <span className="text-sm font-semibold text-[#111827]">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href="/setores" className="flex items-center gap-1.5 text-[13px] font-medium text-[#111827] no-underline transition-opacity hover:opacity-60">
              Ver todos
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </Link>
          </section>

          {/* ── Artigos ── */}
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[27px] font-medium leading-tight text-[#111827]">Artigos</h2>
              <p className="text-[13px] font-medium text-[#6B7280]">
                Aprenda sobre dividendos e renda passiva
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {homeArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} theme="light" />
              ))}
            </div>
            <Link href="/artigos" className="flex items-center gap-1.5 text-[13px] font-medium text-[#111827] no-underline transition-opacity hover:opacity-60">
              Ver todos
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </Link>
          </section>

          {/* ── FAQ ── */}
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[27px] font-medium leading-tight text-[#111827]">Perguntas frequentes</h2>
              <p className="text-[13px] font-medium text-[#6B7280]">
                Tire suas dúvidas sobre o simulador
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {FAQ_ITEMS.map((item) => (
                <li key={item.question}>
                  <details className="group rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                      <p className="text-[13px] font-medium text-[#111827]">{item.question}</p>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[#6B7280] transition-transform duration-200 group-open:rotate-180">
                        <span className="material-symbols-outlined leading-none" style={{ fontSize: 20, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}>
                          expand_more
                        </span>
                      </span>
                    </summary>
                    <p className="px-4 pb-4 text-[13px] font-medium leading-relaxed text-[#6B7280]">
                      {item.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
            <Link href="/artigos" className="flex items-center gap-1.5 text-[13px] font-medium text-[#111827] no-underline transition-opacity hover:opacity-60">
              Ver artigos
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </Link>
          </section>

        </div>
      </div>
    </main>
  );
}
