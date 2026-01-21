import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export const Route = createFileRoute("/_auth/verify/$key")({
  component: VerifyComponent,
});

function VerifyComponent() {
  const { key } = useParams({ from: "/_auth/verify/$key" });
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const API_BASE_URL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const response = await fetch(
          `${API_BASE_URL}/authentication/verify/${key}/`,
          {
            method: "GET",
            credentials: "include",
            redirect: "follow",
          }
        );

        if (response.ok || response.redirected) {
          const finalUrl = response.url;
          if (finalUrl.includes("verified=true")) {
            setStatus("success");
            setMessage("Email verified successfully! You can now log in.");
            toast.success("Email verified successfully!");
            setTimeout(() => {
              navigate({ to: "/login", search: { verified: "true" } });
            }, 2000);
          } else if (finalUrl.includes("already_verified")) {
            setStatus("success");
            setMessage("Email already verified. You can log in.");
            toast.info("Email already verified.");
            setTimeout(() => {
              navigate({ to: "/login" });
            }, 2000);
          } else {
            setStatus("error");
            setMessage("Verification failed. The link may be invalid or expired.");
            toast.error("Verification failed");
          }
        } else {
          setStatus("error");
          setMessage("Verification failed. Please try again.");
          toast.error("Verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
        toast.error("Verification error");
      }
    };

    if (key) {
      verifyEmail();
    }
  }, [key, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      {status === "verifying" && (
        <>
          <Loader className="w-8 h-8 animate-spin" />
          <p className="text-muted-foreground">Verifying your email...</p>
        </>
      )}
      {status === "success" && (
        <>
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-green-500">{message}</p>
          <p className="text-sm text-muted-foreground">
            Redirecting to login...
          </p>
        </>
      )}
      {status === "error" && (
        <>
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-red-500">{message}</p>
          <button
            onClick={() => navigate({ to: "/login" })}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Go to Login
          </button>
        </>
      )}
    </div>
  );
}
