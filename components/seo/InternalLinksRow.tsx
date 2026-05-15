import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";

export type InternalLinkDescriptor = { href: string; label: string };

type InternalLinksRowProps = {
  /** Itens na ordem de exibição; separadores visuais são inseridos automaticamente. */
  links: InternalLinkDescriptor[];
  ariaLabel?: string;
  className?: string;
};

export function InternalLinksRow({
  links,
  ariaLabel = "Links internos",
  className,
}: InternalLinksRowProps) {
  if (!links.length) return null;

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-[rgba(0,0,0,0.08)] pt-8",
        className
      )}
    >
      {links.map((link, i) => (
        <span key={link.href} className="inline-flex items-center gap-2">
          {i > 0 ? (
            <span aria-hidden className="text-[#6B7280]">
              ·
            </span>
          ) : null}
          <TextLink href={link.href} className="text-sm font-medium text-[#111827]">
            {link.label}
          </TextLink>
        </span>
      ))}
    </nav>
  );
}
