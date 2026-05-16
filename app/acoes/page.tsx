import type { Metadata } from "next";
import { LabComparador } from "@/components/lab/LabComparador";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageSchema, buildWebApplicationSchema, SITE_NAME } from "@/lib/seo";
import { getSeoBaseUrl } from "@/lib/site";

const TITLE = "Simula Dividendos | Compare dividendos de ações da B3";
const DESCRIPTION =
  "Compare quanto cada ação paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses.";
const CANONICAL = `${getSeoBaseUrl().replace(/\/$/, "")}/acoes`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function AcoesPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({ name: TITLE, description: DESCRIPTION, path: "/acoes" }),
          buildWebApplicationSchema(),
        ]}
      />
      <LabComparador
        defaultTickers={[
          "BBAS3", "ITUB4", "VALE3", "EGIE3",
          "PETR4", "ABEV3", "WEGE3", "TAEE11",
          "BBDC4", "B3SA3", "KLBN11", "CSAN3",
        ]}
        heroTitle="Compare quanto cada ação paga em dividendos."
        heroDescription="Simule aportes e compare a renda passiva das principais ações da bolsa."
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
