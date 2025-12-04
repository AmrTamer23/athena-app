import { Button } from "@/components/ui/button";
import type { BuddyProfile, OnboardingInvite } from "@/services/onboarding";
import { SummaryField } from "./summary-field";

type BuddySpotlightProps = {
  buddy: BuddyProfile | null | undefined;
  invite: OnboardingInvite;
};

export function BuddySpotlight({ buddy, invite }: BuddySpotlightProps) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Buddy details</h2>
        <p className="text-sm text-muted-foreground">
          {buddy
            ? `Reach out anytime to ${buddy.name}.`
            : "We'll assign a buddy shortly."}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <SummaryField
          label="You"
          value={`${invite.fullName} · ${invite.role}`}
          helper={invite.email}
        />
        <SummaryField
          label="Buddy"
          value={
            buddy ? `${buddy.name} · ${buddy.role}` : "Assignment in progress"
          }
          helper={buddy?.email}
        />
        {buddy && (
          <div className="flex items-center justify-between rounded-xl border p-4 text-sm">
            <div>
              <p className="font-medium">Timezone alignment</p>
              <p className="text-muted-foreground">
                {buddy.timezone} · async-friendly
              </p>
            </div>
            <Button asChild variant="secondary" size="sm">
              <a href={`mailto:${buddy.email}`}>Say hi</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
