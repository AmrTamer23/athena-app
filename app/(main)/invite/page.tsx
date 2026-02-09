"use client";

import { motion } from "framer-motion";
import { InviteForm } from "@/components/invitation/invite_form";
import { PendingInvitations } from "@/components/invitation/pending_invitations";
import { fadeInVariants } from "@/lib/animations-settings";

export default function InvitePage() {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-4 w-full"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Invite New Team Member</h1>
        <p className="text-muted-foreground">
          Add new people to your team and manage pending invitations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <InviteForm />

        <PendingInvitations />
      </div>
    </motion.div>
  );
}
