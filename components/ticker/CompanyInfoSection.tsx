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
        <h2 id={id} className="text-[27px] font-medium leading-tight text-white">
          {sectionHeading ?? companyName}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {sectionHeading && (
          <p className="text-[15px] font-medium text-white">{companyName}</p>
        )}
        <p className="text-[13px] font-medium leading-relaxed text-[#808080]">{shortDescription}</p>
        {extraParagraph ? (
          <p className="text-[13px] font-medium leading-relaxed text-[#808080]">{extraParagraph}</p>
        ) : null}
      </div>
    </section>
  );
}
