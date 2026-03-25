import type { FaqItem } from "@/data/stocks";
import { FII_VARIANT_PAGA_QUANTO_POR_MES, type FiiUrlVariant } from "./fii-slug";

export function fiiIntentEditorialAddendum(
  variant: "main" | FiiUrlVariant,
  symbol: string,
  displayName: string
): string[] {
  if (variant === "main") return [];

  return [
    `Esta URL responde à busca “${symbol} paga quanto por mês?”. O valor por cota do último rendimento está na tabela; o total na sua conta depende de quantas cotas você tem — use o simulador acima.`,
    `${displayName} segue calendário e política do regulamento: administrador pode alterar datas e valores. O histórico na fonte não substitui informe oficial.`,
  ];
}

export function fiiIntentExtraFaqs(variant: "main" | FiiUrlVariant, symbol: string): FaqItem[] {
  if (variant !== FII_VARIANT_PAGA_QUANTO_POR_MES) return [];

  return [
    {
      question: `${symbol} paga todo mês o mesmo valor?`,
      answer:
        "Muitos FIIs visam distribuição mensal, mas o valor por cota pode mudar conforme resultado do fundo e política de distribuição. Use o histórico como referência educacional e confira o informe do administrador.",
    },
  ];
}
