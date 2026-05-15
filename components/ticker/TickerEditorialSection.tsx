type TickerEditorialSectionProps = {
  paragraphs: string[];
  id?: string;
  sectionTitle?: string;
};

export function TickerEditorialSection({
  paragraphs,
  id = "heading-contexto-dividendos",
  sectionTitle = "Contexto sobre dividendos",
}: TickerEditorialSectionProps) {
  if (!paragraphs.length) return null;

  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-[24px] font-medium leading-tight text-[#111827]">{sectionTitle}</h2>
      </div>
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[13px] font-medium leading-relaxed text-[#6B7280]">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
