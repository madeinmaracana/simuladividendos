import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DividendCalculator } from "@/components/DividendCalculator";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { StockHero } from "@/components/stocks/StockHero";
import { StockMetrics } from "@/components/stocks/StockMetrics";
import { StockPageHeading } from "@/components/stocks/StockPageHeading";
import { StockPeerLinks } from "@/components/stocks/StockPeerLinks";
import { BrapiError, getStockData } from "@/lib/brapi";
import { getAllMockTickers, getPeerTickers, getSectorPath, getStockSeo } from "@/lib/stocks-data";

type PageProps = { params: { ticker: string } };

export function generateStaticParams() {
  return getAllMockTickers().map((ticker) => ({ ticker }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const symbol = decodeURIComponent(params.ticker).trim().toUpperCase();
  const path = `/acoes/${encodeURIComponent(symbol)}`;
  const mock = getStockSeo(symbol);

  const title = `${symbol}: dividendos, simulação e análise`;

  const description = mock
    ? `${mock.companyName} (${symbol}): ${mock.shortDescription.slice(0, 120)}… Simule dividendos na B3 com estimativas a partir de histórico. Não é recomendação.`
    : `Simule dividendos e veja estimativas para ${symbol} na B3. Conteúdo educacional; não é recomendação de investimento.`;

  return {
    title,
    description,
    keywords: [symbol, "dividendos", "B3", mock?.sectorLabel ?? "ações", "simulador"],
    openGraph: {
      title: `${title} | Simula Dividendos`,
      description,
      url: path,
      locale: "pt_BR",
      type: "website",
    },
    alternates: { canonical: path },
  };
}

export default async function AcaoPage({ params }: PageProps) {
  const raw = decodeURIComponent(params.ticker).trim();
  if (!raw) {
    notFound();
  }

  const symbol = raw.toUpperCase();
  const mock = getStockSeo(symbol);

  let serverError: string | null = null;
  let initialStock = null;

  try {
    initialStock = await getStockData(raw);
  } catch (e) {
    if (e instanceof BrapiError) {
      serverError = e.message;
    } else {
      serverError = "Não foi possível carregar os dados deste ativo.";
    }
  }

  const displayName =
    mock?.companyName ??
    initialStock?.longName ??
    initialStock?.shortName ??
    "Ação na B3";

  const genericFaq = [
    {
      question: `Como simular dividendos de ${symbol}?`,
      answer:
        "Use a calculadora nesta página: informe o ticker (já pré-preenchido se você veio pelo link) e a quantidade de cotas. Os valores são estimativas com base em dados disponíveis.",
    },
    {
      question: "Os valores são garantidos?",
      answer:
        "Não. Dividendos dependem de decisão da companhia e de resultados futuros. O Simula Dividendos é ferramenta educacional.",
    },
    {
      question: "Onde encontro outros setores?",
      answer:
        "Visite a página de setores para navegar por bancos, energia, mineração e petróleo, com links para várias ações.",
    },
  ];

  return (
    <main className="flex flex-col gap-12">
      <StockPageHeading ticker={mock?.ticker ?? symbol} companyName={mock?.companyName ?? displayName} />

      <section aria-labelledby="heading-calculadora-acao" className="flex flex-col gap-4">
        <h2
          id="heading-calculadora-acao"
          className="text-left text-lg font-semibold text-neutral-800 dark:text-neutral-200"
        >
          Simulação de dividendos
        </h2>
        <p className="text-left text-sm text-neutral-600 dark:text-neutral-400">
          Ajuste cotas ou busque outro ticker. Valores exibidos pela API são{" "}
          <strong className="font-medium text-neutral-800 dark:text-neutral-200">estimativas</strong> derivadas do
          histórico — sem garantia de rendimento.
        </p>
        <DividendCalculator
          initialTicker={symbol}
          initialStock={initialStock}
          serverError={serverError}
          defaultShares={100}
          showBackLink
        />
      </section>

      {mock ? (
        <>
          <StockHero
            afterCalculator
            ticker={mock.ticker}
            companyName={mock.companyName}
            shortDescription={mock.shortDescription}
            sectorLabel={mock.sectorLabel}
            sectorSlug={mock.sectorSlug}
          />

          <StockMetrics
            ticker={mock.ticker}
            sectorLabel={mock.sectorLabel}
            priceBrl={mock.priceBrl}
            dividendYieldPct={mock.dividendYieldPct}
            payoutPct={mock.payoutPct}
            paymentFrequency={mock.paymentFrequency}
          />

          <section
            aria-labelledby="heading-historico-acao"
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <h2
              id="heading-historico-acao"
              className="text-left text-lg font-semibold text-neutral-900 dark:text-neutral-50"
            >
              Histórico e contexto
            </h2>
            <p className="mt-3 text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {mock.historySummary}
            </p>
          </section>

          <section
            aria-labelledby="heading-vale-acompanhar"
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <h2
              id="heading-vale-acompanhar"
              className="text-left text-lg font-semibold text-neutral-900 dark:text-neutral-50"
            >
              Vale a pena acompanhar {mock.ticker}?
            </h2>
            <p className="mt-3 text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {mock.worthFollowing}
            </p>
          </section>

          <StockPeerLinks
            sectorSlug={mock.sectorSlug}
            sectorLabel={mock.sectorLabel}
            peers={getPeerTickers(mock.ticker)}
          />
        </>
      ) : (
        <p className="max-w-3xl text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Página de simulação de dividendos para este papel na B3. Conteúdo editorial detalhado por setor está
          disponível para uma lista de tickers em expansão — explore os{" "}
          <Link href="/setores" className="font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-400">
            setores
          </Link>{" "}
          para mais contexto.
        </p>
      )}

      <StockFAQ
        title="Perguntas frequentes"
        items={mock ? [...mock.faqs, ...genericFaq] : genericFaq}
        id="heading-faq-acao"
      />

      {!mock ? (
        <p className="text-left text-sm text-neutral-500 dark:text-neutral-500">
          <Link href={getSectorPath("bancos")} className="text-teal-700 hover:underline dark:text-teal-400">
            Ver setor Bancos
          </Link>
          {" · "}
          <Link href="/setores" className="text-teal-700 hover:underline dark:text-teal-400">
            Todos os setores
          </Link>
        </p>
      ) : null}
    </main>
  );
}
