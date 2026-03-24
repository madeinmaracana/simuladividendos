import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectorHero } from "@/components/seo/SectorHero";
import { SectorStockList } from "@/components/seo/SectorStockList";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import {
  getAllSectorSlugs,
  getSector,
  getStocksInSector,
  getTickerPath,
  isSectorSlug,
} from "@/lib/stocks-data";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSectorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const sector = isSectorSlug(slug) ? getSector(slug) : null;
  if (!sector) {
    return { title: "Setor não encontrado" };
  }

  const path = `/setores/${encodeURIComponent(slug)}`;
  const title = `Ações do setor de ${sector.name}`;
  const introSnippet =
    sector.intro.length > 140 ? `${sector.intro.slice(0, 137).trim()}…` : sector.intro;
  const description = `${introSnippet} Veja lista de ações, yield de referência e simulador. Não é recomendação.`;

  return {
    title,
    description,
    keywords: [sector.name, "ações", "B3", "dividendos", "setor"],
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

export default function SetorPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  if (!isSectorSlug(slug)) {
    notFound();
  }

  const sector = getSector(slug);
  if (!sector) {
    notFound();
  }

  const stocks = getStocksInSector(slug);

  return (
    <main className="flex flex-col gap-12">
      <SectorHero name={sector.name} intro={sector.intro} />

      <section aria-labelledby="heading-lista-setor">
        <h2
          id="heading-lista-setor"
          className="text-left text-lg font-semibold text-neutral-800 dark:text-neutral-200"
        >
          Ações neste setor
        </h2>
        <p className="mt-2 text-left text-sm text-neutral-600 dark:text-neutral-400">
          Cada card leva à página do ticker com texto de contexto e a calculadora de dividendos.
        </p>
        <div className="mt-6">
          <SectorStockList stocks={stocks} />
        </div>
      </section>

      <section
        aria-labelledby="heading-relevancia-dividendos"
        className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      >
        <h2
          id="heading-relevancia-dividendos"
          className="text-left text-lg font-semibold text-neutral-900 dark:text-neutral-50"
        >
          Por que esse setor importa para quem busca dividendos
        </h2>
        <p className="mt-3 text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {sector.dividendRelevance}
        </p>
        <p className="mt-4 text-left text-sm text-neutral-600 dark:text-neutral-400">
          Quer comparar tickers? Abra cada ação acima ou volte à{" "}
          <Link href="/" className="font-medium text-teal-700 hover:underline dark:text-teal-400">
            página inicial
          </Link>{" "}
          para usar a busca livre.
        </p>
      </section>

      <StockFAQ title="Perguntas frequentes sobre o setor" items={sector.faqs} id="heading-faq-setor" />

      <nav className="flex flex-wrap gap-4 border-t border-neutral-200 pt-8 text-sm dark:border-neutral-800">
        <Link href="/setores" className="text-teal-700 hover:underline dark:text-teal-400">
          Todos os setores
        </Link>
        <Link href="/" className="text-teal-700 hover:underline dark:text-teal-400">
          Início
        </Link>
        {stocks[0] ? (
          <Link href={getTickerPath(stocks[0].ticker)} className="text-teal-700 hover:underline dark:text-teal-400">
            Exemplo: página de {stocks[0].ticker}
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
