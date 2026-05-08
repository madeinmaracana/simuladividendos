/**
 * generate-tickers.ts
 *
 * Busca todos os tickers de ações na brapi e gera entradas templadas
 * para `data/tickers.ts`, pulando os que já existem no registry.
 *
 * Uso:
 *   npx tsx scripts/generate-tickers.ts
 *   npx tsx scripts/generate-tickers.ts --dry-run   (só exibe, não salva)
 *   npx tsx scripts/generate-tickers.ts --limit=50  (limita quantidade)
 *
 * O script APPENDA os novos tickers ao final de data/tickers.ts.
 * Revise o arquivo gerado antes de commitar.
 */

import fs from "fs";
import path from "path";
import { TICKER_DEFINITIONS } from "../data/tickers";
import type { SectorSlug } from "../data/stocks/types";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BRAPI_BASE = "https://brapi.dev/api";
const TICKERS_FILE = path.resolve(__dirname, "../data/tickers.ts");
const DRY_RUN = process.argv.includes("--dry-run");
const LIMIT = (() => {
  const arg = process.argv.find((a) => a.startsWith("--limit="));
  return arg ? parseInt(arg.split("=")[1]!, 10) : 200;
})();

const BRAPI_TOKEN = process.env.BRAPI_TOKEN ?? "";

// ---------------------------------------------------------------------------
// Mapeamento de setor por heurística de nome / sufixo
// Você pode refinar essa lógica conforme necessário.
// ---------------------------------------------------------------------------

function inferSector(name: string, ticker: string): SectorSlug {
  const n = name.toLowerCase();
  const t = ticker.toLowerCase();

  if (/banco|itau|bradesco|santander|btg|abc brasil|bmg|pine|inter/.test(n)) return "bancos";
  if (/energia|eletric|cemig|copel|engie|cpfl|taesa|aes|neoenergia|equatorial|cteep/.test(n)) return "energia";
  if (/petro|óleo|gas|gás|3r petroleum|prio|cosan|ultrapar|vibra|raízen/.test(n)) return "petroleo";
  if (/vale|minerva|csa|gerdau|usiminas|csn|metalurg|siderurg/.test(n)) return "mineracao";
  if (/ambev|jbs|marfrig|minerva|brf|camil|m dias|bom gosto|forno de minas|grupo mateus|sendas|assaí|carrefour|pão de açúcar|atacadão|lojas|magazine|renner|arezzo|grupo sbf|vivara/.test(n)) return "consumo";
  if (/b3|xp|ágora|genial|modal|guide|órama|rico|clear|avenue|toro|nubank|nu holdings|pagseguro|pagbank|cielo|getnet|stone|totvs|linx|rede|sitef/.test(n)) return "servicos_financeiros";
  if (/weg|embraer|randon|marcopolo|iochpe|mills|fras-le|panatlantica|ferbasa|braskem|unipar|innova|tegma|tpi|log-in|santos brasil|wilson sons|hidrovias/.test(n)) return "industria";

  // fallback por sufixo do ticker
  if (t.endsWith("3") || t.endsWith("4")) return "bancos"; // ON/PN — chute conservador
  return "consumo";
}

// ---------------------------------------------------------------------------
// Templates editoriais por setor
// ---------------------------------------------------------------------------

type SectorTemplates = {
  shortDescription: (name: string, ticker: string) => string;
  historySummary: (name: string, ticker: string) => string;
  worthFollowing: (name: string, ticker: string) => string;
  listDescription: (name: string, ticker: string) => string;
  paymentFrequency: string;
  faqs: (name: string, ticker: string) => Array<{ question: string; answer: string }>;
};

