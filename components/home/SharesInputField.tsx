"use client";

import { SharesInput } from "@/components/SharesInput";
import { cn } from "@/lib/cn";

export type SharesInputFieldProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  size?: "default" | "lg";
  className?: string;
};

export function SharesInputField({ className, ...props }: SharesInputFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <SharesInput {...props} />
    </div>
  );
}
