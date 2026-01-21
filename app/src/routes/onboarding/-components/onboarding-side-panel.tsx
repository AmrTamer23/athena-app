import { fadeInUpVariants } from "@/lib/animations-settings";
import { AnimatePresence, motion } from "framer-motion";
import type {
  BuddyProfile,
  ChecklistPreview,
  OnboardingInvite,
} from "@/services/onboarding";
import { InfoPanel } from "./info-panel";

type OnboardingSidePanelProps =
  | {
      step: "welcome";
      invite: OnboardingInvite;
      buddy: BuddyProfile | null | undefined;
    }
  | {
      step: "checklist";
      invite: OnboardingInvite;
      buddy: BuddyProfile | null | undefined;
      checklist: ChecklistPreview;
    }
  | {
      step: "profile-basic";
      invite: OnboardingInvite;
      buddy: BuddyProfile | null | undefined;
      checklist: ChecklistPreview | null;
    };

export function OnboardingSidePanel(props: OnboardingSidePanelProps) {
  const { invite, buddy } = props;

  if (props.step === "welcome") {
    const firstName = invite.fullName.split(" ")[0] || invite.fullName;
    return (
      <div className="relative w-full min-h-[80svh] flex flex-col justify-center items-center">
        <img
          src="/VERT_athena.avif"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover p-8"
        />
        <div className="absolute inset-0 bg-black/80 z-[5] rounded-e-3xl" />
        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key="welcome-panel"
              variants={fadeInUpVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4 h-full"
            >
              <h1 className="font-sans text-4xl font-medium text-primary-foreground">
                Welcome to
              </h1>
              <h2 className="font-serif italic text-6xl text-primary-foreground">
                {invite.companyName}
              </h2>
              <p className="text-lg text-primary-foreground/90 mt-6 max-w-md">
                {firstName}, we're excited to have you join our team as a{" "}
                <span className="font-semibold">{invite.role}</span>. Your
                journey starts here.
              </p>
              {buddy && (
                <div className="mt-8 p-4 bg-primary-foreground/10 backdrop-blur-sm rounded-lg border border-primary-foreground/20">
                  <p className="text-sm text-primary-foreground/80 mb-2">
                    Your onboarding buddy
                  </p>
                  <p className="text-base font-semibold text-primary-foreground">
                    {buddy.name}
                  </p>
                  <p className="text-sm text-primary-foreground/70">
                    {buddy.role}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (props.step === "checklist") {
    return (
      <div className="relative w-full min-h-[80svh] flex flex-col justify-center items-center">
        <img
          src="/VERT_athena.avif"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover p-8"
        />
        <div className="absolute inset-0 bg-black/80 z-[5] rounded-e-3xl" />
        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key="checklist-panel"
              variants={fadeInUpVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4 h-full"
            >
              <h1 className="font-sans text-4xl font-medium text-primary-foreground">
                Your First Week
              </h1>
              <p className="text-lg text-primary-foreground/90 max-w-md text-balance">
                Work through your onboarding checklist with your buddy. Each
                step brings you closer to being fully integrated into the team.
              </p>
              {buddy && (
                <div className="mt-6 p-4 bg-primary-foreground/10 backdrop-blur-sm rounded-lg border border-primary-foreground/20">
                  <p className="text-sm text-primary-foreground/80 mb-1">
                    Need help? Reach out to
                  </p>
                  <a
                    href={`mailto:${buddy.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-primary-foreground"
                  >
                    {buddy.name}
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (props.step === "profile-basic") {
    return (
      <div className="relative w-full min-h-[80svh] flex flex-col justify-center items-center">
        <img
          src="/VERT_athena.avif"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover p-8"
        />
        <div className="absolute inset-0 bg-black/80 z-[5] rounded-e-3xl" />
        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key="profile-basic-panel"
              variants={fadeInUpVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-full flex flex-col gap-4"
            >
              <div className="text-center mb-2">
                <h1 className="font-sans text-xl font-medium text-primary-foreground">
                  Complete Your Profile
                </h1>
                <p className="text-xs text-primary-foreground/80 mt-2">
                  Share your information and connect your profiles
                </p>
              </div>
              <InfoPanel invite={invite} buddy={buddy} />
              {/* {props.checklist && (
                <ChecklistPreviewCard checklist={props.checklist} />
              )} */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return null;
}
