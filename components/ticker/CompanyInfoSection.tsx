import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type CompanyInfoSectionProps = {
  id?: string;
  /** Título do bloco (ex.: “Sobre o fundo” em páginas de FII). */
  sectionHeading?: string;
  companyName: string;
  shortDescription: string;
  extraParagraph?: string;
};

export function CompanyInfoSection({
  id = "heading-info-empresa",
  sectionHeading = "Informações da empresa",
  companyName,
  shortDescription,
  extraParagraph,
}: CompanyInfoSectionProps) {
  return (
    <section aria-labelledby={id} className={ui.pageSection}>
      <h2 id={id} className={cn("text-left", ui.sectionTitle)}>
        {sectionHeading}
      </h2>
      <Card className="mt-4">
        <h3 className={cn(ui.subsectionTitle, "text-left")}>{companyName}</h3>
        <p className={cn(ui.body, "mt-3")}>{shortDescription}</p>
        {extraParagraph ? <p className={cn(ui.body, "mt-4")}>{extraParagraph}</p> : null}
      </Card>
    </section>
  );
}
