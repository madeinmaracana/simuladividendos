import type { Metadata } from "next";
import Link from "next/link";
import { DividendCalculator } from "@/components/DividendCalculator";
import { getAllMockTickers, getSectorPath } from "@/lib/stocks-data";

export const metadata: Metadata = {
  title: "Início",
  description:
    "Calculadora de dividendos para ações B3: informe ticker e cotas. Estimativas a partir do histórico, sem garantia de rendimento.",
  alternates: { canonical: "/" },
};

const SECTOR_LINKS = [
  { slug: "bancos", label: "Bancos" },
  { slug: "energia", label: "Energia elétrica" },
  { slug: "mineracao", label: "Mineração" },
  { slug: "petroleo", label: "Petróleo e gás" },
] as const;

export default function HomePage() {
  const featured = getAllMockTickers();

  return (
    <main>
      <h1 className="mb-2 text-left text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
        Simule quanto uma ação pode pagar em dividendos
      </h1>
      <p className="mb-8 text-left text-sm text-neutral-600 dark:text-neutral-400">
        Informe o ticker B3 e a quantidade de cotas. Todos os valores exibidos são{" "}
        <strong className="font-medium text-neutral-800 dark:text-neutral-200">estimativas</strong>{" "}
        derivadas do histórico — não há retorno garantido.
      </p>

      <section aria-labelledby="heading-calculadora" className="mb-12 flex flex-col gap-4">
        <h2
          id="heading-calculadora"
          className="text-left text-lg font-semibold text-neutral-800 dark:text-neutral-200"
        >
          Calculadora de dividendos
        </h2>
        <DividendCalculator defaultShares={100} />
      </section>

      <section aria-labelledby="heading-setores-home" className="mb-12 flex flex-col gap-3">
        <h2
          id="heading-setores-home"
          className="text-left text-lg font-semibold text-neutral-800 dark:text-neutral-200"
        >
          Explorar por setor
        </h2>
        <p className="text-left text-sm text-neutral-600 dark:text-neutral-400">
          Conteúdo editorial e lista de ações com links para simulação.
        </p>
        <ul className="flex flex-wrap gap-2">
          {SECTOR_LINKS.map(({ slug, label }) => (
            <li key={slug}>
              <Link
                href={getSectorPath(slug)}
                className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-teal-700 shadow-sm hover:border-teal-300 hover:bg-teal-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-teal-400 dark:hover:border-teal-700"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/setores"
              className="inline-flex rounded-full border border-dashed border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:border-teal-300 hover:text-teal-700 dark:border-neutral-600 dark:text-neutral-400"
            >
              Ver todos
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="heading-destaques-home" className="mb-12 flex flex-col gap-3">
        <h2 id="heading-destaques-home" className="text-left text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          Ações em destaque
        </h2>
        <p className="text-left text-sm text-neutral-600 dark:text-neutral-400">
          Páginas com contexto, FAQs e calculadora.
        </p>
        <ul className="flex flex-wrap gap-2">
          {featured.map((t) => (
            <li key={t}>
              <Link
                href={`/acoes/${encodeURIComponent(t)}`}
                className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:border-teal-300 hover:bg-teal-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-teal-700"
              >
                {t}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
