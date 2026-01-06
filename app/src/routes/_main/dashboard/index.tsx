import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTasks } from "@/hooks/useTasks";
import { getCurrentUser } from "@/services/hierarchy";
import { Link } from "@tanstack/react-router";
import { fadeInVariants } from "@/lib/animations-settings";
import type { TaskStatus } from "@/services/task";
import { AlertCircle } from "lucide-react";

export const Route = createFileRoute("/_main/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const currentUser = getCurrentUser();
  const { data: allTasks = [] } = useTasks({});

  const assignedTasks = allTasks.filter((t) => t.assigneeId === currentUser.id);
  const inProgressTasks = assignedTasks.filter((t) => t.status === "in_progress");
  const todoTasks = assignedTasks.filter((t) => t.status === "assigned");
  const doneTasks = assignedTasks.filter((t) => t.status === "completed" || t.status === "reviewed");
  const onHoldTasks = assignedTasks.filter((t) => t.status === "assigned" && t.dueDate && new Date(t.dueDate) < new Date());
  
  const needsReviewTasks = allTasks.filter(
    (t) => t.status === "completed" && t.assignerId === currentUser.id
  );

  const TaskWidget = ({ title, count, status }: { title: string; count: number; status?: TaskStatus }) => (
    <Link
      to="/tasks"
      search={status ? { status } : undefined}
      className="block"
    >
      <Card className="p-6 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{count}</p>
        </div>
      </Card>
    </Link>
  );

  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6 w-full"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your tasks and activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TaskWidget title="In Progress" count={inProgressTasks.length} status="in_progress" />
        <TaskWidget title="To Do" count={todoTasks.length} status="assigned" />
        <TaskWidget title="Done" count={doneTasks.length} />
        <TaskWidget title="On Hold" count={onHoldTasks.length} />
      </div>

      {needsReviewTasks.length > 0 && (
        <Link
          to="/tasks"
          search={{ status: "completed", assignerId: currentUser.id }}
          className="block"
        >
          <Card className="p-6 hover:bg-accent/50 transition-colors cursor-pointer border-warning/50 bg-warning/10">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-warning" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Needs Review
                </p>
                <p className="text-sm text-muted-foreground">
                  {needsReviewTasks.length} task{needsReviewTasks.length !== 1 ? "s" : ""} completed and awaiting your review
                </p>
              </div>
              <p className="text-2xl font-bold text-warning">
                {needsReviewTasks.length}
              </p>
            </div>
          </Card>
        </Link>
      )}
    </motion.div>
  );
}
