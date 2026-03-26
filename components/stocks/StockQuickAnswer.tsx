import Link from "next/link";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { formatBRL, formatDatePt } from "@/lib/format";
import type { PerShareSnapshot } from "@/lib/ticker-page/derive";
import { acaoMainSlug, acaoVariantShares } from "@/lib/acoes/acao-slug";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import type { AcaoUrlVariant } from "@/lib/acoes/acao-slug";

type StockQuickAnswerProps = {
  symbol: string;
  lastSnap: PerShareSnapshot | null;
  currency: string;
  variant: "main" | AcaoUrlVariant;
};

export function StockQuickAnswer({ symbol, lastSnap, currency, variant }: StockQuickAnswerProps) {
  const mainHref = `/acoes/${encodeURIComponent(acaoMainSlug(symbol))}`;
  const shares = acaoVariantShares(variant);
  const exampleCotas = shares ?? 100;
  const show =
    variant !== "main" &&
    (variant === "paga-quanto" ||
      variant === "quanto-paga-dividendos" ||
      variant === "simulador" ||
      variant === "simulador-de-dividendos" ||
      shares != null);

  if (!show) return null;

  if (!lastSnap) {
    return (
      <QuickAnswer>
        <p>
          Não há provento recente disponível na fonte neste momento para <strong>{symbol}</strong>.
          Confira a{" "}
          <Link href={mainHref} className={cn(ui.link)}>
            visão geral do ticker
          </Link>{" "}
          ou tente novamente mais tarde.
        </p>
      </QuickAnswer>
    );
  }

  const totalEx = lastSnap.amountPerShare * exampleCotas;
  const labelPorCota =
    variant === "paga-quanto"
      ? "por ação (último provento na fonte)"
      : shares
        ? `por ação no último provento (cenário com ${shares} cotas)`
      : "por ação no último provento registrado na fonte";

  return (
    <QuickAnswer>
      <p>
        <strong>{symbol}</strong> — último valor de referência: <strong>{formatBRL(lastSnap.amountPerShare, currency)}</strong>{" "}
        {labelPorCota}, com pagamento em <strong>{formatDatePt(lastSnap.paymentDate)}</strong>.
      </p>
      <p className="mt-2">
        Exemplo com <strong>{exampleCotas} cotas</strong> (só ilustra a conta): total aproximado do último evento ≈{" "}
        <strong>{formatBRL(totalEx, currency)}</strong>. Ajuste a quantidade no simulador ao lado para o seu caso.
      </p>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Proventos não são mensalidade fixa: valores e datas mudam conforme a companhia.
      </p>
    </QuickAnswer>
  );
}
