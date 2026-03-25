import type { AcaoUrlVariant } from "@/lib/acoes/acao-slug";
import { acaoMainSlug } from "@/lib/acoes/acao-slug";
import type { FiiUrlVariant } from "@/lib/fiis/fii-slug";
import { fiiMainSlug } from "@/lib/fiis/fii-slug";
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

function acaoVariantCrumbLabel(variant: AcaoUrlVariant): string {
  if (variant === "quanto-paga-dividendos") return "Quanto paga dividendos";
  if (variant === "dividendos") return "Dividendos";
  if (variant === "paga-quanto") return "Quanto paga";
  return "Simulador";
}

/** Breadcrumb com link da variação de volta à página principal do ticker. */
export function breadcrumbsAcao(
  symbol: string,
  mock: StockSeoRecord | null,
  variant: "main" | AcaoUrlVariant
): BreadcrumbItem[] {
  const sectorLabel = mock?.sectorLabel ?? "Setores";
  const sectorHref = mock ? getSectorPath(mock.sectorSlug) : ROUTES.setores;
  const mainPath = `/acoes/${encodeURIComponent(acaoMainSlug(symbol))}`;

  if (variant === "main") {
    return [
      { label: "Início", href: ROUTES.home },
      { label: "Simulador", href: ROUTES.simulador },
      { label: sectorLabel, href: sectorHref },
      { label: symbol, href: undefined },
    ];
  }

  return [
    { label: "Início", href: ROUTES.home },
    { label: "Simulador", href: ROUTES.simulador },
    { label: sectorLabel, href: sectorHref },
    { label: symbol, href: mainPath },
    { label: acaoVariantCrumbLabel(variant), href: undefined },
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

export function breadcrumbsFii(symbol: string): BreadcrumbItem[] {
  return [
    { label: "Início", href: ROUTES.home },
    { label: "FIIs", href: ROUTES.fiis },
    { label: symbol, href: undefined },
  ];
}

export function breadcrumbsFiiSlug(symbol: string, variant: "main" | FiiUrlVariant): BreadcrumbItem[] {
  if (variant === "main") return breadcrumbsFii(symbol);

  const mainPath = `/fiis/${encodeURIComponent(fiiMainSlug(symbol))}`;
  return [
    { label: "Início", href: ROUTES.home },
    { label: "FIIs", href: ROUTES.fiis },
    { label: symbol, href: mainPath },
    { label: "Quanto paga por mês", href: undefined },
  ];
}

export function breadcrumbsSimple(
  items: { label: string; href?: string }[]
): BreadcrumbItem[] {
  return items;
}
