import type { Metadata } from "next";
import Link from "next/link";
import { DividendCalculator } from "@/components/DividendCalculator";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import type { FaqItem } from "@/lib/stocks-data";
import { getAllMockTickers, getSectorNavItems } from "@/lib/stocks-data";
import { getArticleBySlug } from "@/data/articles";
import { getSeoBaseUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

const base = getSeoBaseUrl();

export const metadata: Metadata = {
  title: "Simulador de Dividendos | SimulaDividendos",
  description:
    "Simule dividendos da B3: informe ticker e cotas para gerar estimativas educacionais com base em histórico. Aprenda como interpretar os resultados e explorar setores.",
  alternates: { canonical: "/simulador" },
  openGraph: {
    title: "Simulador de Dividendos | SimulaDividendos",
    description:
      "Simule dividendos da B3: informe ticker e cotas para gerar estimativas educacionais com base em histórico.",
    url: `${base}/simulador`,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador de Dividendos | SimulaDividendos",
    description:
      "Simule dividendos da B3: informe ticker e cotas para gerar estimativas educacionais com base em histórico.",
  },
};

const faq: FaqItem[] = [
  {
    question: "O simulador é uma previsão do futuro?",
    answer:
      "Não. Ele usa dados disponíveis de histórico para gerar estimativas educacionais. Dividendos dependem de resultados e decisões futuras, então o valor pode mudar.",
  },
  {
    question: "O que eu preciso para fazer a simulação?",
    answer:
      "Informe o ticker B3 e a quantidade de ações. Depois, clique em “Simular dividendos”.",
  },
  {
    question: "Como interpretar dividend yield e payout na prática?",
    answer:
      "Use essas métricas como contexto. Um yield maior pode refletir queda do preço ou um período excepcional. O ideal é olhar consistência, histórico e o setor do ativo.",
  },
];

export default function SimuladorPage() {
  const tickers = getAllMockTickers().slice(0, 5);
  const articleYield = getArticleBySlug("o-que-e-dividend-yield");
  const articleRenda = getArticleBySlug("como-calcular-renda-passiva");

  return (
    <main className={ui.stackPage}>
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Simulador", href: undefined },
        ]}
      />

      <header className={cn(ui.divider, "flex flex-col gap-3")}>
        <p className={ui.eyebrow}>Ferramenta</p>
        <h1 className={cn("text-left", ui.pageTitle)}>Simulador de dividendos da B3</h1>
        <p className={cn(ui.body, "max-w-2xl")}>
          Use o Simula Dividendos para estimar como o histórico de dividendos pode se traduzir em valores por cota para o seu número de ações. A simulação é educacional e não substitui análise ou orientação profissional.
        </p>
      </header>

      <section aria-labelledby="heading-comecar" className={ui.stackSection}>
        <SectionHeading
          id="heading-comecar"
          title="Comece agora"
          description="Informe ticker e cotas. Os números exibidos são estimativas derivadas do histórico."
        />
        <DividendCalculator showTickerPicker defaultShares={100} />
      </section>

      <section aria-labelledby="heading-como-usar" className={ui.stackSection}>
        <SectionHeading id="heading-como-usar" title="Como usar o simulador" />
        <ol className={ui.listOrdered}>
          <li>Informe o ticker da ação (ex.: PETR4) e a quantidade de ações.</li>
          <li>Clique em “Simular dividendos” para carregar os proventos da API.</li>
          <li>Confira o último pagamento e o próximo, quando houver data futura na lista.</li>
        </ol>
        <p className={ui.body}>
          Se preferir navegar por conteúdo, use links para setores e guias em artigos.
        </p>
      </section>

      <section aria-labelledby="heading-exemplos" className={ui.stackSection}>
        <SectionHeading
          id="heading-exemplos"
          title="Ações populares para testar"
          description="Abra a página do ticker para contexto editorial e a calculadora pré-preenchida."
        />
        <ul className="flex flex-wrap gap-2">
          {tickers.map((t) => (
            <li key={t}>
              <Link href={`/acoes/${encodeURIComponent(t)}`} className={cn(ui.pill, "no-underline")}>
                {t}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="heading-setores" className={ui.stackSection}>
        <SectionHeading id="heading-setores" title="Explorar por setor" />
        <ul className="flex flex-wrap gap-2">
          {getSectorNavItems().map(({ slug, label, href }) => (
            <li key={slug}>
              <Link href={href} className={cn(ui.pill, "no-underline")}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="heading-faq-simulador">
        <StockFAQ title="Perguntas frequentes" items={faq} id="heading-faq-simulador" />
      </section>

      <section aria-labelledby="heading-guia" className={ui.stackSection}>
        <SectionHeading id="heading-guia" title="Leituras recomendadas" />
        <ul className="flex flex-col gap-2">
          {articleYield ? (
            <li>
              <TextLink href={`/artigos/${articleYield.slug}`} className="text-sm">
                {articleYield.title}
              </TextLink>
            </li>
          ) : null}
          {articleRenda ? (
            <li>
              <TextLink href={`/artigos/${articleRenda.slug}`} className="text-sm">
                {articleRenda.title}
              </TextLink>
            </li>
          ) : null}
          <li>
            <TextLink href="/artigos" className="text-sm">
              Ver todos os artigos →
            </TextLink>
          </li>
        </ul>
      </section>
    </main>
  );
}
