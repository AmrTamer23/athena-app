import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { TooltipTrigger, TooltipContent, Tooltip } from "../ui/tooltip";
import { InfoIcon } from "lucide-react";

export interface CompanyInfoStepProps {
  form: {
    Field: <TName extends "companyName" | "companyIdentifier">(props: { name: TName; children: (field: { state: { value: string }; handleChange: (value: string) => void; handleBlur: () => void; name: TName } & Record<string, unknown>) => React.ReactNode }) => React.ReactElement;
  };
  errors: {
    [key: string]: string | undefined;
  };
  onBlur: (fieldName: string) => void;
}

export function CompanyInfoStep({
  form,
  errors,
  onBlur,
}: CompanyInfoStepProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-xl font-semibold">Company Information</h2>
        <p className="text-sm text-muted-foreground">
          Let&apos;s start by setting up your company workspace
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
        <form.Field name="companyName">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Acme Corporation"
                value={typeof field.state.value === "string" ? field.state.value : ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={() => onBlur("companyName")}
                size="lg"
              />
              <AnimatePresence mode="wait">
                {errors.companyName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-destructive"
                  >
                    {errors.companyName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </form.Field>

        <form.Field name="companyIdentifier">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="companyIdentifier"
                className="flex items-end gap-1"
              >
                <span>Company Identifier</span>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    This will be used in your company URL. Use lowercase
                    letters, numbers, and hyphens only.
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="companyIdentifier"
                placeholder="acme-corp"
                value={typeof field.state.value === "string" ? field.state.value : ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={() => onBlur("companyIdentifier")}
                size="lg"
              />

              <AnimatePresence mode="wait">
                {errors.companyIdentifier && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-destructive"
                  >
                    {errors.companyIdentifier}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </form.Field>
      </div>
    </div>
  );
}
