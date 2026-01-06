import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TaskForm } from "@/components/task/task_form";
import { useTask } from "@/hooks/useTasks";
import { fadeInVariants } from "@/lib/animations-settings";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_main/tasks/edit/$taskId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data: task, isLoading, error } = useTask(taskId);

  if (isLoading) {
    return (
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-6 w-full"
      >
        <Card className="p-6">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      </motion.div>
    );
  }

  if (error || !task) {
    return (
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-6 w-full"
      >
        <Card className="p-6">
          <p className="text-destructive">Task not found</p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6 w-full"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Task</h1>
        <p className="text-muted-foreground">
          Update task details
        </p>
      </div>

      <TaskForm taskId={taskId} />
    </motion.div>
  );
}
