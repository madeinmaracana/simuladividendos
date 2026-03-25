import Link from "next/link";
import {
  FII_TICKERS_PAGA_QUANTO_POR_MES,
  FII_VARIANT_PAGA_QUANTO_POR_MES,
  fiiPathFromSlug,
  fiiVariantSlug,
} from "@/lib/fiis/fii-slug";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type FiiIntentLandingLinksProps = {
  symbol: string;
};

/** Link para landing de intenção (ex. “paga quanto por mês”) na página principal do FII. */
export function FiiIntentLandingLinks({ symbol }: FiiIntentLandingLinksProps) {
  const u = symbol.trim().toUpperCase();
  if (!FII_TICKERS_PAGA_QUANTO_POR_MES.includes(u)) return null;

  const href = fiiPathFromSlug(fiiVariantSlug(u, FII_VARIANT_PAGA_QUANTO_POR_MES));

  return (
    <nav aria-label={`Busca por rendimento mensal — ${symbol}`} className={cn(ui.pageSection, "flex flex-col gap-2")}>
      <p className={ui.metricLabel}>Busca específica</p>
      <p className={cn(ui.body, "max-w-2xl")}>
        Página focada na pergunta “paga quanto por mês?” (mesmos dados, texto e FAQ alinhados à intenção).
      </p>
      <Link href={href} className={cn(ui.pill, "w-fit no-underline")}>
        {symbol}: quanto paga por mês →
      </Link>
    </nav>
  );
}
