import { Button } from "@/components/ui/button";
import type { BuddyProfile, OnboardingInvite } from "@/services/onboarding";

type WelcomeScreenProps = {
  invite: OnboardingInvite;
  buddy: BuddyProfile | null | undefined;
  onStart: () => void;
};

export function WelcomeScreen({ invite, buddy, onStart }: WelcomeScreenProps) {
  const firstName = invite.fullName.split(" ")[0] || invite.fullName;
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-medium text-muted-foreground">
          Welcome aboard
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {firstName}, your seat is ready
          </h1>
          <p className="text-base text-muted-foreground">
            You are joining {invite.companyName} as a {invite.role}. Before your
            first day on {invite.startDate}, complete your profile.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">
            Your onboarding buddy
          </span>
          <span className="text-base font-semibold">
            {buddy ? `${buddy.name} · ${buddy.role}` : "Assigned after profile"}
          </span>
          {buddy && (
            <span className="text-sm text-muted-foreground">{buddy.email}</span>
          )}
        </div>
        <Button size="lg" onClick={onStart} className="w-full">
          Start profile
        </Button>
      </div>
    </div>
  );
}
