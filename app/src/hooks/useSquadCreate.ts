import { useForm } from '@tanstack/react-form';
// import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
// import { useNavigate } from '@tanstack/react-router';
// import { useMutation } from '@tanstack/react-query'; // Uncomment when API is ready

export const squadSchema = z.object({
  squadName: z.string().min(3, "Squad name must be at least 3 characters"),
  squadDescription: z.string().optional(),
  techStack: z.array(z.string()).min(1, "Select at least one technology"),
  squadLeader: z.string().min(1, "Squad leader is required"),
  roles: z.record(z.string(), z.number())
});

export type SquadFormValues = z.infer<typeof squadSchema>;

export function useSquadCreate(initialValues?: Partial<SquadFormValues>) {
  // const navigate = useNavigate();

  // Mock submission
  const onSubmit = async ({ value }: { value: SquadFormValues }) => {
    console.log("Form submitted:", value);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // navigate({ to: '/squads' }); // Uncomment when route exists
  };

  const form = useForm({
    defaultValues: {
      squadName: initialValues?.squadName || "",
      squadDescription: initialValues?.squadDescription || "",
      techStack: initialValues?.techStack || [] as string[],
      squadLeader: initialValues?.squadLeader || "",
      roles: initialValues?.roles || {} as Record<string, number>
    },
    onSubmit,
    // validatorAdapter: zodValidator,
  });

  return { form };
}

// Mock data fetcher for edit route
export const getMockSquad = async (id: string): Promise<SquadFormValues> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate latency
  return {
    squadName: `Squad ${id}`,
    squadDescription: "This is a mock squad description loaded for editing.",
    techStack: ["React", "TypeScript", "Tailwind"],
    squadLeader: "user-1", // Assuming 'user-1' is a valid ID from the UserSelect mock
    roles: {
      "Senior Engineer": 2,
      "Junior Engineer": 3
    }
  };
};
