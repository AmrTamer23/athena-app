import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CompanyInfoStep } from "./company_info_step";
import { DecisionMakerStep } from "./decision_maker_step";
import { ConfirmationStep } from "./confirmation_step";
import { useCompanySetup } from "@/hooks/useCompanySetup";

import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";

export function Wizard() {
  const {
    form,
    currentStep,
    nextStep,
    previousStep,
    submitForm,
    isSubmitting,
    submitError,
    isSuccess,
    validateStep,
    validateField,
    errors,
  } = useCompanySetup();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate({ to: "/" });
      }, 2000);
    }
  }, [isSuccess, navigate]);

  const handleNext = async () => {
    await nextStep();
  };

  const handleSubmit = async () => {
    const isValid = await validateStep(2);
    if (isValid) {
      await submitForm();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyInfoStep form={form} errors={errors} onBlur={validateField} />
        );
      case 2:
        return (
          <DecisionMakerStep
            form={form}
            errors={errors}
            onBlur={validateField}
          />
        );
      case 3:
        return (
          <ConfirmationStep
            formData={form.state.values}
            isSuccess={isSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                    step === currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : step < currentStep
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-muted bg-background text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`h-0.5 w-12 transition-colors ${
                      step < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStep()}

        {submitError && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {submitError}
          </div>
        )}

        {!isSuccess && (
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={currentStep === 1 || isSubmitting}
            >
              Back
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext} disabled={isSubmitting}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader />
                    Creating...
                  </>
                ) : (
                  "Create Workspace"
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
