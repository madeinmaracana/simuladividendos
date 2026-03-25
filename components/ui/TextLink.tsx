import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { ui } from "./classes";

type TextLinkProps = ComponentProps<typeof Link> & {
  className?: string;
};

export function TextLink({ className, ...props }: TextLinkProps) {
  return <Link className={cn(ui.link, className)} {...props} />;
}
