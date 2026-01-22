import type { ChecklistPreview } from "@/services/onboarding";

type ChecklistPreviewCardProps = {
  checklist: ChecklistPreview | null;
};

export function ChecklistPreviewCard({ checklist }: ChecklistPreviewCardProps) {
  if (!checklist) {
    return null;
  }

  return (
    <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-lg border border-primary-foreground/10 p-3">
      <p className="text-xs font-semibold text-primary-foreground mb-2">
        First wins preview
      </p>
      <p className="text-xs text-primary-foreground/70 mb-2">
        Submit your profile to unlock the full list.
      </p>
      <div className="space-y-2">
        {checklist.steps.slice(0, 3).map((step) => (
          <div key={step.id} className="rounded-md border border-primary-foreground/20 p-2">
            <p className="text-xs font-semibold text-primary-foreground">
              {step.title}
            </p>
            <p className="text-xs text-primary-foreground/70">
              {step.description}
            </p>
          </div>
        ))}
        {checklist.steps.length > 3 && (
          <p className="text-xs text-primary-foreground/60">
            +{checklist.steps.length - 3} more items coming after submission
          </p>
        )}
      </div>
    </div>
  );
}

