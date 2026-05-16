import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabComparador } from "@/components/lab/LabComparador";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageSchema, buildWebApplicationSchema, SITE_NAME } from "@/lib/seo";
import { getSeoBaseUrl } from "@/lib/site";

type SectorConfig = {
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  tickers: string[];
};

const SECTOR_CONFIG: Record<string, SectorConfig> = {
  papel: {
    title: "Compare dividendos de FIIs de papel da B3 | Simula Dividendos",
    description:
      "Compare quanto cada fundo de papel paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada Fundo imobiliário de papel paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva dos principais fundos de papel da B3.",
    tickers: ["MXRF11", "KNCR11", "KNIP11", "IRDM11", "RBRR11", "CPTS11", "VGIR11"],
  },
  logistica: {
    title: "Compare dividendos de FIIs de logística da B3 | Simula Dividendos",
    description:
      "Compare quanto cada fundo de logística paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada Fundo imobiliário de logística paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva dos principais fundos de logística da B3.",
    tickers: ["HGLG11", "XPLG11"],
  },
  shoppings: {
    title: "Compare dividendos de FIIs de shopping da B3 | Simula Dividendos",
    description:
      "Compare quanto cada fundo de shopping paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada Fundo imobiliário de shopping paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva dos principais fundos de shopping da B3.",
    tickers: ["XPML11", "VISC11"],
  },
  escritorios: {
    title: "Compare dividendos de FIIs de escritórios da B3 | Simula Dividendos",
    description:
      "Compare quanto cada fundo de lajes corporativas paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada Fundo imobiliário de escritórios paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva dos principais fundos de lajes corporativas da B3.",
    tickers: ["HGRE11", "BRCR11"],
  },
  hibrido: {
    title: "Compare dividendos de FIIs híbridos da B3 | Simula Dividendos",
    description:
      "Compare quanto cada fundo imobiliário híbrido paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada Fundo imobiliário híbrido paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva dos principais fundos imobiliários híbridos da B3.",
    tickers: ["KNRI11", "VGHF11"],
  },
};

const BASE_URL = getSeoBaseUrl().replace(/\/$/, "");

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(SECTOR_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const config = SECTOR_CONFIG[slug];
  if (!config) {
    return { title: "Setor não encontrado" };
  }
  const canonical = `${BASE_URL}/fiis/setores/${slug}`;
  return {
    title: config.title,
    description: config.description,
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
  };
}

export default function FiiSetorPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const config = SECTOR_CONFIG[slug];
  if (!config) {
    notFound();
  }

  const path = `/fiis/setores/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({ name: config.title, description: config.description, path }),
          buildWebApplicationSchema(),
        ]}
      />
      <LabComparador
        defaultTickers={config.tickers}
        heroTitle={config.heroTitle}
        heroDescription={config.heroDescription}
        sectorChips={{
          title: "Principais setores de FIIs",
          items: [
            { label: "Papel",       href: "/fiis/setores/papel" },
            { label: "Logística",   href: "/fiis/setores/logistica" },
            { label: "Shoppings",   href: "/fiis/setores/shoppings" },
            { label: "Escritórios", href: "/fiis/setores/escritorios" },
            { label: "Híbrido",     href: "/fiis/setores/hibrido" },
          ],
        }}
      />
    </>
  );
}
