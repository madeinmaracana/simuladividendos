import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { getAllSectorSlugs, getSector, getSectorPath } from "@/lib/stocks-data";
import { getSeoBaseUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

const base = getSeoBaseUrl();

export const metadata: Metadata = {
  title: "Setores",
  description:
    "Explore ações da B3 agrupadas por setor — bancos, energia, mineração e petróleo — com links para simulação de dividendos.",
  alternates: { canonical: "/setores" },
  metadataBase: new URL(base),
  openGraph: {
    title: "Setores | SimulaDividendos",
    description:
      "Explore ações da B3 agrupadas por setor — com links para simulação de dividendos.",
    url: `${base}/setores`,
    locale: "pt_BR",
    type: "website",
    siteName: "Simula Dividendos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Setores | SimulaDividendos",
    description:
      "Explore ações da B3 agrupadas por setor — com links para simulação de dividendos.",
  },
};

export default function SetoresIndexPage() {
  const slugs = getAllSectorSlugs();

  return (
    <main className={ui.stackPage}>
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Setores", href: undefined },
        ]}
      />

      <header className={cn(ui.divider, "flex flex-col gap-3")}>
        <p className={ui.eyebrow}>Navegação</p>
        <h1 className={cn("text-left", ui.pageTitle)}>Setores na B3</h1>
        <p className={cn(ui.body, "max-w-2xl")}>
          Escolha um setor para ver ações com contexto sobre dividendos e atalhos para a calculadora do Simula Dividendos.
        </p>
      </header>

      <ul className="flex flex-col gap-4">
        {slugs.map((slug) => {
          const sector = getSector(slug);
          if (!sector) return null;
          const href = getSectorPath(slug);
          return (
            <li key={slug}>
              <Card>
                <Link href={href} className={cn(ui.subsectionTitle, "text-teal-800 hover:underline dark:text-teal-300")}>
                  {sector.name}
                </Link>
                <p className={cn(ui.body, "mt-2")}>
                  {sector.intro.slice(0, 180)}
                  {sector.intro.length > 180 ? "…" : ""}
                </p>
                <p className="mt-4">
                  <TextLink href={href} className="text-sm">
                    Ver ações do setor →
                  </TextLink>
                </p>
              </Card>
            </li>
          );
        })}
      </ul>

      <p className={ui.bodyMuted}>
        <TextLink href="/" className="text-xs font-medium">
          ← Voltar ao início
        </TextLink>
      </p>
    </main>
  );
}
