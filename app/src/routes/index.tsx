import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 h-full">
      <h1 className="text-4xl font-medium">
        Welcome to{" "}
        <span className="font-serif font-black italic text-6xl">Athena</span>
      </h1>
      <div className="flex gap-4 items-center justify-center">
        <Button variant="secondary" size="lg">
          Login
        </Button>
        <Button size="lg" asChild>
          <Link to="/join">Join</Link>
        </Button>
      </div>
    </main>
  );
}
