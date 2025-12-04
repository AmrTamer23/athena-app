import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FieldControlProps = {
  label: string;
  error?: string;
  children: ReactNode;
  colSpan?: number;
};

export function FieldControl({
  label,
  error,
  children,
  colSpan,
}: FieldControlProps) {
  return (
    <div
      className={cn("flex flex-col gap-2.5", colSpan && `col-span-${colSpan}`)}
    >
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
