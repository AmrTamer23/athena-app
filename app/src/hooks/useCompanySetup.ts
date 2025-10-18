import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  companyInfoSchema,
  decisionMakerSchema,
  type CompanySetupForm,
} from "@/lib/validations/company_setup";
import { createCompany } from "@/services/company";

type ValidationErrors = {
  [key: string]: string | undefined;
};

export const useCompanySetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const form = useForm({
    defaultValues: {
      companyName: "",
      companyIdentifier: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as CompanySetupForm,
  });

  const validateStep = async (step: number): Promise<boolean> => {
    const values = form.state.values;

    if (step === 1) {
      const result = companyInfoSchema.safeParse({
        companyName: values.companyName,
        companyIdentifier: values.companyIdentifier,
      });

      if (!result.success) {
        const newErrors: ValidationErrors = {};
        result.error.issues.forEach((error: any) => {
          const path = error.path[0] as string;
          newErrors[path] = error.message;
        });
        setErrors(newErrors);
        return false;
      }

      setErrors({});
      return true;
    }

    if (step === 2) {
      const result = decisionMakerSchema.safeParse({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (!result.success) {
        const newErrors: ValidationErrors = {};
        result.error.issues.forEach((error: any) => {
          const path = error.path[0] as string;
          newErrors[path] = error.message;
        });
        setErrors(newErrors);
        return false;
      }

      setErrors({});
      return true;
    }

    return true;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const values = form.state.values;
      const response = await createCompany({
        companyName: values.companyName,
        companyIdentifier: values.companyIdentifier,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      if (response.success) {
        setIsSuccess(true);
      } else {
        setSubmitError("Failed to create company. Please try again.");
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    currentStep,
    nextStep,
    previousStep,
    submitForm,
    isSubmitting,
    submitError,
    isSuccess,
    validateStep,
    errors,
  };
};
