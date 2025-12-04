import { z } from "zod";

export const onboardingProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  preferredName: z.string().optional().default(""),
  timezone: z.string().min(2),
  startDate: z.string().optional().default(""),
  bio: z.string().min(10),
  roleDetails: z.record(z.string().min(1), z.string().min(1)).default({}),
  socialMedia: z
    .object({
      linkedin: z.string().url().optional().or(z.literal("")),
      twitter: z.string().url().optional().or(z.literal("")),
      github: z.string().url().optional().or(z.literal("")),
      website: z.string().url().optional().or(z.literal("")),
    })
    .optional()
    .default({}),
});

export type OnboardingProfileForm = z.infer<typeof onboardingProfileSchema>;
