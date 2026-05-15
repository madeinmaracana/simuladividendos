import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/layout/SiteNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TickerCard } from "@/components/ui/TickerCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionLink } from "@/components/ui/SectionLink";
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
  const popularTickers = getAllMockTickers().slice(0, 5);
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
          HERO — Figma node-id=40-903
          Frame 82: rounded-[32px], padding 24px top / 120px bottom,
          gap 120px entre nav e conteúdo, bg #2A2A2A + imagem
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="flex w-full flex-col items-center rounded-[32px]"
        style={{
          backgroundImage: "url(/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#2A2A2A",
          paddingTop: 24,
          paddingBottom: 120,
          gap: 120,
        }}
      >
        {/* Topbar — max 980px, alinhado com conteúdo */}
        <SiteNav />

        {/* Conteúdo — max 980px, 2 colunas, gap 40px */}
        <div
          className="flex w-full flex-col items-start gap-[40px] px-4 lg:flex-row"
          style={{ maxWidth: 980 }}
        >

          {/* Coluna esquerda — título + subtítulo (topo) | Como funciona (baixo) */}
          <div className="flex flex-1 flex-col justify-between gap-10 self-stretch">

            {/* Título + subtítulo — gap 32px */}
            <div className="flex flex-col gap-8">
              <h1
                className="text-white"
                style={{ fontSize: 56, fontWeight: 300, lineHeight: "63px" }}
              >
                Simule quanto você pode receber em dividendos.
              </h1>
              <p
                className="text-white"
                style={{ fontSize: 24, fontWeight: 300, lineHeight: "normal" }}
              >
                Compare ações, estime pagamentos e visualize a renda potencial da sua carteira em poucos segundos.
              </p>
            </div>

            {/* Como funciona — fixado no fundo da coluna */}
            <div className="flex flex-col gap-4">
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
              <p className="flex items-start gap-1.5 text-[13px] font-medium text-[#808080]">
                <span>◆</span>
                <span>Não é recomendação de investimento. Fonte pública de proventos.</span>
              </p>
            </div>
          </div>

          {/* Coluna direita — simulador, 410px fixo */}
          <div id="simulador" className="w-full flex-shrink-0 lg:w-[410px]">
            <HomeHeroSimulator />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SEÇÕES — fundo claro
      ══════════════════════════════════════════════════════════════ */}
      <div className="w-full bg-[#F3F4F6]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-[60px] px-[var(--page-gutter)] py-16 lg:py-24">

          {/* ── Ações populares ── */}
          <section className="flex flex-col gap-6">
            <SectionHeader
              title="Ações populares"
              subtitle="Explore os principais pagadores de dividendos da B3"
            />
            <ul className="flex gap-2">
              {popularTickers.map((t) => (
                <li key={t} className="min-w-0 flex-1">
                  <TickerCard ticker={t} href={getTickerPath(t)} theme="light" />
                </li>
              ))}
            </ul>
            <SectionLink href="/setores" label="Ver todas" />
          </section>

          {/* ── Fundos imobiliários ── */}
          <section className="flex flex-col gap-6">
            <SectionHeader
              title="Fundos imobiliários"
              subtitle="Principais FIIs da B3 para investir"
            />
            <ul className="flex gap-2">
              {popularFiis.map((t) => (
                <li key={t} className="min-w-0 flex-1">
                  <TickerCard ticker={t} href={getFiiPath(t)} accentColor={tickerAccentColor(t)} theme="light" />
                </li>
              ))}
            </ul>
            <SectionLink href="/fiis" label="Ver todas" />
          </section>

          {/* ── Setores ── */}
          <section className="flex flex-col gap-6">
            <SectionHeader
              title="Setores"
              subtitle="Descubra ações por setor da economia"
            />
            <ul className="flex gap-2">
              {sectors.slice(0, 5).map(({ slug, label, href }) => {
                const iconName = SECTOR_ICONS[slug] ?? "apartment";
                return (
                  <li key={slug} className="min-w-0 flex-1">
                    <Link
                      href={href}
                      className="flex h-[131px] w-full flex-col items-start gap-[50px] rounded-[16px] bg-[#E5E7EC] p-4 no-underline transition hover:brightness-95"
                    >
                      <span
                        className="material-symbols-outlined leading-none text-[#9CA3AF]"
                        style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 400, 'FILL' 1, 'GRAD' 0" }}
                      >
                        {iconName}
                      </span>
                      <span className="text-[13px] font-semibold text-[#111827]">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <SectionLink href="/setores" label="Ver todos" />
          </section>

          {/* ── Artigos ── */}
          <section className="flex flex-col gap-5">
            <SectionHeader
              title="Artigos"
              subtitle="Aprenda sobre dividendos e renda passiva"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {homeArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} theme="light" />
              ))}
            </div>
            <SectionLink href="/artigos" label="Ver todos" />
          </section>

          {/* ── FAQ ── */}
          <section className="flex flex-col gap-5">
            <SectionHeader
              title="Perguntas frequentes"
              subtitle="Tire suas dúvidas sobre o simulador"
            />
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
            <SectionLink href="/artigos" label="Ver artigos" />
          </section>

        </div>
      </div>
    </main>
  );
}
