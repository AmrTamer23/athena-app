import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChecklistPreview } from "@/services/onboarding";

type ChecklistBoardProps = {
  checklist: ChecklistPreview;
};

export function ChecklistBoard({ checklist }: ChecklistBoardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{checklist.title}</CardTitle>
        <CardDescription>
          Work through these with your buddy over the first week.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
}

