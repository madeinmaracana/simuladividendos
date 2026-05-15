import type { Metadata } from "next";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbSchema, buildFaqPageSchema, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES } from "@/lib/seo/constants";
import { CalculadoraClient } from "./CalculadoraClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Calculadora de renda passiva com dividendos | Simula Dividendos",
  description:
    "Calcule quanto precisa investir para receber dividendos mensais. Informe a renda desejada e o dividend yield esperado — a calculadora mostra o patrimônio necessário e uma tabela progressiva.",
  canonicalPath: "/calculadora-renda-passiva",
});

const PAGE_TITLE = "Calculadora de renda passiva com dividendos";
const PAGE_DESCRIPTION =
  "Informe quanto quer receber por mês e o dividend yield esperado. A calculadora mostra o patrimônio necessário e como diferentes valores de investimento se traduzem em renda.";

const FAQS = [
  {
    question: "Quanto preciso investir para receber R$1.000 por mês em dividendos?",
    answer:
      "Depende do dividend yield da sua carteira. Com yield anual de 8%, você precisa de aproximadamente R$150.000 investidos. Com 6%, o valor sobe para R$200.000. Use a calculadora acima para simular com qualquer valor e yield.",
  },
  {
    question: "Quanto preciso investir para receber R$3.000 por mês em dividendos?",
    answer:
      "Com yield anual de 8%, seriam necessários cerca de R$450.000. Com 10%, aproximadamente R$360.000. O yield real varia conforme os ativos escolhidos e o momento de mercado.",
  },
  {
    question: "Qual dividend yield considerar no cálculo?",
    answer:
      "Use um yield conservador entre 5% e 8% para uma estimativa mais realista. Yields acima de 12% ao ano podem indicar risco maior ou distribuições não sustentáveis. O Simula Dividendos mostra o histórico real de cada ativo.",
  },
  {
    question: "Dividendos são garantidos?",
    answer:
      "Não. Empresas e FIIs podem reduzir ou suspender distribuições dependendo do resultado. Esta calculadora é educacional e usa estimativas — não é recomendação de investimento.",
  },
  {
    question: "FIIs ou ações: qual paga mais dividendos?",
    answer:
      "FIIs tendem a ter yields mais altos e pagar mensalmente, enquanto ações costumam pagar trimestral ou semestral. A isenção de IR nos rendimentos de FIIs para pessoa física (quando atendidos os requisitos legais) também é um diferencial.",
  },
];

export default function CalculadoraRendaPassivaPage() {
  return (
    <main className="w-full py-16 lg:py-24">
      <JsonLd
        data={[
          buildWebPageSchema({ name: `${PAGE_TITLE} | ${SITE_NAME}`, description: PAGE_DESCRIPTION, path: "/calculadora-renda-passiva" }),
          buildBreadcrumbSchema(
            [{ label: "Início", href: ROUTES.home }, { label: PAGE_TITLE }],
            "/calculadora-renda-passiva"
          ),
          buildFaqPageSchema(FAQS),
        ]}
      />
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">Calculadora</p>
          <h1 className="max-w-[26ch] text-[53px] font-medium leading-[63px] text-white">
            {PAGE_TITLE}
          </h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            {PAGE_DESCRIPTION}
          </p>
        </header>

        {/* Calculadora interativa */}
        <CalculadoraClient />

        {/* Como funciona */}
        <section className="flex flex-col gap-4">
          <h2 className="text-[24px] font-medium leading-tight text-white">Como funciona o cálculo</h2>
          <p className="text-[13px] font-medium leading-relaxed text-[#808080]">
            O cálculo é direto: para receber uma renda mensal R, você precisa de um patrimônio P tal que a renda anual (R × 12) seja igual a P × yield anual. Reorganizando: <strong className="text-white">P = (R × 12) / yield</strong>.
          </p>
          <p className="text-[13px] font-medium leading-relaxed text-[#808080]">
            Exemplo: para R$1.000/mês com yield de 8% ao ano → P = (1.000 × 12) / 0,08 = R$150.000.
          </p>
          <p className="text-[13px] font-medium leading-relaxed text-[#808080]">
            Na prática, o yield real varia conforme os ativos, o preço de compra e o momento do mercado. Use o simulador de cada ativo para verificar o histórico real de proventos pagos.
          </p>
        </section>

        {/* FAQ */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[24px] font-medium leading-tight text-white">Perguntas frequentes</h2>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="flex flex-col gap-2 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-5">
                <h3 className="text-[15px] font-medium text-white">{faq.question}</h3>
                <p className="text-[13px] font-medium leading-relaxed text-[#808080]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Links */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[24px] font-medium leading-tight text-white">Próximos passos</h2>
          <div className="flex flex-wrap gap-2">
            <a href="/melhores-acoes-dividendos" className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Melhores ações de dividendos
            </a>
            <a href="/melhores-fiis" className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Melhores FIIs
            </a>
            <a href={ROUTES.comparar} className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Comparar ativos
            </a>
            <a href={ROUTES.artigos} className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Artigos sobre renda passiva
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
