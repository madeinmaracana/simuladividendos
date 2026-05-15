import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

export type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = items
    .filter((i): i is BreadcrumbItem & { href: string } => Boolean(i.href))
    .map((item) => ({ label: item.label, href: item.href }));

  const breadcrumbSchema = buildBreadcrumbListSchema(schemaItems);

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-[#F3F4F6]">
      <div className="mx-auto w-full max-w-[var(--page-max)] px-4 py-3 sm:px-6 lg:px-4">
        <ol className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5">
          {items.map((item, idx) => (
            <li key={`${item.label}-${idx}`} className="flex min-w-0 items-center gap-1">
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[13px] font-medium text-[#6B7280] transition-colors hover:text-[#111827]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="max-w-[min(100%,16rem)] truncate text-[13px] font-medium text-[#111827] sm:max-w-xs"
                >
                  {item.label}
                </span>
              )}
              {idx < items.length - 1 ? (
                <span aria-hidden="true" className="text-[13px] text-[#D1D5DB]">
                  /
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <JsonLd data={breadcrumbSchema} />
    </nav>
  );
}
