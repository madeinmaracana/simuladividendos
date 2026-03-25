import { formatBRL, formatDatePt } from "@/lib/format";
import type { PerShareSnapshot } from "./derive";

/** Primeira frase ou trecho curto para teaser ao lado do simulador. */
export function firstSentenceOrExcerpt(text: string, maxChars = 220): string {
  const t = text.trim();
  if (!t) return "";
  const idx = t.search(/[.!?]\s/);
  if (idx >= 0) return t.slice(0, idx + 1).trim();
  return t.length <= maxChars ? t : `${t.slice(0, maxChars).trim()}…`;
}

export function generateDividendSummaryParagraph(
  ticker: string,
  last: PerShareSnapshot | null,
  next: PerShareSnapshot | null,
  frequencyHint: string | null,
  editorialFrequency?: string
): string {
  const parts: string[] = [];

  if (last) {
    parts.push(
      `O último dividendo de ${ticker} foi de ${formatBRL(last.amountPerShare)} por ação, com pagamento em ${formatDatePt(last.paymentDate)}.`
    );
  } else {
    parts.push(
      `Não encontramos na fonte de dados um pagamento passado identificável para ${ticker} com as informações atuais.`
    );
  }

  if (next) {
    parts.push(
      ` O próximo dividendo aparece na lista com ${formatBRL(next.amountPerShare)} por ação, com pagamento previsto para ${formatDatePt(next.paymentDate)} (conforme dados disponibilizados — sujeito a alterações).`
    );
  } else if (last) {
    parts.push(` O próximo dividendo ainda não foi anunciado com data futura.`);
  }

  const freq = frequencyHint ?? editorialFrequency?.trim();
  if (freq) {
    parts.push(
      ` Pelo espaçamento entre pagamentos no histórico disponível, o ritmo é ${freq.endsWith(".") ? freq.slice(0, -1) : freq}.`
    );
  }

  return parts.join("").trim();
}
