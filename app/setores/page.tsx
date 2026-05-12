import type { Metadata } from "next";
import Link from "next/link";
import { getAllSectorSlugs, getSector, getSectorPath } from "@/lib/stocks-data";
import { Icon } from "@/components/ui/Icon";
import { getSeoBaseUrl } from "@/lib/site";

const base = getSeoBaseUrl();

export const metadata: Metadata = {
  title: "Setores na B3 | Simula Dividendos",
  description:
    "Explore ações da B3 agrupadas por setor — bancos, energia, mineração e petróleo — com links para simulação de dividendos.",
  alternates: { canonical: "/setores" },
  metadataBase: new URL(base),
  openGraph: {
    title: "Setores na B3 | Simula Dividendos",
    description: "Explore ações da B3 agrupadas por setor — com links para simulação de dividendos.",
    url: `${base}/setores`,
    locale: "pt_BR",
    type: "website",
    siteName: "Simula Dividendos",
  },
};

/** Cor de fundo por setor */
const SECTOR_COLORS: Record<string, string> = {
  bancos:               "#4CAF50",
  consumo:              "#2196F3",
  energia:              "#FF9800",
  mineracao:            "#E91E63",
  industria:            "#F5C518",
  petroleo:             "#9E9E9E",
  servicos_financeiros: "#9C27B0",
};

export default function SetoresIndexPage() {
  const slugs = getAllSectorSlugs();

  return (
    <main className="w-full py-16 lg:py-24">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">Ações</p>
          <h1 className="text-[53px] font-medium leading-[63px] text-white">Setores na B3</h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            Escolha um setor para ver ações com contexto sobre dividendos e atalhos para a calculadora do Simula Dividendos.
          </p>
        </header>

        {/* Lista */}
        <ul className="flex flex-col gap-3">
          {slugs.map((slug) => {
            const sector = getSector(slug);
            if (!sector) return null;
            const href = getSectorPath(slug);
            const bg = SECTOR_COLORS[slug] ?? "#333333";
            return (
              <li key={slug}>
                <Link
                  href={href}
                  className="flex items-center gap-4 rounded-[16px] p-4 no-underline transition hover:opacity-90"
                  style={{ backgroundColor: bg }}
                >
                  {/* Icon */}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/20">
                    <Icon name={sector.icon} size="sm" className="text-black" />
                  </span>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium text-black">{sector.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-[13px] font-medium text-black/70">
                      {sector.intro.slice(0, 120)}{sector.intro.length > 120 ? "…" : ""}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                    <span
                      className="material-symbols-outlined leading-none text-black"
                      style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
                    >
                      arrow_forward
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

      </div>
    </main>
  );
}
