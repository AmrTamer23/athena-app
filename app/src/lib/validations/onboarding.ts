import { z } from "zod";

export const onboardingProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  preferredName: z.string().optional().default(""),
  timezone: z.string().min(2),
  startDate: z.string().optional().default(""),
  bio: z.string().min(10),
  roleDetails: z.record(z.string(), z.string()).optional().default({}),
  socialMedia: z
    .object({
      linkedin: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val || val.trim() === "") return true;
            return z.string().url().safeParse(val).success;
          },
          {
            message: "Must be a valid URL",
          }
        ),
      twitter: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val || val.trim() === "") return true;
            return z.string().url().safeParse(val).success;
          },
          {
            message: "Must be a valid URL",
          }
        ),
      github: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val || val.trim() === "") return true;
            return z.string().url().safeParse(val).success;
          },
          {
            message: "Must be a valid URL",
          }
        ),
      website: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val || val.trim() === "") return true;
            return z.string().url().safeParse(val).success;
          },
          {
            message: "Must be a valid URL",
          }
        ),
    })
    .passthrough()
    .optional()
    .default({}),
});

export type OnboardingProfileForm = z.infer<typeof onboardingProfileSchema>;
