import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FieldControlProps = {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FieldControl({
  label,
  error,
  children,
  className,
}: FieldControlProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
