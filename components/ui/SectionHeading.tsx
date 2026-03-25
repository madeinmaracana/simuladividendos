import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ui } from "./classes";

type Level = "h2" | "h3";

type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  as?: Level;
  className?: string;
};

export function SectionHeading({
  id,
  title,
  description,
  eyebrow,
  as = "h2",
  className,
}: SectionHeadingProps) {
  const TitleTag = as;
  const titleClass = as === "h2" ? ui.sectionTitle : ui.subsectionTitle;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {eyebrow ? <p className={ui.eyebrow}>{eyebrow}</p> : null}
      <TitleTag id={id} className={cn("text-left", titleClass)}>
        {title}
      </TitleTag>
      {description ? (
        typeof description === "string" ? (
          <p className={cn("max-w-2xl text-left", ui.body)}>{description}</p>
        ) : (
          description
        )
      ) : null}
    </div>
  );
}
