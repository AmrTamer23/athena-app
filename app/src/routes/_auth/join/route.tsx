import { createFileRoute } from "@tanstack/react-router";
import { Wizard } from "@/components/company_setup/wizard";

export const Route = createFileRoute("/_auth/join")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen p-4 bg-gradient-to-br from-background to-muted/20 flex flex-col gap-4 items-center justify-center">
      <h1 className="text-6xl font-serif font-black italic">Athena</h1>
      <Wizard />
    </main>
  );
}
