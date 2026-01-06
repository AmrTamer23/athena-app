import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TaskForm } from "@/components/task/task_form";
import { fadeInVariants } from "@/lib/animations-settings";

export const Route = createFileRoute("/_main/tasks/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6 w-full"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Task</h1>
        <p className="text-muted-foreground">
          Assign a new task to one of your team members
        </p>
      </div>

      <TaskForm />
    </motion.div>
  );
}
