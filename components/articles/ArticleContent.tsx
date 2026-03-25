import type { ArticleSection } from "@/data/articles";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type ArticleContentProps = {
  sections: ArticleSection[];
};

export function ArticleContent({ sections }: ArticleContentProps) {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {sections.map((section) => (
        <section key={section.heading} aria-label={section.heading} className="flex flex-col gap-3">
          <h2 className={cn("text-left", ui.sectionTitle)}>{section.heading}</h2>
          <div className="flex flex-col gap-3">
            {section.paragraphs.map((p, idx) => (
              <p key={`${section.heading}-${idx}`} className={cn(ui.body, "max-w-2xl text-left")}>
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
