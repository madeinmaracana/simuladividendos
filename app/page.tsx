import type { Metadata } from "next";
import Link from "next/link";
import { DividendCalculator } from "@/components/DividendCalculator";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import type { FaqItem } from "@/lib/stocks-data";
import { getAllMockTickers, getSectorNavItems } from "@/lib/stocks-data";
import { ALL_ARTICLES } from "@/data/articles";
import { getSeoBaseUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

const faq: FaqItem[] = [
  {
    question: "O que eu posso calcular no Simula Dividendos?",
    answer:
      "Você pode simular estimativas educacionais com base em histórico de dividendos: ajuste o ticker e a quantidade de cotas para entender como o fluxo poderia se traduzir no seu caso.",
  },
  {
    question: "Os valores do simulador são garantidos?",
    answer:
      "Não. A simulação é educacional e não substitui análise. Dividendos dependem de resultados e decisões futuras, então o valor pode variar.",
  },
  {
    question: "Como explorar mais conteúdo?",
    answer:
      "Além do simulador, o site organiza páginas por ticker e por setor e mantém artigos educativos para ajudar a interpretar métricas como dividend yield.",
  },
];

const base = getSeoBaseUrl();

export const metadata: Metadata = {
  title: "Simulador de Dividendos | SimulaDividendos",
  description:
    "Simule dividendos da B3 com contexto por setor e páginas de tickers. Guias educativos para entender dividend yield e planejar renda passiva — tudo com UX rápida e limpa.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Simulador de Dividendos | SimulaDividendos",
    description:
      "Simule dividendos da B3 com contexto por setor e páginas de tickers. Guias educativos para entender dividend yield e planejar renda passiva.",
    url: base,
    locale: "pt_BR",
    type: "website",
    siteName: "Simula Dividendos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador de Dividendos | SimulaDividendos",
    description:
      "Simule dividendos da B3 com contexto por setor e páginas de tickers.",
  },
};

export default function HomePage() {
  const popularTickers = getAllMockTickers().slice(0, 6);

  return (
    <main className={ui.stackPage}>
      <header className={cn(ui.divider, "flex flex-col gap-3")}>
        <p className={ui.eyebrow}>Simula Dividendos</p>
        <h1 className={cn("text-left", ui.pageTitle)}>Simulador de dividendos da B3</h1>
        <p className={cn(ui.body, "max-w-2xl")}>
          Escolha uma ação e a quantidade de papéis para ver quanto você teria recebido no último pagamento e o que pode vir a receber no próximo, conforme os dados da fonte. Explore também as páginas por ticker e por setor.
        </p>
      </header>

      <section aria-labelledby="heading-calculadora" className={ui.stackSection}>
        <SectionHeading
          id="heading-calculadora"
          title="Simule agora"
          description="A calculadora abaixo usa dados de histórico. Os resultados são estimativas — não há retorno garantido."
        />
        <DividendCalculator showTickerPicker defaultShares={100} />
      </section>

      <section aria-labelledby="heading-como-funciona" className={ui.stackSection}>
        <SectionHeading id="heading-como-funciona" title="Como o simulador funciona" />
        <ol className={ui.listOrdered}>
          <li>O simulador carrega histórico de dividendos para o ticker selecionado.</li>
          <li>Você informa quantas cotas possui e o site calcula estimativas educacionais.</li>
          <li>Você pode explorar setores e tickers relacionados para ampliar o contexto.</li>
        </ol>
      </section>

      <section aria-labelledby="heading-beneficios" className={ui.stackSection}>
        <SectionHeading id="heading-beneficios" title="Benefícios de usar o Simula Dividendos" />
        <ul className={cn(ui.listUnordered, "ml-0 list-none space-y-3")}>
          <li className={cn(ui.body, "flex gap-2")}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" aria-hidden />
            <span>Navegação simples: encontre setores e tickers com links diretos para simular.</span>
          </li>
          <li className={cn(ui.body, "flex gap-2")}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" aria-hidden />
            <span>Conteúdo indexável: páginas por ticker e por setor ajudam a capturar intenção de busca.</span>
          </li>
          <li className={cn(ui.body, "flex gap-2")}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" aria-hidden />
            <span>Transparência: o site mantém avisos educacionais e evita promessas.</span>
          </li>
        </ul>
      </section>

      <section aria-labelledby="heading-exemplos" className={ui.stackSection}>
        <SectionHeading
          id="heading-exemplos"
          title="Exemplos rápidos"
          description="Use os links para abrir páginas com contexto e a calculadora pré-preenchida."
        />
        <ul className="flex flex-wrap gap-2">
          {popularTickers.map((t) => (
            <li key={t}>
              <Link href={`/acoes/${encodeURIComponent(t)}`} className={cn(ui.pill, "no-underline")}>
                {t}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="heading-setores-home" className={ui.stackSection}>
        <SectionHeading
          id="heading-setores-home"
          title="Explorar por setor"
          description="Setores ajudam a comparar contexto e entender riscos. Escolha um para ver ações relacionadas."
        />
        <ul className="flex flex-wrap gap-2">
          {getSectorNavItems().map(({ slug, label, href }) => (
            <li key={slug}>
              <Link href={href} className={cn(ui.pill, "no-underline")}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/setores" className={cn(ui.pillGhost, "no-underline")}>
              Ver todos →
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="heading-artigos-home" className={ui.stackSection}>
        <SectionHeading
          id="heading-artigos-home"
          title="Guias e artigos"
          description="Leituras curtas e educativas para interpretar métricas e usar simulações com mais clareza."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {ALL_ARTICLES.slice(0, 4).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <TextLink href="/artigos" className="text-sm">
          Ver todos os artigos →
        </TextLink>
      </section>

      <section aria-labelledby="heading-faq-home">
        <StockFAQ title="Perguntas frequentes" items={faq} id="heading-faq-home" />
      </section>

      <section aria-labelledby="heading-cta" className={ui.stackSection}>
        <SectionHeading
          id="heading-cta"
          title="Próximo passo"
          description="Use a página dedicada do simulador para conteúdo de apoio e links internos organizados."
        />
        <Link href="/simulador" className={cn(ui.ctaSecondary, "w-full sm:w-fit no-underline")}>
          Abrir simulador dedicado →
        </Link>
      </section>
    </main>
  );
}
