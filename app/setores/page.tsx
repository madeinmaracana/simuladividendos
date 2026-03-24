import type { Metadata } from "next";
import Link from "next/link";
import { getAllSectorSlugs, getSector, getSectorPath } from "@/lib/stocks-data";

export const metadata: Metadata = {
  title: "Setores",
  description:
    "Explore ações da B3 agrupadas por setor — bancos, energia, mineração e petróleo — com links para simulação de dividendos.",
  alternates: { canonical: "/setores" },
};

export default function SetoresIndexPage() {
  const slugs = getAllSectorSlugs();

  return (
    <main>
      <header className="mb-10 flex flex-col gap-3 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
          Navegação
        </p>
        <h1 className="text-left text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
          Setores na B3
        </h1>
        <p className="max-w-2xl text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Escolha um setor para ver ações com contexto sobre dividendos e atalhos para a calculadora do Simula Dividendos.
        </p>
      </header>

      <ul className="flex flex-col gap-4">
        {slugs.map((slug) => {
          const sector = getSector(slug);
          if (!sector) return null;
          return (
            <li
              key={slug}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <Link
                href={getSectorPath(slug)}
                className="text-lg font-semibold text-teal-700 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
              >
                {sector.name}
              </Link>
              <p className="mt-2 text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {sector.intro.slice(0, 180)}
                {sector.intro.length > 180 ? "…" : ""}
              </p>
              <p className="mt-3 text-left text-xs">
                <Link
                  href={getSectorPath(slug)}
                  className="font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-400"
                >
                  Ver ações do setor →
                </Link>
              </p>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-left text-sm text-neutral-500 dark:text-neutral-500">
        <Link href="/" className="text-teal-700 hover:underline dark:text-teal-400">
          ← Voltar ao início
        </Link>
      </p>
    </main>
  );
}
