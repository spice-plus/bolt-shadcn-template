import * as React from "react";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  label: string;
  id?: string;
  error?: string;
  /** vertical: Label上・フィールド下（Input/Select/Textarea用）
   *  horizontal: フィールドとLabelを横並び（Checkbox用） */
  layout?: "vertical" | "horizontal";
  children: React.ReactNode;
};

export function FormField({
  label,
  id,
  error,
  layout = "vertical",
  children,
}: FormFieldProps) {
  const errorId = id ? `${id}-error` : undefined;

  if (layout === "horizontal") {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          {children}
          <Label htmlFor={id}>{label}</Label>
        </div>
        {error && (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
