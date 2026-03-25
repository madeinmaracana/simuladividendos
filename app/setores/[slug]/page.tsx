import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorHero } from "@/components/seo/SectorHero";
import { SectorStockList } from "@/components/seo/SectorStockList";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { InternalLinksRow } from "@/components/seo/InternalLinksRow";
import { RelatedArticlesSection } from "@/components/seo/RelatedArticlesSection";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getArticlesForSector } from "@/data/articles";
import {
  getAllSectorSlugs,
  getSector,
  getStocksInSector,
  getTickerPath,
  isSectorSlug,
} from "@/lib/stocks-data";
import { breadcrumbsSector, buildSectorPageMetadata, ROUTES } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

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
  return buildSectorPageMetadata(sector);
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
  const relatedArticles = getArticlesForSector(sector.slug);

  return (
    <main className={ui.stackPage}>
      <Breadcrumbs items={breadcrumbsSector(sector)} />
      <SectorHero name={sector.name} intro={sector.intro} />

      <section aria-labelledby="heading-lista-setor" className={ui.stackSection}>
        <SectionHeading
          id="heading-lista-setor"
          title="Ações neste setor"
          description="Cada card leva à página do ticker com texto de contexto e a calculadora de dividendos."
        />
        <SectorStockList stocks={stocks} />
      </section>

      <section aria-labelledby="heading-relevancia-dividendos">
        <Card>
          <h2 id="heading-relevancia-dividendos" className={cn("text-left", ui.sectionTitle)}>
            Por que esse setor importa para quem busca dividendos
          </h2>
          <p className={cn(ui.body, "mt-3")}>{sector.dividendRelevance}</p>
          <p className={cn(ui.body, "mt-4")}>
            Quer comparar tickers? Abra cada ação acima ou volte à{" "}
            <TextLink href="/" className="text-sm">
              página inicial
            </TextLink>{" "}
            para usar a busca livre.
          </p>
        </Card>
      </section>

      <RelatedArticlesSection
        articles={relatedArticles}
        id="heading-artigos-setor"
        showSimuladorCta={relatedArticles.length > 0}
      />

      <StockFAQ
        title="Perguntas frequentes sobre o setor"
        items={sector.faqs}
        id="heading-faq-setor"
      />

      <InternalLinksRow
        ariaLabel="Navegação secundária"
        links={[
          { href: ROUTES.setores, label: "Todos os setores" },
          { href: ROUTES.home, label: "Início" },
          ...(stocks[0] ? [{ href: getTickerPath(stocks[0].ticker), label: `Exemplo: ${stocks[0].ticker}` }] : []),
        ]}
      />
    </main>
  );
}