const SECTOR_TEMPLATES: Record<SectorSlug, SectorTemplates> = {
  bancos: {
    shortDescription: (name, ticker) =>
      `${name} (${ticker}) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ${name} aparece em carteiras voltadas a renda passiva no segmento financeiro.`,
    historySummary: (_, ticker) =>
      `O histórico de proventos do ${ticker} acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.`,
    worthFollowing: (name, ticker) =>
      `Acompanhe ${ticker} se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.`,
    listDescription: (name) => `${name} — banco listado na B3 com histórico de distribuição de proventos.`,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    faqs: (_, ticker) => [
      { question: `${ticker} paga dividendos mensais?`, answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: `Informe o ticker ${ticker} e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos.` },
    ],
  },
  energia: {
    shortDescription: (name, ticker) =>
      `${name} (${ticker}) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.`,
    historySummary: (_, ticker) =>
      `O histórico de proventos do ${ticker} reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.`,
    worthFollowing: (name, ticker) =>
      `${ticker} pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.`,
    listDescription: (name) => `${name} — empresa do setor elétrico com histórico de proventos.`,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    faqs: (_, ticker) => [
      { question: `${ticker} é uma ação defensiva?`, answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: `Use a calculadora desta página com o ticker ${ticker} e sua quantidade de ações.` },
    ],
  },
  mineracao: {
    shortDescription: (name, ticker) =>
      `${name} (${ticker}) está no setor de mineração, exposto a ciclos de commodities e demanda global. O dividend yield pode ser elevado em anos de preços altos e recuar em viradas de ciclo.`,
    historySummary: (_, ticker) =>
      `O histórico de proventos do ${ticker} oscila com o preço das commodities. Anos de superciclo costumam trazer distribuições extraordinárias; quedas de preço reduzem o payout. Use o simulador para explorar o passado.`,
    worthFollowing: (name, ticker) =>
      `Acompanhe ${ticker} se você aceita a ciclicidade do setor de mineração em troca de potencial de dividendos altos em momentos favoráveis. Diversificação e gestão de risco são fundamentais neste setor.`,
    listDescription: (name) => `${name} — mineração com exposição a commodities e histórico de dividendos cíclicos.`,
    paymentFrequency: "Dividendos variáveis conforme resultado e ciclo de commodities.",
    faqs: (_, ticker) => [
      { question: `Por que o yield do ${ticker} muda tanto?`, answer: "O preço da ação e os pagamentos acompanham o ciclo de commodities. Um yield alto pode refletir queda do papel ou distribuição extraordinária." },
      { question: "Onde vejo o histórico oficial?", answer: "Consulte o RI da companhia e comunicados à CVM. O simulador desta página usa dados via API como referência educacional." },
    ],
  },
  petroleo: {
    shortDescription: (name, ticker) =>
      `${name} (${ticker}) atua no setor de petróleo e gás, com resultado ligado ao preço do barril, produção e câmbio. É uma das indústrias com maior potencial de dividendos em momentos de preço favorável.`,
    historySummary: (_, ticker) =>
      `O histórico de proventos do ${ticker} varia com o preço do petróleo e decisões estratégicas da empresa. Simule com base no passado disponível e acompanhe comunicados para entender o próximo ciclo.`,
    worthFollowing: (name, ticker) =>
      `${ticker} pode ser relevante para quem busca exposição ao setor de energia com potencial de dividendos expressivos. Considere também volatilidade de commodities e risco político.`,
    listDescription: (name) => `${name} — petróleo e gás com dividendos ligados ao ciclo de commodities.`,
    paymentFrequency: "Distribuição vinculada ao resultado e à política de capital da companhia.",
    faqs: (_, ticker) => [
      { question: `${ticker} paga dividendos regulares?`, answer: "A regularidade depende do preço do petróleo e da política da empresa. Simulações passadas não garantem o futuro." },
      { question: "Como estimar meus proventos?", answer: `Informe ${ticker} e sua quantidade de ações no simulador desta página para uma estimativa educacional.` },
    ],
  },
  consumo: {
    shortDescription: (name, ticker) =>
      `${name} (${ticker}) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.`,
    historySummary: (_, ticker) =>
      `O histórico de dividendos do ${ticker} reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.`,
    worthFollowing: (name, ticker) =>
      `Acompanhe ${ticker} se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.`,
    listDescription: (name) => `${name} — consumo com histórico de proventos ligado ao mercado interno.`,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    faqs: (_, ticker) => [
      { question: `${ticker} é uma ação defensiva?`, answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: `Use o ticker ${ticker} na calculadora desta página para estimativas com base em dados históricos disponíveis.` },
    ],
  },
  industria: {
    shortDescription: (name, ticker) =>
      `${name} (${ticker}) é uma empresa industrial listada na B3, com exposição a capacidade de produção, exportação e custos de insumos. O setor distribui dividendos conforme resultado e ciclo de investimentos.`,
    historySummary: (_, ticker) =>
      `O histórico de proventos do ${ticker} alterna períodos de payout maior com ciclos de CAPEX intenso. Analise o fluxo de caixa livre e a alavancagem para entender a sustentabilidade dos dividendos.`,
    worthFollowing: (name, ticker) =>
      `${ticker} pode interessar a quem busca diversificação industrial com potencial de proventos em fases de geração de caixa. Volatilidade cambial e de insumos são fatores de risco relevantes.`,
    listDescription: (name) => `${name} — indústria com histórico de proventos ligado ao ciclo produtivo.`,
    paymentFrequency: "Dividendos conforme resultado operacional e política de capital da empresa.",
    faqs: (_, ticker) => [
      { question: `${ticker} paga dividendos frequentes?`, answer: "A frequência varia com o ciclo da companhia. Consulte RI e comunicados para o calendário atualizado." },
      { question: "Como simular meus proventos?", answer: `Informe ${ticker} e a quantidade de ações na calculadora desta página para uma estimativa educacional.` },
    ],
  },
  servicos_financeiros: {
    shortDescription: (name, ticker) =>
      `${name} (${ticker}) atua em serviços financeiros — como bolsa, clearing, meios de pagamento ou fintechs listadas na B3. O resultado está ligado a volume de transações, tecnologia e regulação do setor.`,
    historySummary: (_, ticker) =>
      `O histórico de proventos do ${ticker} acompanha a evolução do mercado de capitais e de pagamentos no Brasil. Use o simulador para explorar o passado e combine com análise de crescimento e margem.`,
    worthFollowing: (name, ticker) =>
      `Acompanhe ${ticker} se você quer exposição a infraestrutura financeira e aceita risco de regulação e ciclo de mercado. Proventos tendem a acompanhar crescimento de volume e lucratividade.`,
    listDescription: (name) => `${name} — serviços financeiros com histórico de distribuição ligado ao mercado de capitais.`,
    paymentFrequency: "Dividendos e JCP conforme política da companhia.",
    faqs: (_, ticker) => [
      { question: `${ticker} é equivalente a uma ação de banco?`, answer: "Não. Serviços financeiros têm drivers diferentes de bancos tradicionais — foco em transações e tecnologia, não crédito." },
      { question: "Como ver histórico de proventos?", answer: `Use o ticker ${ticker} nesta página para estimativas, e consulte o RI para dados oficiais.` },
    ],
  },
};

