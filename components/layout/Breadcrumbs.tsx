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
    <nav aria-label="Breadcrumb" className="w-full min-w-0">
      <ol
        className={cn(
          "flex w-full min-w-0 flex-wrap items-center gap-x-1 gap-y-1 rounded-xl border border-[var(--border)] bg-neutral-50/80 px-3 py-2.5 text-xs sm:text-sm dark:bg-neutral-900/40"
        )}
      >
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className={cn(ui.link, "text-sm font-medium")}>
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="max-w-[min(100%,12rem)] truncate font-medium text-neutral-800 dark:text-neutral-200 sm:max-w-[20rem]"
              >
                {item.label}
              </span>
            )}
            {idx < items.length - 1 ? (
              <span aria-hidden="true" className="px-1 text-neutral-300 dark:text-neutral-600">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <JsonLd data={breadcrumbSchema} />
    </nav>
  );
}
