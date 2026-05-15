import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_FIIS, getFiiPath } from "@/data/fiis";
import { tickerAccentColor } from "@/lib/ticker-colors";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbSchema, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES } from "@/lib/seo/constants";

export const metadata: Metadata = buildPageMetadata({
  title: "Melhores FIIs para renda passiva | Simula Dividendos",
  description:
    "Lista dos principais fundos imobiliários (FIIs) da B3 para renda passiva mensal. Compare rendimentos, frequência de pagamento e simule quanto você pode receber.",
  canonicalPath: "/melhores-fiis",
});

const PAGE_TITLE = "Melhores FIIs para renda passiva";
const PAGE_DESCRIPTION =
  "Os principais fundos imobiliários da B3 para quem busca renda mensal consistente. Clique em qualquer FII para simular seus rendimentos com o simulador educacional.";

export default function MelhoresFiisPage() {
  return (
    <main className="w-full py-16 lg:py-24">
      <JsonLd
        data={[
          buildWebPageSchema({ name: `${PAGE_TITLE} | ${SITE_NAME}`, description: PAGE_DESCRIPTION, path: "/melhores-fiis" }),
          buildBreadcrumbSchema(
            [{ label: "Início", href: ROUTES.home }, { label: "FIIs", href: ROUTES.fiis }, { label: PAGE_TITLE }],
            "/melhores-fiis"
          ),
        ]}
      />
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">FIIs</p>
          <h1 className="max-w-[26ch] text-[53px] font-medium leading-[63px] text-white">
            {PAGE_TITLE}
          </h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            {PAGE_DESCRIPTION}
          </p>
          <p className="max-w-2xl text-[13px] font-medium text-[#808080]">
            Valores de referência educacional — rendimentos passados não garantem retornos futuros. Não é recomendação de investimento.
          </p>
        </header>

        {/* Por que FIIs para renda passiva */}
        <section className="flex flex-col gap-4">
          <h2 className="text-[24px] font-medium leading-tight text-white">
            Por que FIIs são populares para renda passiva
          </h2>
          <p className="text-[13px] font-medium leading-relaxed text-[#808080]">
            Fundos de investimento imobiliário (FIIs) são obrigados por lei a distribuir pelo menos 95% do lucro aos cotistas, o que resulta em pagamentos mensais consistentes. Isso os torna uma das classes de ativos mais usadas por investidores que buscam renda recorrente na B3 sem precisar administrar imóveis diretamente.
          </p>
          <p className="text-[13px] font-medium leading-relaxed text-[#808080]">
            Os rendimentos são isentos de IR para pessoas físicas que atendem aos critérios legais, o que aumenta ainda mais o apelo. Use o simulador em cada página de FII para estimar quanto você receberia com uma quantidade específica de cotas.
          </p>
        </section>

        {/* Lista de FIIs */}
        <section className="flex flex-col gap-5" aria-labelledby="heading-lista-fiis">
          <h2 id="heading-lista-fiis" className="text-[24px] font-medium leading-tight text-white">
            FIIs no simulador
          </h2>
          <ul className="flex flex-col gap-3">
            {MOCK_FIIS.map((fii) => {
              const accent = tickerAccentColor(fii.ticker);
              return (
                <li key={fii.ticker}>
                  <Link
                    href={getFiiPath(fii.ticker)}
                    className="flex items-center gap-4 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-4 no-underline transition hover:border-[rgba(120,120,120,0.40)] hover:brightness-110"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {fii.ticker.slice(0, 2)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium text-white">{fii.ticker}</p>
                      <p className="mt-0.5 line-clamp-1 text-[13px] font-medium text-[#808080]">
                        {fii.shortDescription}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                      <span
                        className="material-symbols-outlined leading-none text-black"
                        style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
                      >
                        arrow_forward
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Próximos passos */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[24px] font-medium leading-tight text-white">Próximos passos</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/melhores-acoes-dividendos" className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Melhores ações de dividendos
            </Link>
            <Link href={ROUTES.fiis} className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Todos os FIIs
            </Link>
            <Link href={ROUTES.artigos} className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Artigos sobre renda passiva
            </Link>
            <Link href={ROUTES.comparar} className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Comparar ativos
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
