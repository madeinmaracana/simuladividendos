import type { Metadata } from "next";
import { DividendCalculator } from "@/components/DividendCalculator";

export const metadata: Metadata = {
  title: "Início",
  description:
    "Calculadora de dividendos para ações B3: informe ticker e cotas. Estimativas a partir do histórico, sem garantia de rendimento.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-50">
        Simule quanto uma ação pode pagar em dividendos
      </h1>
      <p className="mb-10 text-center text-sm text-neutral-600 dark:text-neutral-400">
        Informe o ticker B3 e a quantidade de cotas. Todos os valores exibidos são{" "}
        <strong className="font-medium text-neutral-800 dark:text-neutral-200">estimativas</strong>{" "}
        derivadas do histórico — não há retorno garantido.
      </p>

      <section aria-labelledby="heading-calculadora" className="flex flex-col gap-4">
        <h2
          id="heading-calculadora"
          className="text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200"
        >
          Calculadora de dividendos
        </h2>
        <DividendCalculator defaultShares={100} />
      </section>
    </main>
  );
}
