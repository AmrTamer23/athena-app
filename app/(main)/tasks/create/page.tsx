"use client";

import { motion } from "framer-motion";
import { TaskForm } from "@/components/task/task_form";
import { fadeInVariants } from "@/lib/animations-settings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateTaskPage() {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6 w-full"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/tasks">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to tasks</span>
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold">Create New Task</h1>
              <p className="text-muted-foreground mt-1">
                Assign a new task to one of your team members
              </p>
            </div>
          </div>
        </div>
      </div>

      <TaskForm />
    </motion.div>
  );
}
