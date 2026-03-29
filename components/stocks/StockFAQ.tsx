import type { FaqItem } from "@/lib/stocks-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { buildFaqPageSchema } from "@/lib/seo/schema";

/** Material Design “expand_more” (filled), 24dp — `currentColor` para tema claro/escuro. */
function ExpandMoreIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  );
}

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
            <details key={item.question} className="group/faq px-5 py-1 sm:px-6">
              <summary className="cursor-pointer list-none rounded-lg py-3 text-left text-sm font-medium text-neutral-900 outline-none transition-colors marker:content-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/25 dark:text-neutral-100 dark:hover:bg-neutral-900/50 [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3 px-1">
                  <span className="min-w-0 flex-1 leading-snug group-hover/faq:text-neutral-800 dark:group-hover/faq:text-neutral-50">
                    {item.question}
                  </span>
                  <ExpandMoreIcon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400 transition-[color,transform] duration-200 ease-out group-open/faq:rotate-180 group-hover/faq:text-neutral-700 dark:text-neutral-500 dark:group-hover/faq:text-neutral-300" />
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
