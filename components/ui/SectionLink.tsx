import Link from "next/link";

interface SectionLinkProps {
  href: string;
  label: string;
  theme?: "light" | "dark";
}

export function SectionLink({ href, label, theme = "light" }: SectionLinkProps) {
  const textColor = theme === "light" ? "text-[#111827]" : "text-white";
  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 text-[16px] font-normal ${textColor} no-underline transition-opacity hover:opacity-60`}
    >
      {label}
      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
        arrow_forward
      </span>
    </Link>
  );
}
