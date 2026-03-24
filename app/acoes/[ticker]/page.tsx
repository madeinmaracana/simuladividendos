import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DividendCalculator } from "@/components/DividendCalculator";
import { BrapiError, getStockData } from "@/lib/brapi";

type PageProps = {
  params: { ticker: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ticker } = params;
  const symbol = decodeURIComponent(ticker).toUpperCase();
  const path = `/acoes/${encodeURIComponent(symbol)}`;
  return {
    title: `${symbol} — dividendos (estimativa)`,
    description: `Simulação de proventos para ${symbol} (B3): histórico e estimativas, sem garantias. Não é recomendação de investimento.`,
    keywords: [symbol, "dividendos", "B3", "proventos", "ação"],
    openGraph: {
      title: `${symbol} · SimulaDividendos`,
      description: `Estimativas de dividendos para ${symbol} com base em dados públicos.`,
      url: path,
    },
    alternates: { canonical: path },
  };
}

export default async function AcaoPage({ params }: PageProps) {
  const { ticker } = params;
  const raw = decodeURIComponent(ticker).trim();
  if (!raw) {
    notFound();
  }

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

  return (
    <main>
      <h1 className="mb-2 text-left text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
        Simule quanto uma ação pode pagar em dividendos
      </h1>
      <p className="mb-10 text-left text-sm text-neutral-600 dark:text-neutral-400">
        Ticker pré-carregado na URL. Ajuste as cotas ou busque outro papel; valores são apenas{" "}
        <strong className="font-medium text-neutral-800 dark:text-neutral-200">estimativas</strong>.
      </p>
      <section aria-labelledby="heading-calculadora-acao" className="flex flex-col gap-4">
        <h2
          id="heading-calculadora-acao"
          className="text-left text-lg font-semibold text-neutral-800 dark:text-neutral-200"
        >
          Calculadora de dividendos
        </h2>
        <DividendCalculator
          initialTicker={raw.toUpperCase()}
          initialStock={initialStock}
          serverError={serverError}
          defaultShares={100}
          showBackLink
        />
      </section>
    </main>
  );
}
