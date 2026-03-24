import type { FaqItem } from "@/lib/stocks-data";

type StockFAQProps = {
  title?: string;
  items: FaqItem[];
  id?: string;
};

export function StockFAQ({ title = "Perguntas frequentes", items, id = "heading-faq-acao" }: StockFAQProps) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby={id}
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h2 id={id} className="text-left text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-neutral-200 open:bg-neutral-50 dark:border-neutral-700 dark:open:bg-neutral-950/50"
          >
            <summary className="cursor-pointer list-none px-4 py-3 text-left text-sm font-medium text-neutral-900 marker:content-none dark:text-neutral-100 [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-2">
                {item.question}
                <span className="shrink-0 text-neutral-400 transition group-open:rotate-180 dark:text-neutral-500">
                  ▼
                </span>
              </span>
            </summary>
            <p className="border-t border-neutral-200 px-4 py-3 text-left text-sm leading-relaxed text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
