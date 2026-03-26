import Link from "next/link";
import { acaoMainSlug, acaoVariantSlug, type AcaoUrlVariant } from "@/lib/acoes/acao-slug";
import { acaoVariantsForTicker } from "@/lib/acoes/stock-intent-copy";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

const VARIANT_LABEL: Record<AcaoUrlVariant, string> = {
  "quanto-rende-100-cotas": "Quanto rendem 100 cotas",
  "quanto-rende-500-cotas": "Quanto rendem 500 cotas",
  "quanto-rende-1000-cotas": "Quanto rendem 1000 cotas",
  "quanto-paga-dividendos": "Quanto paga dividendos",
  dividendos: "Dividendos por ação",
  "paga-quanto": "Quanto paga",
  "simulador-de-dividendos": "Simulador de dividendos",
  simulador: "Simulador",
};

type StockAcaoIntentNavProps = {
  symbol: string;
  current: "main" | AcaoUrlVariant;
};

/** Interligação entre página principal e URLs de intenção (`/acoes/petr4-dividendos`, etc.). */
export function StockAcaoIntentNav({ symbol, current }: StockAcaoIntentNavProps) {
  const mainHref = `/acoes/${encodeURIComponent(acaoMainSlug(symbol))}`;

  return (
    <nav aria-label={`Páginas sobre ${symbol}`} className={cn(ui.pageSection, "flex flex-col gap-3")}>
      <h2 id="heading-acao-intent-nav" className={cn("text-left", ui.sectionTitle)}>
        Outras páginas sobre {symbol}
      </h2>
      <p className={cn(ui.body, "max-w-2xl")}>
        Cada URL reforça uma intenção de busca diferente; os dados de proventos são os mesmos da visão geral. Para
        indexação, o Google usa a página principal do ticker como canônica.
      </p>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href={mainHref}
            className={cn(
              ui.pill,
              "no-underline",
              current === "main" && "border-[color:var(--primary-soft-border)] bg-[color:var(--primary-soft)]"
            )}
            aria-current={current === "main" ? "page" : undefined}
          >
            Visão geral
          </Link>
        </li>
        {acaoVariantsForTicker(symbol).map((v) => {
          const href = `/acoes/${encodeURIComponent(acaoVariantSlug(symbol, v))}`;
          return (
            <li key={v}>
              <Link
                href={href}
                className={cn(
                  ui.pill,
                  "no-underline",
                  current === v && "border-[color:var(--primary-soft-border)] bg-[color:var(--primary-soft)]"
                )}
                aria-current={current === v ? "page" : undefined}
              >
                {VARIANT_LABEL[v]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
