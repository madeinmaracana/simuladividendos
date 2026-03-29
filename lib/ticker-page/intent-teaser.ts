import { calculateDividends } from "@/lib/calculations";
import { formatBRL } from "@/lib/format";
import type { DividendEntry } from "@/lib/types";
import { getLastPerShareSnapshot } from "./derive";

/** Trecho de texto com opcional destaque em negrito (valores e ticker). */
export type IntentTeaserSegment = { text: string; bold?: boolean };

const MIN_EVENTS_12M_FOR_MONTHLY_AVG = 2;

export type SearchIntentTeaserInput = {
  symbol: string;
  currency: string;
  dividends: DividendEntry[];
  /** Cotas no exemplo (URL `quanto-rende-N-cotas` ou 100). */
  simulationShares: number;
  assetKind: "fii" | "stock";
  /**
   * Copy alinhada à landing `/acoes/[ticker]-paga-quanto` (ações + “simulador abaixo”).
   * Demais ações mantêm texto padrão com “cotas”.
   */
  stockCopyProfile?: "default" | "paga-quanto";
};

/**
 * Três linhas curtas para SEO/intenção de busca: valor por cota/ação, exemplo com N cotas, CTA do simulador.
 * Usa média mensal (últimos 12 meses na fonte) quando há histórico suficiente; senão o último pagamento.
 */
