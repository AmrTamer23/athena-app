import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboardingFlow } from "@/hooks/useOnboardingFlow";
import { WelcomeScreen } from "@/routes/onboarding/-components/welcome-screen";

import { ChecklistBoard } from "@/routes/onboarding/-components/checklist-board";
import { FieldControl } from "@/routes/onboarding/-components/field-control";
import { TwoSideLayout } from "@/routes/onboarding/-components/two-side-layout";
import { OnboardingSidePanel } from "@/routes/onboarding/-components/onboarding-side-panel";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/onboarding/")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = Route.useSearch();
  const {
    inviteQuery,
    sharedFields,
    values,
    errors,
    isSubmitting,
    submitError,
    currentStep,
    checklist,
    initialChecklist,
    buddy,
    initialBuddy,
    startProfile,
    updateField,
    updateSocialMediaField,
    handleSubmit,
  } = useOnboardingFlow({ token });

  if (!token) {
    return (
      <CenteredState
        title="Invitation required"
        description="Open this page from your email invite so we can load your onboarding kit."
        actionLabel="Return to login"
        actionHref="/_auth/login"
      />
    );
  }

  if (inviteQuery.isLoading) {
    return (
      <CenteredState
        title="Loading invite"
        description="Preparing your onboarding flow..."
      />
    );
  }

  if (inviteQuery.isError || !inviteQuery.data) {
    const message =
      inviteQuery.error instanceof Error
        ? inviteQuery.error.message
        : "Unable to load invitation";
    return (
      <CenteredState
        title="Invite unavailable"
        description={message}
        actionLabel="Back to login"
        actionHref="/_auth/login"
      />
    );
  }

  const invite = inviteQuery.data.invite;
  const activeChecklist = checklist ?? initialChecklist;
  const activeBuddy = buddy ?? initialBuddy;

  if (currentStep === "welcome") {
    return (
      <TwoSideLayout
        leftPanel={
          <OnboardingSidePanel
            step="welcome"
            invite={invite}
            buddy={activeBuddy}
          />
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="welcome"
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <WelcomeScreen
              invite={invite}
              buddy={activeBuddy}
              onStart={startProfile}
            />
          </motion.div>
        </AnimatePresence>
      </TwoSideLayout>
    );
  }

  if (currentStep === "checklist" && activeChecklist) {
    return (
      <TwoSideLayout
        leftPanel={
          <OnboardingSidePanel
            step="checklist"
            invite={invite}
            buddy={activeBuddy}
            checklist={activeChecklist}
          />
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="checklist"
            className="w-full max-w-4xl *:mx-auto flex flex-col gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-1 text-start w-full *:mx-auto">
              <p className="text-xs font-medium text-muted-foreground">
                You are officially onboard
              </p>
              <h1 className="text-2xl font-semibold tracking-tight ">
                Meet your buddy and first wins
              </h1>
            </div>
            <ChecklistBoard checklist={activeChecklist} />
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </motion.div>
        </AnimatePresence>
      </TwoSideLayout>
    );
  }

  if (currentStep === "profile-basic") {
    return (
      <TwoSideLayout
        leftPanel={
          <OnboardingSidePanel
            step="profile-basic"
            invite={invite}
            buddy={activeBuddy}
            checklist={initialChecklist}
          />
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="profile-basic"
            className="w-full max-w-2xl flex flex-col gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Welcome to {invite.companyName}
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Complete your profile
              </h1>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {sharedFields.map((field) => (
                  <FieldControl
                    key={field.key as string}
                    label={field.label}
                    error={errors[field.key as string]}
                    colSpan={field.type === "textarea" ? 2 : undefined}
                  >
                    {field.type === "textarea" ? (
                      <Textarea
                        value={values[field.key] as string}
                        onChange={(event) =>
                          updateField(field.key, event.target.value)
                        }
                        rows={3}
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                        aria-invalid={Boolean(errors[field.key as string])}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <Input
                        type={field.type ?? "text"}
                        value={values[field.key] as string}
                        onChange={(event) =>
                          updateField(field.key, event.target.value)
                        }
                        aria-invalid={Boolean(errors[field.key as string])}
                        placeholder={field.placeholder}
                      />
                    )}
                  </FieldControl>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Social media links (optional)
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(() => {
                    const socialMedia = values.socialMedia ?? {};
                    return (
                      <>
                        <FieldControl
                          label="LinkedIn"
                          error={errors["socialMedia.linkedin"]}
                        >
                          <Input
                            type="url"
                            value={(socialMedia.linkedin as string) ?? ""}
                            onChange={(event) =>
                              updateSocialMediaField(
                                "linkedin",
                                event.target.value
                              )
                            }
                            aria-invalid={Boolean(
                              errors["socialMedia.linkedin"]
                            )}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </FieldControl>
                        <FieldControl
                          label="Twitter / X"
                          error={errors["socialMedia.twitter"]}
                        >
                          <Input
                            type="url"
                            value={(socialMedia.twitter as string) ?? ""}
                            onChange={(event) =>
                              updateSocialMediaField(
                                "twitter",
                                event.target.value
                              )
                            }
                            aria-invalid={Boolean(
                              errors["socialMedia.twitter"]
                            )}
                            placeholder="https://twitter.com/yourhandle"
                          />
                        </FieldControl>
                        <FieldControl
                          label="GitHub"
                          error={errors["socialMedia.github"]}
                        >
                          <Input
                            type="url"
                            value={(socialMedia.github as string) ?? ""}
                            onChange={(event) =>
                              updateSocialMediaField(
                                "github",
                                event.target.value
                              )
                            }
                            aria-invalid={Boolean(errors["socialMedia.github"])}
                            placeholder="https://github.com/yourusername"
                          />
                        </FieldControl>
                        <FieldControl
                          label="Website"
                          error={errors["socialMedia.website"]}
                        >
                          <Input
                            type="url"
                            value={(socialMedia.website as string) ?? ""}
                            onChange={(event) =>
                              updateSocialMediaField(
                                "website",
                                event.target.value
                              )
                            }
                            aria-invalid={Boolean(
                              errors["socialMedia.website"]
                            )}
                            placeholder="https://yourwebsite.com"
                          />
                        </FieldControl>
                      </>
                    );
                  })()}
                </div>
              </div>

              {submitError && (
                <p className="text-sm text-destructive">{submitError}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving…" : "Submit profile"}
                </Button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </TwoSideLayout>
    );
  }

  return null;
}

type CenteredStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

function CenteredState({
  title,
  description,
  actionLabel,
  actionHref,
}: CenteredStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg text-center flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {actionLabel && actionHref && (
          <Button asChild>
            <a href={actionHref}>{actionLabel}</a>
          </Button>
        )}
      </div>
    </div>
  );
}
