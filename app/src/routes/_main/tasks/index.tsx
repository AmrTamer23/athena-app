import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TaskTable } from "@/components/task/task_table";
import { TaskFiltersComponent } from "@/components/task/task_filters";
import { useTasks } from "@/hooks/useTasks";
import { getCurrentUser } from "@/services/hierarchy";
import type { TaskFilters } from "@/services/task";
import { fadeInVariants } from "@/lib/animations-settings";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

export const Route = createFileRoute("/_main/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  const currentUser = getCurrentUser();
  const [view, setView] = useState<"assigned_to_me" | "assigned_by_me" | "all">(
    "assigned_to_me"
  );
  const [filters, setFilters] = useState<TaskFilters>({});

  const taskFilters: TaskFilters = {
    ...filters,
    ...(view === "assigned_to_me" ? { assigneeId: currentUser.id } : {}),
    ...(view === "assigned_by_me" ? { assignerId: currentUser.id } : {}),
  };

  const { data: tasks = [], isLoading } = useTasks(taskFilters);

  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6 w-full"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your tasks</p>
        </div>
        <Button asChild>
          <Link to="/tasks/create">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Task
          </Link>
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant={view === "all" ? "default" : "secondary"}
          onClick={() => setView("all")}
        >
          All Tasks
        </Button>
        <Button
          variant={view === "assigned_to_me" ? "default" : "secondary"}
          onClick={() => setView("assigned_to_me")}
        >
          Assigned to Me
        </Button>
        <Button
          variant={view === "assigned_by_me" ? "default" : "secondary"}
          onClick={() => setView("assigned_by_me")}
        >
          Assigned by Me
        </Button>
      </div>

      <TaskFiltersComponent filters={filters} onFiltersChange={setFilters} />

      <TaskTable tasks={tasks} isLoading={isLoading} />
    </motion.div>
  );
}
