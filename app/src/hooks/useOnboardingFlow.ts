import { useMemo, useState } from "react";
import { useForm, useStore } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  onboardingService,
  type BuddyProfile,
  type ChecklistPreview,
  type OnboardingProfilePayload,
  type RoleFieldDefinition,
} from "@/services/onboarding";
import {
  onboardingProfileSchema,
  type OnboardingProfileForm,
} from "@/lib/validations/onboarding";

type OnboardingStep = "welcome" | "profile-basic" | "checklist";

type FieldDefinition = {
  key: keyof OnboardingProfileForm;
  label: string;
  placeholder: string;
  type?: string;
};

const sharedFields: FieldDefinition[] = [
  {
    key: "preferredName",
    label: "Preferred name",
    placeholder: "Optional nickname",
  },
  { key: "timezone", label: "Timezone", placeholder: "UTC-5" },
  {
    key: "bio",
    label: "Professional snapshot",
    placeholder: "Tell the team about your focus and goals",
    type: "textarea",
  },
];

type UseOnboardingFlowArgs = {
  token?: string;
};

export const useOnboardingFlow = ({ token }: UseOnboardingFlowArgs) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [checklist, setChecklist] = useState<ChecklistPreview | null>(null);
  const [buddy, setBuddy] = useState<BuddyProfile | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inviteQuery = useQuery({
    queryKey: ["onboarding-invite", token],
    queryFn: () => onboardingService.verifyInvite(token),
    enabled: Boolean(token),
    staleTime: Infinity,
  });

  const getDefaultValues = (): OnboardingProfileForm => {
    const fullName = inviteQuery.data?.invite.fullName || "";
    const nameParts = fullName.split(" ");
    return {
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      preferredName: "",
      timezone: "",
      startDate: "",
      bio: "",
      roleDetails: {},
      socialMedia: {},
    };
  };

  const defaultValues = getDefaultValues();

  const form = useForm<
    OnboardingProfileForm,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  >({
    defaultValues,
  });

  const values = useStore(
    form.store,
    (state) => state.values
  ) as OnboardingProfileForm;
  const roleDetails = values.roleDetails as Record<string, string>;

  const roleFields = useMemo<RoleFieldDefinition[]>(() => {
    if (!inviteQuery.data) {
      return [];
    }
    return inviteQuery.data.roleFields;
  }, [inviteQuery.data]);

  const initialChecklist = inviteQuery.data?.checklist ?? null;
  const initialBuddy = inviteQuery.data?.buddy ?? null;

  const mutation = useMutation({
    mutationFn: onboardingService.submitProfile,
    onSuccess: (data) => {
      setChecklist(data.checklist);
      setBuddy(data.buddy);
      setCurrentStep("checklist");
    },
  });

  const applyValidationErrors = (issues: Record<string, string>) => {
    setErrors(issues);
    return Object.keys(issues).length === 0;
  };

  const buildGeneralValidation = (): Record<string, string> => {
    const generalIssues: Record<string, string> = {};
    const result = onboardingProfileSchema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        generalIssues[key] = issue.message;
      });
    }
    return generalIssues;
  };

  const appendRoleFieldErrors = (
    current: Record<string, string>
  ): Record<string, string> => {
    const next = { ...current };
    roleFields.forEach((field) => {
      const key = `roleDetails.${field.key}`;
      const fieldValue = roleDetails[field.key] ?? "";
      if (!fieldValue.trim()) {
        next[key] = "This field is required";
      } else {
        delete next[key];
      }
    });
    return next;
  };

  const validateForm = () => {
    const general = buildGeneralValidation();
    const merged = appendRoleFieldErrors(general);
    return applyValidationErrors(merged);
  };

  const validateBasicFields = (): Record<string, string> => {
    const general = buildGeneralValidation();
    const basicIssues: Record<string, string> = {};
    Object.keys(general).forEach((key) => {
      if (!key.startsWith("roleDetails.")) {
        basicIssues[key] = general[key];
      }
    });
    return basicIssues;
  };

  const updateField = (key: keyof OnboardingProfileForm, value: string) => {
    form.setFieldValue(key, () => value);
  };

  const updateRoleField = (key: string, value: string) => {
    form.setFieldValue("roleDetails", (prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateSocialMediaField = (key: string, value: string) => {
    form.setFieldValue("socialMedia", (prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!token) {
      setErrors({ token: "Missing invitation token" });
      return;
    }

    if (currentStep === "profile-basic") {
      const isValid = validateForm();
      if (!isValid) {
        return;
      }
      try {
        await mutation.mutateAsync({
          token,
          profile: values as OnboardingProfilePayload,
        });
      } catch {
        return;
      }
    }
  };

  const handleSkip = async () => {
    if (!token) {
      return;
    }

    if (currentStep === "profile-basic") {
      const basicIssues = validateBasicFields();
      const isValid = applyValidationErrors(basicIssues);
      if (!isValid) {
        return;
      }
      try {
        await mutation.mutateAsync({
          token,
          profile: values as OnboardingProfilePayload,
        });
      } catch {
        return;
      }
    }
  };

  const handleBlur = () => {
    validateForm();
  };

  const startProfile = () => {
    setCurrentStep("profile-basic");
  };

  return {
    inviteQuery,
    sharedFields,
    roleFields,
    values,
    errors,
    currentStep,
    isSubmitting: mutation.isPending,
    submitError:
      mutation.error instanceof Error ? mutation.error.message : null,
    checklist,
    initialChecklist,
    buddy,
    initialBuddy,
    startProfile,
    updateField,
    updateRoleField,
    updateSocialMediaField,
    handleSubmit,
    handleSkip,
    handleBlur,
  };
};
