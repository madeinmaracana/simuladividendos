import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MOCK_FIIS, getFiiPath } from "@/data/fiis";
import { buildFiisIndexMetadata, breadcrumbsSimple } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

export const metadata: Metadata = buildFiisIndexMetadata();

export default function FiisIndexPage() {
  return (
    <main className="flex flex-col gap-0">
      <SiteHeader />
      <div className={`${ui.stackPage} px-[var(--page-gutter)] py-8`}>
      <Breadcrumbs
        items={breadcrumbsSimple([
          { label: "Início", href: "/" },
          { label: "FIIs", href: undefined },
        ])}
      />

      <header className={cn(ui.divider, "flex flex-col gap-3")}>
        <p className={ui.eyebrow}>Fundos imobiliários</p>
        <h1 className={cn("text-left", ui.pageTitle)}>Simular rendimentos de FIIs</h1>
        <p className={cn(ui.body, "max-w-2xl")}>
          Escolha um fundo para ver renda mensal de referência, último pagamento e histórico. Mesma lógica educacional
          do simulador de ações — sem recomendação de investimento.
        </p>
      </header>

      <section aria-labelledby="heading-lista-fiis" className={ui.stackSection}>
        <h2 id="heading-lista-fiis" className={ui.sectionTitle}>
          FIIs no site
        </h2>
        <ul className="flex flex-col gap-4">
          {MOCK_FIIS.map((f) => (
            <li key={f.ticker}>
              <Link
                href={getFiiPath(f.ticker)}
                className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-teal-500/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="font-semibold text-teal-800 dark:text-teal-300">{f.ticker}</span>
                  <span className="mx-2 text-neutral-300 dark:text-neutral-600" aria-hidden>
                    ·
                  </span>
                  <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{f.fundName}</span>
                  <p className={cn(ui.bodyMuted, "mt-1 max-w-prose")}>{f.shortDescription.slice(0, 140)}…</p>
                </div>
                <span className="mt-2 text-sm font-medium text-teal-700 sm:mt-0 dark:text-teal-400">
                  Abrir simulação →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </main>
  );
}
