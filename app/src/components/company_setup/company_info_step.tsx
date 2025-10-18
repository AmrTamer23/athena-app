import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface CompanyInfoStepProps {
  form: {
    Field: any;
  };
  errors: {
    [key: string]: string | undefined;
  };
}

export function CompanyInfoStep({ form, errors }: CompanyInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Company Information</h2>
        <p className="text-muted-foreground">
          Let's start by setting up your company workspace
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <form.Field name="companyName">
          {(field: any) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Acme Corporation"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
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
          {(field: any) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="companyIdentifier">Company Identifier</Label>
              <Input
                id="companyIdentifier"
                placeholder="acme-corp"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                size="lg"
              />
              <p className="text-xs text-muted-foreground ps-3">
                This will be used in your company URL. Use lowercase letters,
                numbers, and hyphens only.
              </p>
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
