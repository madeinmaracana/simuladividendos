import { formatBRL } from "@/lib/format";

interface AmountProps {
  value: number;
  currency: string;
  /**
   * highlight=false → tudo em cinza (#A3A3A3) — estado neutro / sem dado relevante
   * highlight=true  → "R$" em cinza claro, número em preto — destaque do próximo pagamento
   */
  highlight?: boolean;
  className?: string;
}

/** Exibe valor monetário BRL com prefixo "R$ " bicolor.
 *  Reutilizado em HomeHeroSimulator e TickerHeroSimulatorCard. */
export function Amount({ value, currency, highlight = false, className }: AmountProps) {
  const formatted = formatBRL(value, currency);
  // "R$ 152,00" → prefix="R$ ", number="152,00"
  const match = formatted.match(/^(R\$[\s  ]*)(.+)$/);
  const prefix = match?.[1] ?? "R$ ";
  const number = match?.[2] ?? formatted;

  return (
    <span className={`text-3xl font-light leading-none tracking-[-0.64px]${className ? ` ${className}` : ""}`}>
      <span className={highlight ? "text-[#9B9B9B]" : "text-[#A3A3A3]"}>{prefix}</span>
      <span className={highlight ? "text-black" : "text-[#A3A3A3]"}>{number}</span>
    </span>
  );
}
