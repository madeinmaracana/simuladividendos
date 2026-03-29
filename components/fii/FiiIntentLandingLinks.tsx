import Link from "next/link";
import { FII_URL_VARIANTS_GENERATED, fiiPathFromSlug, fiiVariantSlug } from "@/lib/fiis/fii-slug";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type FiiIntentLandingLinksProps = {
  symbol: string;
};

/** Link para landing de intenção (ex. “paga quanto por mês”) na página principal do FII. */
export function FiiIntentLandingLinks({ symbol }: FiiIntentLandingLinksProps) {
  const u = symbol.trim().toUpperCase();
  const labels: Record<(typeof FII_URL_VARIANTS_GENERATED)[number], string> = {
    "paga-quanto": "Paga quanto",
    simulador: "Simulador",
    "quanto-rende-100-cotas": "Quanto rendem 100 cotas",
    "quanto-rende-1000-cotas": "Quanto rendem 1000 cotas",
  };

  return (
    <nav aria-label={`Busca por rendimento mensal — ${symbol}`} className={cn(ui.pageSection, "flex flex-col gap-2")}>
      <p className={ui.metricLabel}>Páginas similares</p>
      <p className={cn(ui.body, "max-w-2xl")}>
        Variações programáticas por intenção de busca e quantidade de cotas (mesmos dados, texto adaptado por contexto).
      </p>
      <div className="flex flex-wrap gap-2">
        {FII_URL_VARIANTS_GENERATED.map((v) => (
          <Link key={v} href={fiiPathFromSlug(fiiVariantSlug(u, v))} className={cn(ui.pill, "w-fit no-underline")}>
            {labels[v]}
          </Link>
        ))}
      </div>
    </nav>
  );
}
