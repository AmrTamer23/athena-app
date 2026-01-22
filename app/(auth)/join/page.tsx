import { Wizard } from "@/components/company_setup/wizard";

export default function JoinPage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Create your workspace</h2>
        <p className="text-muted-foreground">
          Join Athena HQ and start your journey
        </p>
      </div>
      <Wizard />
    </div>
  );
}
