import Link from "next/link";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { formatBRL, formatDatePt } from "@/lib/format";
import type { PerShareSnapshot } from "@/lib/ticker-page/derive";
import { canonicalMainFiiPath } from "@/lib/fiis/fii-intent-seo";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import type { FiiUrlVariant } from "@/lib/fiis/fii-slug";
import { FII_VARIANT_PAGA_QUANTO_POR_MES } from "@/lib/fiis/fii-slug";

type FiiQuickAnswerProps = {
  symbol: string;
  lastSnap: PerShareSnapshot | null;
  currency: string;
  variant: "main" | FiiUrlVariant;
};

export function FiiQuickAnswer({ symbol, lastSnap, currency, variant }: FiiQuickAnswerProps) {
  if (variant !== FII_VARIANT_PAGA_QUANTO_POR_MES) return null;

  const mainHref = canonicalMainFiiPath(symbol);
  const exampleCotas = 100;

  if (!lastSnap) {
    return (
      <QuickAnswer>
        <p>
          Não há rendimento recente disponível na fonte para <strong>{symbol}</strong>. Veja a{" "}
          <Link href={mainHref} className={cn(ui.link)}>
            página principal do fundo
          </Link>{" "}
          ou tente mais tarde.
        </p>
      </QuickAnswer>
    );
  }

  const totalEx = lastSnap.amountPerShare * exampleCotas;

  return (
    <QuickAnswer>
      <p>
        <strong>{symbol}</strong> — último rendimento por cota na fonte:{" "}
        <strong>{formatBRL(lastSnap.amountPerShare, currency)}</strong>, pago em{" "}
        <strong>{formatDatePt(lastSnap.paymentDate)}</strong>.
      </p>
      <p className="mt-2">
        “Por mês” costuma ser uma média ou expectativa, não um valor fixo. Com <strong>{exampleCotas} cotas</strong>, o
        último evento equivale a cerca de <strong>{formatBRL(totalEx, currency)}</strong> — ajuste no simulador para a sua
        posição.
      </p>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Próximos rendimentos dependem do fundo; confirme no site do administrador.
      </p>
    </QuickAnswer>
  );
}
