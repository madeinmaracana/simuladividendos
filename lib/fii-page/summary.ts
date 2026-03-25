import { formatBRL, formatDatePt } from "@/lib/format";
import type { PerShareSnapshot } from "@/lib/ticker-page/derive";

export function generateFiiSummaryParagraph(
  symbol: string,
  last: PerShareSnapshot | null,
  next: PerShareSnapshot | null,
  frequencyHint: string | null,
  editorialFrequency?: string
): string {
  const parts: string[] = [];

  if (last) {
    parts.push(
      `O último rendimento por cota de ${symbol} foi de ${formatBRL(last.amountPerShare)} em ${formatDatePt(last.paymentDate)}.`
    );
  } else {
    parts.push(`Não identificamos um pagamento passado recente para ${symbol} com as datas disponíveis.`);
  }

  if (next) {
    parts.push(
      ` Há data futura listada com ${formatBRL(next.amountPerShare)} por cota e pagamento previsto para ${formatDatePt(next.paymentDate)} — sujeito a alterações pelo fundo.`
    );
  } else if (last) {
    parts.push(` Ainda não há próximo pagamento com data futura divulgada nos dados utilizados aqui.`);
  }

  const freq = frequencyHint ?? editorialFrequency?.trim();
  if (freq) {
    parts.push(
      ` Pelo histórico de datas, o ritmo observado é ${freq.endsWith(".") ? freq.slice(0, -1) : freq}.`
    );
  }

  return parts.join("").trim();
}
