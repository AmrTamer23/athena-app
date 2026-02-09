type SummaryFieldProps = {
  label: string;
  value: string;
  helper?: string;
};

export function SummaryField({ label, value, helper }: SummaryFieldProps) {
  return (
    <div className="flex flex-col rounded-xl border p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium">{value}</p>
      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
    </div>
  );
}

