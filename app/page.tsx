import type { Metadata } from "next";
import { LabComparador } from "@/components/lab/LabComparador";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageSchema, buildWebApplicationSchema, SITE_NAME } from "@/lib/seo";
import { getSeoBaseUrl } from "@/lib/site";

/* ── SEO ──────────────────────────────────────────────────── */

const TITLE = "Simula Dividendos | Compare dividendos de ações e FIIs da B3";
const DESCRIPTION =
  "Compare quanto cada ação ou FII paga em dividendos com um aporte simulado. Veja o último pagamento, o próximo e o total dos últimos 12 meses de uma vez só.";
const CANONICAL = getSeoBaseUrl();

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
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/* ── Page ─────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: "/",
          }),
          buildWebApplicationSchema(),
        ]}
      />
      <LabComparador />
    </>
  );
}
