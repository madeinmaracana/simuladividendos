import type { FiiSeoRecord } from "@/data/fiis";

export function generateFiiEditorialParagraphs(
  symbol: string,
  fundName: string,
  mock: FiiSeoRecord | null
): string[] {
  const p1 = `${fundName} (${symbol}) é um fundo imobiliário listado na B3. Os números desta página partem do histórico de distribuições disponível na integração de dados — não substituem regulamento, fatos relevantes ou canal do administrador.`;

  const p2 = mock?.paymentFrequency?.trim()
    ? mock.paymentFrequency
    : `A frequência e o valor dos rendimentos dependem do regulamento, da carteira e do resultado do fundo.`;

  const p3 = `A “renda mensal” exibida é uma média de referência (total distribuído no período considerado ÷ 12), aplicada à sua quantidade de cotas. Meses sem registro na base reduzem a média; não há garantia de repetição.`;

  return [p1, p2, p3];
}
