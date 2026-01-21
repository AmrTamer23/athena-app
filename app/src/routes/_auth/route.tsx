import { fadeInUpVariants, fadeInVariants } from "@/lib/animations-settings";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getCurrentUser } from "@/services/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        throw redirect({
          to: "/dashboard",
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("redirect")) {
        throw error;
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex w-full min-h-screen p-2">
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        className="relative hidden items-center justify-center overflow-hidden rounded-none sm:rounded-2xl lg:flex lg:w-[40%] flex-col "
      >
        <img
          src="/VERT_athena.avif"
          alt="background"
          className="inset-0 object-contain w-[60%] scale-150"
        />

        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="absolute left-1/2 -translate-x-1/2 top-20"
        >
          <h1 className="font-sans mb-2 text-4xl font-medium text-primary-foreground text-center leading-relaxed">
            Welcome to{"   "}
            <span className="font-serif italic text-6xl ml-1">Athena</span>
          </h1>
        </motion.div>
      </motion.div>

      <main className="w-full flex flex-col gap-4 items-center justify-center lg:w-[60%] rounded-r-2xl">
        <div>
          <img
            src="/athena.avif"
            alt="athena hq"
            className="w-40 h-40 object-cover"
          />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
