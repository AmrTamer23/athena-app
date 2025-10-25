import { fadeInUpVariants, fadeInVariants } from "@/lib/animations-settings";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const pathname = useLocation();

  const welcomeMessage = pathname.pathname.includes("login")
    ? "Welcome back! Please sign in to continue"
    : "Start your journey with us today";

  return (
    <div className="flex w-full min-h-screen p-2">
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        className="relative hidden items-center justify-center overflow-hidden rounded-none sm:rounded-2xl lg:flex lg:w-[40%]"
      >
        <div className="absolute inset-0 rounded-2xl">
          <img src="/banner.avif" alt="background" className="inset-100" />
          <div className="absolute inset-0 rounded-2xl bg-pnrimary/60 opacity-90" />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-12 text-white">
          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          ></motion.div>

          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-sora mb-2 text-4xl font-bold text-[#f7ca71]">
              Welcome to Dalla Solutions
            </h1>
            <p className="font-sora text-md text-[#f7ca71] opacity-90">
              {welcomeMessage}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <main className="w-full flex flex-col gap-4 items-center justify-center lg:w-[60%] rounded-r-2xl">
        <Outlet />
      </main>
    </div>
  );
}
