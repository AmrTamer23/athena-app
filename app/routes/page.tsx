import Link from "next/link";
import { ROUTES_INFO } from "@/lib/routes-info";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RoutesPage() {
  return (
    <main className="flex flex-col items-center gap-8 p-8 min-h-screen">
      <h1 className="text-3xl font-semibold">App routes</h1>
      <ul className="grid gap-4 w-full max-w-2xl">
        {ROUTES_INFO.map(({ path, description, href }) => (
          <li key={path}>
            <Card>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="min-w-0">
                  <CardTitle className="font-mono text-sm">{path}</CardTitle>
                  <CardDescription className="mt-1">{description}</CardDescription>
                </div>
                <CardAction>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={href}>Open</Link>
                  </Button>
                </CardAction>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
      <Button variant="secondary" asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
