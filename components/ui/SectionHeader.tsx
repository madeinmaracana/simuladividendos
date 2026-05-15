interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  theme?: "light" | "dark";
  id?: string;
}

export function SectionHeader({ title, subtitle, theme = "light", id }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2
        id={id}
        className={`text-[24px] font-medium leading-tight ${theme === "light" ? "text-[#111827]" : "text-white"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-[16px] font-normal text-[#808080]">{subtitle}</p>
      )}
    </div>
  );
}