// ---------------------------------------------------------------------------
// Brapi: buscar lista de ações
// ---------------------------------------------------------------------------

interface BrapiListItem {
  stock: string;
  name: string;
  logo?: string;
  sector?: string;
  type?: string;
}

async function fetchAllStocks(): Promise<BrapiListItem[]> {
  const results: BrapiListItem[] = [];
  let page = 1;
  const pageSize = 100;

  console.log("⏳ Buscando tickers na brapi...");

  while (results.length < LIMIT) {
    const url = new URL(`${BRAPI_BASE}/quote/list`);
    url.searchParams.set("limit", String(pageSize));
    url.searchParams.set("page", String(page));
    url.searchParams.set("type", "stock");
    if (BRAPI_TOKEN) url.searchParams.set("token", BRAPI_TOKEN);

    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`Erro brapi (${res.status}):`, await res.text());
      break;
    }

    const json = (await res.json()) as { stocks?: BrapiListItem[] };
    const batch = json.stocks ?? [];
    if (batch.length === 0) break;

    results.push(...batch);
    console.log(`  página ${page}: ${batch.length} tickers (total: ${results.length})`);

    if (batch.length < pageSize) break; // última página
    page++;
  }

  return results.slice(0, LIMIT);
}

// ---------------------------------------------------------------------------
// Gera entrada TypeScript para um ticker
// ---------------------------------------------------------------------------

function generateEntry(item: BrapiListItem): string {
  const ticker = item.stock.toUpperCase();
  const name = item.name ?? ticker;
  const sector = inferSector(name, ticker);
  const tpl = SECTOR_TEMPLATES[sector];

  const faqsStr = tpl
    .faqs(name, ticker)
    .map(
      (f) =>
        `      { question: ${JSON.stringify(f.question)}, answer: ${JSON.stringify(f.answer)} }`
    )
    .join(",\n");

  return `  {
    ticker: ${JSON.stringify(ticker)},
    companyName: ${JSON.stringify(name)},
    sectorSlug: ${JSON.stringify(sector)},
    shortDescription: ${JSON.stringify(tpl.shortDescription(name, ticker))},
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: ${JSON.stringify(tpl.paymentFrequency)},
    historySummary: ${JSON.stringify(tpl.historySummary(name, ticker))},
    worthFollowing: ${JSON.stringify(tpl.worthFollowing(name, ticker))},
    listDescription: ${JSON.stringify(tpl.listDescription(name, ticker))},
    faqs: [
${faqsStr}
    ],
  },`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const existingTickers = new Set(
    TICKER_DEFINITIONS.map((d) => d.ticker.toUpperCase())
  );
  console.log(`✅ ${existingTickers.size} tickers já no registry.`);

  const allStocks = await fetchAllStocks();
  console.log(`📦 ${allStocks.length} tickers obtidos da brapi.`);

  const newStocks = allStocks.filter(
    (s) => s.stock && !existingTickers.has(s.stock.toUpperCase())
  );
  console.log(`🆕 ${newStocks.length} novos tickers para gerar.`);

  if (newStocks.length === 0) {
    console.log("Nenhum ticker novo. Saindo.");
    return;
  }

  const entries = newStocks.map(generateEntry).join("\n\n");
  const block = `\n\n  // --- AUTO-GERADO em ${new Date().toISOString().slice(0, 10)} (${newStocks.length} tickers) ---\n${entries}`;

  if (DRY_RUN) {
    console.log("\n--- DRY RUN (não salvo) ---\n");
    console.log(block);
    return;
  }

  // Insere antes do fechamento do array `];`
  const original = fs.readFileSync(TICKERS_FILE, "utf-8");
  const updated = original.replace(/\n\];\s*$/, `${block}\n];\n`);
  fs.writeFileSync(TICKERS_FILE, updated, "utf-8");

  console.log(`\n✅ ${newStocks.length} tickers adicionados em data/tickers.ts`);
  console.log("📝 Revise o arquivo antes de commitar. Você pode ajustar setores e textos manualmente.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
