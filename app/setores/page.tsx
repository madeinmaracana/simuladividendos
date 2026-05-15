import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getAllSectorSlugs, getSector, getSectorPath } from "@/lib/stocks-data";
import { getSeoBaseUrl } from "@/lib/site";

const SECTOR_ICONS: Record<string, string> = {
  bancos:               "account_balance",
  consumo:              "shopping_bag",
  energia:              "bolt",
  mineracao:            "diamond",
  industria:            "factory",
  petroleo:             "local_gas_station",
  servicos_financeiros: "payments",
};

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
    <main className="flex flex-col gap-0">
      <SiteHeader
        title="Setores na B3"
        description="Escolha um setor para ver ações com contexto sobre dividendos e atalhos para a calculadora do Simula Dividendos."
      />
      <div className="w-full bg-[#F3F4F6]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-[60px] px-[var(--page-gutter)] py-16 lg:py-24">

          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[24px] font-medium leading-tight text-[#111827]">Todos os setores</h2>
              <p className="text-[16px] font-normal text-[#808080]">
                Descubra ações por setor da economia
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {slugs.map((slug) => {
                const sector = getSector(slug);
                if (!sector) return null;
                const href = getSectorPath(slug);
                const iconName = SECTOR_ICONS[slug] ?? "apartment";
                return (
                  <li key={slug}>
                    <Link
                      href={href}
                      className="flex flex-col gap-4 rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-5 no-underline transition hover:border-[rgba(0,0,0,0.15)] hover:shadow-sm"
                    >
                      <span
                        className="material-symbols-outlined leading-none text-[#374151]"
                        style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
                      >
                        {iconName}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-[#111827]">{sector.name}</span>
                        <p className="line-clamp-2 text-[13px] font-medium leading-relaxed text-[#6B7280]">
                          {sector.intro}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-[13px] font-medium text-[#111827]">
                        Ver ações
                        <span className="material-symbols-outlined leading-none" style={{ fontSize: 14 }}>
                          arrow_forward
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
