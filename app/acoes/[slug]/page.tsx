import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabComparador } from "@/components/lab/LabComparador";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageSchema, SITE_NAME } from "@/lib/seo";
import { STOCKS_BY_TICKER } from "@/data/stocks";
import { parseAcaoSlug, buildAllAcaoSlugStaticParams } from "@/lib/acoes/acao-slug";

/* ── rotas estáticas ─────────────────────────────────────── */

export function generateStaticParams() {
  return buildAllAcaoSlugStaticParams();
}

/* ── metadata ────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { ticker } = parseAcaoSlug(decodeURIComponent(params.slug).trim());
  const stock = STOCKS_BY_TICKER[ticker];
  if (!stock) return {};

  const title = `Simulador de dividendos ${ticker} — ${stock.companyName} | ${SITE_NAME}`;
  const description = `Simule aportes em ${ticker} (${stock.companyName}) e veja quanto você receberia em dividendos. Compare histórico, próximo pagamento e DY dos últimos 12 meses.`;

  return {
    title,
    description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ── chips de setores ────────────────────────────────────── */

const SECTOR_CHIPS = [
  { label: "Bancos", href: "/setores/bancos" },
  { label: "Energia elétrica", href: "/setores/energia" },
  { label: "Mineração", href: "/setores/mineracao" },
  { label: "Consumo", href: "/setores/consumo" },
  { label: "Indústria", href: "/setores/industria" },
  { label: "Petróleo e gás", href: "/setores/petroleo" },
  { label: "Serviços financeiros", href: "/setores/servicos_financeiros" },
];

/* ── page ────────────────────────────────────────────────── */

export default function AcaoSimuladorPage({
  params,
}: {
  params: { slug: string };
}) {
  const { ticker } = parseAcaoSlug(decodeURIComponent(params.slug).trim());
  const stock = STOCKS_BY_TICKER[ticker];
  if (!stock) notFound();

  const sectorLabel = stock.sectorLabel ?? stock.sectorSlug;

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            name: `Simulador de dividendos ${ticker} — ${stock.companyName} | ${SITE_NAME}`,
            description: `Simule aportes em ${ticker} e veja quanto você receberia em dividendos.`,
            path: `/acoes/${ticker}`,
          }),
        ]}
      />
      <LabComparador
        defaultTickers={[ticker]}
        heroTitle={`Veja quanto ${stock.companyName} paga em dividendos.`}
        heroDescription={`Simule aportes, acompanhe os pagamentos e descubra o potencial de renda passiva da ${ticker}.`}
        assetIdentity={{
          ticker,
          companyName: stock.companyName,
          sectorLabel,
          sectorHref: `/setores/${stock.sectorSlug}`,
        }}
        sectorChips={{ title: "Principais setores de ações", items: SECTOR_CHIPS }}
      />
    </>
  );
}
