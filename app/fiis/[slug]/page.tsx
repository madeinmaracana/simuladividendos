import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabComparador } from "@/components/lab/LabComparador";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageSchema, SITE_NAME } from "@/lib/seo";
import { FIIS_BY_TICKER, FII_SECTORS } from "@/data/fiis";
import { parseFiiSlug } from "@/lib/fiis/fii-slug";
import { buildAllFiiSlugStaticParams } from "@/data/fii-registry";

/* ── rotas estáticas ─────────────────────────────────────── */

export function generateStaticParams() {
  return buildAllFiiSlugStaticParams();
}

/* ── metadata ────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { ticker } = parseFiiSlug(decodeURIComponent(params.slug).trim());
  const fii = FIIS_BY_TICKER[ticker];
  if (!fii) return {};

  const title = `Simulador de rendimentos ${ticker} — ${fii.fundName} | ${SITE_NAME}`;
  const description = `Simule aportes em ${ticker} (${fii.fundName}) e veja quanto você receberia em rendimentos mensais. Compare histórico, próximo pagamento e dividend yield dos últimos 12 meses.`;

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

const FII_SECTOR_CHIPS = [
  { label: "Papel", href: "/fiis/setores/papel" },
  { label: "Logística", href: "/fiis/setores/logistica" },
  { label: "Shoppings", href: "/fiis/setores/shoppings" },
  { label: "Escritórios", href: "/fiis/setores/escritorios" },
  { label: "Híbrido", href: "/fiis/setores/hibrido" },
];

/* ── page ────────────────────────────────────────────────── */

export default function FiiSimuladorPage({
  params,
}: {
  params: { slug: string };
}) {
  const { ticker } = parseFiiSlug(decodeURIComponent(params.slug).trim());
  const fii = FIIS_BY_TICKER[ticker];
  if (!fii) notFound();

  const sectorLabel = FII_SECTORS[fii.sector]?.name ?? fii.sector;

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            name: `Simulador de rendimentos ${ticker} — ${fii.fundName} | ${SITE_NAME}`,
            description: `Simule aportes em ${ticker} e veja quanto você receberia em rendimentos mensais.`,
            path: `/fiis/${ticker}`,
          }),
        ]}
      />
      <LabComparador
        defaultTickers={[ticker]}
        heroTitle={`Veja quanto ${fii.fundName} paga em rendimentos.`}
        heroDescription={`Simule aportes, acompanhe os pagamentos e descubra o potencial de renda passiva do ${ticker}.`}
        assetIdentity={{
          ticker,
          companyName: fii.fundName,
          sectorLabel,
          sectorHref: `/fiis/setores/${fii.sector}`,
        }}
        sectorChips={{ title: "Principais setores de FIIs", items: FII_SECTOR_CHIPS }}
      />
    </>
  );
}
