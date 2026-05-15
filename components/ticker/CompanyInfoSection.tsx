type CompanyInfoSectionProps = {
  id?: string;
  sectionHeading?: string;
  companyName: string;
  shortDescription: string;
  extraParagraph?: string;
};

export function CompanyInfoSection({
  id = "heading-info-empresa",
  sectionHeading,
  companyName,
  shortDescription,
  extraParagraph,
}: CompanyInfoSectionProps) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-[24px] font-medium leading-tight text-[#111827]">
          {sectionHeading ?? companyName}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {sectionHeading && (
          <p className="text-[15px] font-semibold text-[#111827]">{companyName}</p>
        )}
        <p className="text-[13px] font-medium leading-relaxed text-[#6B7280]">{shortDescription}</p>
        {extraParagraph ? (
          <p className="text-[13px] font-medium leading-relaxed text-[#6B7280]">{extraParagraph}</p>
        ) : null}
      </div>
    </section>
  );
}
