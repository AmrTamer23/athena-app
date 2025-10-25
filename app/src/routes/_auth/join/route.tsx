import { createFileRoute } from "@tanstack/react-router";
import { Wizard } from "@/components/company_setup/wizard";

export const Route = createFileRoute("/_auth/join")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full">
      <Wizard />
    </div>
  );
}
