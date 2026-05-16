import type { FiiSectorRecord, FiiSectorSlug } from "./types";
import { FII_SECTOR_SLUGS } from "./types";

export { FII_SECTOR_SLUGS };

export const FII_SECTORS: Record<FiiSectorSlug, FiiSectorRecord> = {
  papel: {
    slug: "papel",
    name: "Papel",
    icon: "receipt_long",
    intro:
      "FIIs de papel investem principalmente em títulos de crédito imobiliário — CRI, LCI e instrumentos correlatos — em vez de imóveis físicos. A renda tende a ser mais sensível ao ciclo de juros e ao spread de crédito do que à vacância de ativos reais.",
  },
  logistica: {
    slug: "logistica",
    name: "Logística",
    icon: "warehouse",
    intro:
      "FIIs de logística detêm galpões e centros de distribuição locados a empresas industriais, varejistas e operadores logísticos. A renda depende de contratos de locação, qualidade dos inquilinos e expansão da demanda por infraestrutura de armazenagem no Brasil.",
  },
  shoppings: {
    slug: "shoppings",
    name: "Shoppings",
    icon: "storefront",
    intro:
      "FIIs de shopping centers detêm participações em centros comerciais e recebem aluguéis fixos e variáveis conforme as vendas dos lojistas. A distribuição está ligada à ocupação, ao fluxo de consumidores e à capacidade de reajuste dos contratos.",
  },
  escritorios: {
    slug: "escritorios",
    name: "Escritórios",
    icon: "business",
    intro:
      "FIIs de escritórios investem em lajes corporativas e edifícios comerciais. A renda depende da vacância do mercado de offices, da qualidade do portfólio e da capacidade de renovação de contratos em ciclos de valorização ou retração do segmento.",
  },
  hibrido: {
    slug: "hibrido",
    name: "Híbrido",
    icon: "category",
    intro:
      "FIIs híbridos combinam mais de uma estratégia ou tipo de ativo — papel e tijolo, ou diferentes segmentos imobiliários — dentro do mesmo fundo. O perfil de risco e renda resulta da composição específica de cada portfólio.",
  },
};

export function getFiiSector(slug: FiiSectorSlug): FiiSectorRecord {
  return FII_SECTORS[slug];
}

export function isFiiSectorSlug(s: string): s is FiiSectorSlug {
  return (FII_SECTOR_SLUGS as readonly string[]).includes(s);
}
