import Link from "next/link";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { formatBRL, formatDatePt } from "@/lib/format";
import type { PerShareSnapshot } from "@/lib/ticker-page/derive";
import { canonicalMainFiiPath } from "@/lib/fiis/fii-intent-seo";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import type { FiiUrlVariant } from "@/lib/fiis/fii-slug";
import { fiiVariantShares } from "@/lib/fiis/fii-slug";

type FiiQuickAnswerProps = {
  symbol: string;
  lastSnap: PerShareSnapshot | null;
  nextSnap?: PerShareSnapshot | null;
  currency: string;
  variant: "main" | FiiUrlVariant;
};

export function FiiQuickAnswer({ symbol, lastSnap, nextSnap, currency, variant }: FiiQuickAnswerProps) {
  if (variant === "main") return null;

  const mainHref = canonicalMainFiiPath(symbol);
  const exampleCotas = fiiVariantShares(variant) ?? 100;

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
        <strong>{symbol}</strong> — último rendimento por cota <strong>registrado na fonte</strong>:{" "}
        <strong>{formatBRL(lastSnap.amountPerShare, currency)}</strong>, pago em{" "}
        <strong>{formatDatePt(lastSnap.paymentDate)}</strong>.
      </p>
      {nextSnap ? (
        <p className="mt-2">
          Próximo evento na fonte: <strong>{formatBRL(nextSnap.amountPerShare, currency)}</strong> com data{" "}
          <strong>{formatDatePt(nextSnap.paymentDate)}</strong>.
        </p>
      ) : null}
      <p className="mt-2">
        Com <strong>{exampleCotas} cotas</strong>, o último evento equivale a cerca de{" "}
        <strong>{formatBRL(totalEx, currency)}</strong> — ajuste no simulador para a sua posição.
      </p>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Próximos rendimentos dependem do fundo; confirme no site do administrador.
      </p>
    </QuickAnswer>
  );
}
