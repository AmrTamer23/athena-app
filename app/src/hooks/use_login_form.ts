import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Helper function to properly validate with Zod and return string errors
function validateWithZod(value: LoginFormData) {
  const result = loginSchema.safeParse(value);
  if (result.success) {
    return undefined;
  }

  // Extract the first error message for each field
  const fieldErrors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const fieldName = issue.path[0] as string;
    if (!fieldErrors[fieldName]) {
      fieldErrors[fieldName] = issue.message;
    }
  });

  return fieldErrors;
}

export function useLoginForm() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginFormData,
    onSubmit: async ({}) => {
      navigate({ to: "/dashboard" });
    },
    validators: {
      onSubmit: ({ value }) => validateWithZod(value),
      onBlur: ({ value }) => validateWithZod(value),
    },
  });

  return form;
}
