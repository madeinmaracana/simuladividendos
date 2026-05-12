import type { FaqItem } from "@/lib/stocks-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqPageSchema } from "@/lib/seo/schema";

type StockFAQProps = {
  title?: string;
  items: FaqItem[];
  id?: string;
};

export function StockFAQ({ title = "Perguntas frequentes", items, id = "heading-faq" }: StockFAQProps) {
  if (!items.length) return null;

  const faqSchema = buildFaqPageSchema(items);

  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <JsonLd data={faqSchema} />

      {/* Cabeçalho */}
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-[27px] font-medium leading-tight text-white">
          {title}
        </h2>
      </div>

      {/* Itens */}
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.question}>
            <details className="group rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)]">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                <p className="text-[13px] font-medium text-white">{item.question}</p>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(120,120,120,0.40)] text-[#808080] transition-transform duration-200 group-open:rotate-180">
                  <span
                    className="material-symbols-outlined leading-none"
                    style={{ fontSize: 20, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
                  >
                    expand_more
                  </span>
                </span>
              </summary>
              <p className="px-4 pb-4 text-[13px] font-medium leading-relaxed text-[#808080]">
                {item.answer}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
