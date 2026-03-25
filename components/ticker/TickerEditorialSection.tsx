import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type TickerEditorialSectionProps = {
  paragraphs: string[];
  id?: string;
  sectionTitle?: string;
};

/** Bloco editorial pós-resumo: contexto do ativo e dividendos (dados reais/registry apenas). */
export function TickerEditorialSection({
  paragraphs,
  id = "heading-contexto-dividendos",
  sectionTitle = "Contexto sobre dividendos",
}: TickerEditorialSectionProps) {
  if (!paragraphs.length) return null;

  return (
    <section aria-labelledby={id} className={ui.pageSection}>
      <h2 id={id} className={cn("text-left", ui.sectionTitle)}>
        {sectionTitle}
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className={cn(ui.body, "text-pretty leading-relaxed")}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
