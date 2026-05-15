import Link from "next/link";
import { cn } from "@/lib/cn";

interface SectionBlockProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionBlock({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "Ver todos →",
  children,
  className,
}: SectionBlockProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[#6B7280]">{subtitle}</p>
        )}
      </div>

      {children}

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm font-medium text-[#111827] hover:underline no-underline w-fit"
        >
          {viewAllLabel}
        </Link>
      )}
    </section>
  );
}
