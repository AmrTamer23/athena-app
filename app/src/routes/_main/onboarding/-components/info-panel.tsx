import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BuddyProfile, OnboardingInvite } from "@/services/onboarding";
import { SummaryField } from "./summary-field";

type InfoPanelProps = {
  invite: OnboardingInvite;
  buddy: BuddyProfile | null | undefined;
};

export function InfoPanel({ invite, buddy }: InfoPanelProps) {
  return (
    <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-lg border border-primary-foreground/10 p-3">
      <p className="text-xs font-semibold text-primary-foreground mb-2">
        Quick facts
      </p>
      <div className="space-y-2">
        <div>
          <p className="text-xs text-primary-foreground/70">Role</p>
          <p className="text-sm text-primary-foreground">{invite.role}</p>
        </div>
        <div>
          <p className="text-xs text-primary-foreground/70">Email</p>
          <p className="text-sm text-primary-foreground">{invite.email}</p>
        </div>
        <div>
          <p className="text-xs text-primary-foreground/70">Start date</p>
          <p className="text-sm text-primary-foreground">{invite.startDate}</p>
        </div>
        <div>
          <p className="text-xs text-primary-foreground/70">Buddy</p>
          <p className="text-sm text-primary-foreground">
            {buddy ? `${buddy.name} · ${buddy.role}` : "Assigned after profile"}
          </p>
          {buddy?.email && (
            <p className="text-xs text-primary-foreground/60">{buddy.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}
