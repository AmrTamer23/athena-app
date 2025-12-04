import { fadeInVariants } from "@/lib/animations-settings";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TwoSideLayoutProps = {
  leftPanel: ReactNode;
  children: ReactNode;
};

export function TwoSideLayout({ leftPanel, children }: TwoSideLayoutProps) {
  return (
    <div className="flex w-full min-h-screen p-2 items-center justify-center">
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        className="relative hidden items-center justify-center overflow-hidden rounded-none sm:rounded-r-3xl lg:flex lg:w-[40%] flex-col"
      >
        {leftPanel}
      </motion.div>

      <main className="w-full flex flex-col gap-4 items-center justify-center lg:w-[60%] ">
        <div>
          <img
            src="/athena.avif"
            alt="athena hq"
            className="w-40 h-40 object-cover"
          />
        </div>
        {children}
      </main>
    </div>
  );
}
