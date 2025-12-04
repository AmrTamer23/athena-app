import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BuddyProfile, OnboardingInvite } from "@/services/onboarding";

type WelcomeScreenProps = {
  invite: OnboardingInvite;
  buddy: BuddyProfile | null | undefined;
  onStart: () => void;
};

export function WelcomeScreen({ invite, buddy, onStart }: WelcomeScreenProps) {
  const firstName = invite.fullName.split(" ")[0] || invite.fullName;
  return (
    <Card className="overflow-hidden w-full">
      <CardHeader className="flex flex-col gap-4">
        <p className="text-sm font-medium text-muted-foreground">
          Welcome aboard
        </p>
        <div className="flex flex-col gap-2">
          <CardTitle className="text-3xl">
            {firstName}, your seat is ready
          </CardTitle>
          <CardDescription className="text-base text-pretty">
            You are joining {invite.companyName} as a {invite.role}. Before your
            first day on {invite.startDate}, complete your profile.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Your onboarding buddy</span>
          <span className="text-base font-semibold">
            {buddy ? `${buddy.name} · ${buddy.role}` : "Assigned after profile"}
          </span>
          {buddy && (
            <span className="text-muted-foreground">{buddy.email}</span>
          )}
        </div>
        <Button size="lg" onClick={onStart} className="w-full">
          Start profile
        </Button>
      </CardContent>
    </Card>
  );
}