export function buildSearchIntentTeaserLines(input: SearchIntentTeaserInput): [
  IntentTeaserSegment[],
  IntentTeaserSegment[],
  IntentTeaserSegment[],
] {
  const { symbol, currency, dividends, simulationShares, assetKind, stockCopyProfile = "default" } = input;
  const shareUnit = assetKind === "fii" ? "cota" : "ação";
  const usePagaQuantoAcoesCopy =
    assetKind === "stock" && stockCopyProfile === "paga-quanto";
  const pluralShares = usePagaQuantoAcoesCopy ? "ações" : "cotas";
  const n = Math.max(1, Math.round(simulationShares));

  const calc = dividends.length ? calculateDividends(dividends, 1) : null;
  const last = dividends.length ? getLastPerShareSnapshot(dividends) : null;

  const canUseMonthlyAvg =
    calc != null &&
    calc.dividendsLast12m.length >= MIN_EVENTS_12M_FOR_MONTHLY_AVG &&
    calc.monthlyAvgEstimate > 0 &&
    Number.isFinite(calc.monthlyAvgEstimate);

  if (canUseMonthlyAvg && calc) {
    const perMo = calc.monthlyAvgEstimate;
    const total = perMo * n;
    const brPer = formatBRL(perMo, currency);
    const brTot = formatBRL(total, currency);

    const line1: IntentTeaserSegment[] = usePagaQuantoAcoesCopy
      ? [
          { text: symbol, bold: true },
          { text: " paga cerca de ", bold: false },
          { text: brPer, bold: true },
          {
            text: " por ação por mês, com base nos últimos pagamentos disponíveis na fonte.",
            bold: false,
          },
        ]
      : [
          { text: symbol, bold: true },
          {
            text: ` paga em média cerca de `,
            bold: false,
          },
          { text: brPer, bold: true },
          { text: ` por ${shareUnit} por mês, com base nos últimos pagamentos disponíveis na fonte.`, bold: false },
        ];

    const line2: IntentTeaserSegment[] = usePagaQuantoAcoesCopy
      ? [
          { text: "Se você tivesse ", bold: false },
          { text: String(n), bold: true },
          { text: ` ${pluralShares}, receberia aproximadamente `, bold: false },
          { text: brTot, bold: true },
          { text: " por mês.", bold: false },
        ]
      : [
          { text: "Se você tivesse ", bold: false },
          { text: String(n), bold: true },
          { text: ` ${pluralShares}, receberia cerca de `, bold: false },
          { text: brTot, bold: true },
          { text: " por mês (estimativa).", bold: false },
        ];

    const line3 =
      assetKind === "fii"
        ? ([
            { text: "Use o ", bold: false },
            { text: "simulador", bold: true },
            { text: " nesta página para calcular seus rendimentos.", bold: false },
          ] as IntentTeaserSegment[])
        : usePagaQuantoAcoesCopy
          ? ([
              { text: "Use o ", bold: false },
              { text: "simulador", bold: true },
              { text: " abaixo para calcular seus dividendos.", bold: false },
            ] as IntentTeaserSegment[])
          : ([
              { text: "Use o ", bold: false },
              { text: "simulador", bold: true },
              { text: " nesta página para calcular seus dividendos.", bold: false },
            ] as IntentTeaserSegment[]);

    return [line1, line2, line3];
  }

  if (last && last.amountPerShare > 0 && Number.isFinite(last.amountPerShare)) {
    const brPer = formatBRL(last.amountPerShare, currency);
    const total = last.amountPerShare * n;
    const brTot = formatBRL(total, currency);

    const line1: IntentTeaserSegment[] = usePagaQuantoAcoesCopy
      ? [
          { text: symbol, bold: true },
          { text: " paga cerca de ", bold: false },
          { text: brPer, bold: true },
          { text: " por ação nos últimos pagamentos disponíveis na fonte.", bold: false },
        ]
      : [
          { text: symbol, bold: true },
          {
            text: ` pagou cerca de `,
            bold: false,
          },
          { text: brPer, bold: true },
          {
            text:
              assetKind === "fii"
                ? ` por ${shareUnit} no último pagamento disponível na fonte.`
                : ` por ${shareUnit} no último provento disponível na fonte.`,
            bold: false,
          },
        ];

    const line2: IntentTeaserSegment[] = usePagaQuantoAcoesCopy
      ? [
          { text: "Se você tivesse ", bold: false },
          { text: String(n), bold: true },
          { text: ` ${pluralShares}, receberia aproximadamente `, bold: false },
          { text: brTot, bold: true },
          { text: " por pagamento.", bold: false },
        ]
      : [
          { text: "Se você tivesse ", bold: false },
          { text: String(n), bold: true },
          { text: ` ${pluralShares}, esse evento corresponderia a cerca de `, bold: false },
          { text: brTot, bold: true },
          { text: " no total.", bold: false },
        ];

    const line3 =
      assetKind === "fii"
        ? ([
            { text: "Use o ", bold: false },
            { text: "simulador", bold: true },
            { text: " nesta página para calcular seus rendimentos.", bold: false },
          ] as IntentTeaserSegment[])
        : usePagaQuantoAcoesCopy
          ? ([
              { text: "Use o ", bold: false },
              { text: "simulador", bold: true },
              { text: " abaixo para calcular seus dividendos.", bold: false },
            ] as IntentTeaserSegment[])
          : ([
              { text: "Use o ", bold: false },
              { text: "simulador", bold: true },
              { text: " nesta página para calcular seus dividendos.", bold: false },
            ] as IntentTeaserSegment[]);

    return [line1, line2, line3];
  }

  const line1: IntentTeaserSegment[] = [
    { text: symbol, bold: true },
    {
      text: ` — ainda não há valor por ${shareUnit} recente suficiente na fonte neste momento.`,
      bold: false,
    },
  ];

  const line2: IntentTeaserSegment[] = [
    {
      text: "Os valores aparecem ",
      bold: false,
    },
    { text: "com base nos últimos pagamentos disponíveis", bold: true },
    { text: " quando a fonte os informa.", bold: false },
  ];

  const line3: IntentTeaserSegment[] = usePagaQuantoAcoesCopy
    ? [
        { text: "Use o ", bold: false },
        { text: "simulador", bold: true },
        { text: " abaixo para simular quando houver histórico.", bold: false },
      ]
    : [
        { text: "Use o ", bold: false },
        { text: "simulador", bold: true },
        { text: " nesta página para simular quando houver histórico.", bold: false },
      ];

  return [line1, line2, line3];
}
