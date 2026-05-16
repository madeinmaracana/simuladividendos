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
  bancos: {
    title: "Compare dividendos de bancos da B3 | Simula Dividendos",
    description:
      "Compare quanto cada banco paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada banco paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva dos principais bancos da B3.",
    tickers: ["BBAS3", "ITUB4", "ITSA4", "BBDC4", "BPAC11"],
  },
  energia: {
    title: "Compare dividendos de elétricas da B3 | Simula Dividendos",
    description:
      "Compare quanto cada elétrica paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada elétrica paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva das principais empresas de energia da B3.",
    tickers: ["EGIE3", "TAEE11", "CMIG4", "CPLE3", "VBBR3"],
  },
  mineracao: {
    title: "Compare dividendos de mineradoras da B3 | Simula Dividendos",
    description:
      "Compare quanto cada mineradora paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada mineradora paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva das principais mineradoras da B3.",
    tickers: ["VALE3", "GGBR4", "GOAU4", "CMIN3", "USIM5"],
  },
  consumo: {
    title: "Compare dividendos de empresas de consumo da B3 | Simula Dividendos",
    description:
      "Compare quanto cada empresa de consumo paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada empresa de consumo paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva das principais empresas de consumo da B3.",
    tickers: ["ABEV3", "LREN3", "ASAI3", "VIVA3", "MGLU3"],
  },
  industria: {
    title: "Compare dividendos de empresas industriais da B3 | Simula Dividendos",
    description:
      "Compare quanto cada empresa industrial paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada empresa industrial paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva das principais empresas industriais da B3.",
    tickers: ["WEGE3", "KLBN11", "POMO4"],
  },
  petroleo: {
    title: "Compare dividendos de petroleiras da B3 | Simula Dividendos",
    description:
      "Compare quanto cada petroleira paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle: "Compare quanto cada petroleira paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva das principais empresas de petróleo e gás da B3.",
    tickers: ["PETR4", "UGPA3", "CSAN3"],
  },
  servicos_financeiros: {
    title: "Compare dividendos de serviços financeiros da B3 | Simula Dividendos",
    description:
      "Compare quanto cada empresa de serviços financeiros paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.",
    heroTitle:
      "Compare quanto cada empresa de serviços financeiros paga em dividendos.",
    heroDescription:
      "Simule aportes e compare a renda passiva das principais empresas de serviços financeiros da B3.",
    tickers: ["B3SA3", "RDOR3"],
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
  const canonical = `${BASE_URL}/setores/${slug}`;
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

export default function SetorPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const config = SECTOR_CONFIG[slug];
  if (!config) {
    notFound();
  }

  const path = `/setores/${slug}`;

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
          title: "Principais setores de ações",
          items: [
            { label: "Bancos",               href: "/setores/bancos" },
            { label: "Energia elétrica",     href: "/setores/energia" },
            { label: "Mineração",            href: "/setores/mineracao" },
            { label: "Consumo",              href: "/setores/consumo" },
            { label: "Indústria",            href: "/setores/industria" },
            { label: "Petróleo e gás",       href: "/setores/petroleo" },
            { label: "Serviços financeiros", href: "/setores/servicos_financeiros" },
          ],
        }}
      />
    </>
  );
}
