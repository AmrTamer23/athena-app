import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 h-full">
      <h1 className="text-4xl font-medium">
        Welcome to{" "}
        <span className="font-serif font-black italic text-6xl">Athena</span>
      </h1>
      <div className="flex gap-4 items-center justify-center">
        <Button variant="secondary" size="lg" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href="/join">Join</Link>
        </Button>
      </div>
    </main>
  );
}
