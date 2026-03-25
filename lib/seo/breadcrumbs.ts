import type { ArticleRecord } from "@/data/articles";
import type { SectorRecord } from "@/data/stocks";
import type { StockSeoRecord } from "@/data/stocks";
import { ROUTES } from "./constants";
import { getSectorPath } from "@/data/stocks";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function breadcrumbsTicker(symbol: string, mock: StockSeoRecord | null): BreadcrumbItem[] {
  const sectorLabel = mock?.sectorLabel ?? "Setores";
  const sectorHref = mock ? getSectorPath(mock.sectorSlug) : ROUTES.setores;

  return [
    { label: "Início", href: ROUTES.home },
    { label: "Simulador", href: ROUTES.simulador },
    { label: sectorLabel, href: sectorHref },
    { label: symbol, href: undefined },
  ];
}

export function breadcrumbsSector(sector: SectorRecord): BreadcrumbItem[] {
  return [
    { label: "Início", href: ROUTES.home },
    { label: "Setores", href: ROUTES.setores },
    { label: sector.name, href: undefined },
  ];
}

export function breadcrumbsArticle(article: ArticleRecord): BreadcrumbItem[] {
  return [
    { label: "Início", href: ROUTES.home },
    { label: "Artigos", href: ROUTES.artigos },
    { label: article.title, href: undefined },
  ];
}

export function breadcrumbsSimple(
  items: { label: string; href?: string }[]
): BreadcrumbItem[] {
  return items;
}
