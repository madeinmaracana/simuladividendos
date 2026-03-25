import type { FaqItem } from "@/lib/stocks-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { buildFaqPageSchema } from "@/lib/seo/schema";

type StockFAQProps = {
  title?: string;
  items: FaqItem[];
  id?: string;
};

export function StockFAQ({ title = "Perguntas frequentes", items, id = "heading-faq-acao" }: StockFAQProps) {
  if (!items.length) return null;

  const faqSchema = buildFaqPageSchema(items);

  return (
    <section aria-labelledby={id} className={ui.pageSection}>
      <Card className="p-0 sm:p-0">
        <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6 dark:border-neutral-800">
          <h2 id={id} className={cn("text-left", ui.sectionTitle)}>
            {title}
          </h2>
        </div>

        <JsonLd data={faqSchema} />

        <div className="flex flex-col divide-y divide-[var(--border)] dark:divide-neutral-800">
          {items.map((item) => (
            <details key={item.question} className="group px-5 py-1 sm:px-6">
              <summary className="cursor-pointer list-none py-3 text-left text-sm font-medium text-neutral-900 marker:content-none dark:text-neutral-100 [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3">
                  <span className="min-w-0 flex-1 leading-snug">{item.question}</span>
                  <span
                    className="mt-0.5 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180 dark:text-neutral-500"
                    aria-hidden
                  >
                    ▼
                  </span>
                </span>
              </summary>
              <p className={cn(ui.body, "pb-4 pt-1")}>{item.answer}</p>
            </details>
          ))}
        </div>
      </Card>
    </section>
  );
}
