import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldInfo } from "@/components/field_info";
import { useLoginForm } from "@/hooks/use_login_form";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/login")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      verified: (search.verified as string) || undefined,
      message: (search.message as string) || undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const form = useLoginForm();
  const { verified, message } = useSearch({ from: "/_auth/login" });

  useEffect(() => {
    if (verified === "true") {
      toast.success("Email verified successfully! You can now log in.");
    } else if (message) {
      if (message === "already_verified") {
        toast.info("Email already verified. You can log in.");
      }
    }
  }, [verified, message]);

  return (
    <div className=" flex items-center justify-center w-full">
      <div className="w-full max-w-sm bg-transparent border-0 shadow-none flex flex-col gap-6">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-muted-foreground">
            Sign in to your Athena HQ account
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <form.Field
              name="email"
              validators={{
                onBlur: ({ value }) =>
                  !value
                    ? "Email is required"
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                      ? "Please enter a valid email address"
                      : undefined,
              }}
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    size={4}
                    placeholder="Enter your email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <form.Field
              name="password"
              validators={{
                onBlur: ({ value }) =>
                  !value
                    ? "Password is required"
                    : value.length < 6
                      ? "Password must be at least 6 characters long"
                      : undefined,
              }}
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    size={4}
                    id={field.name}
                    name={field.name}
                    type="password"
                    placeholder="Enter your password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" className="w-full" disabled={!canSubmit}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            )}
          />
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link
            to="/join"
            className="text-primary-foreground hover:underline font-medium"
          >
            Join now
          </Link>
        </div>
      </div>
    </div>
  );
}
