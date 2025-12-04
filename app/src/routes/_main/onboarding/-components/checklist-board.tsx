import type { ChecklistPreview } from "@/services/onboarding";

type ChecklistBoardProps = {
  checklist: ChecklistPreview;
};

export function ChecklistBoard({ checklist }: ChecklistBoardProps) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{checklist.title}</h2>
        <p className="text-sm text-muted-foreground">
          Work through these with your buddy over the first week.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {checklist.steps.map((step) => (
          <div
            key={step.id}
            className="flex items-start gap-3 rounded-xl border p-4"
          >
            <span className="mt-1 h-3 w-3 rounded-full bg-primary/70" />
            <div>
              <p className="text-sm font-semibold">{step.title}</p>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
