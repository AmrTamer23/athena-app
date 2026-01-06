import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskStatusSelector } from "./task_status_selector";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Task } from "@/services/task";
import { getUserById, getCurrentUser } from "@/services/hierarchy";
import { useTaskStatusUpdate } from "@/hooks/useTaskStatusUpdate";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type TaskDetailsProps = {
  task: Task;
};

const priorityColors: Record<Task["priority"], string> = {
  low: "bg-blue-500/10 text-blue-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  high: "bg-orange-500/10 text-orange-500",
  urgent: "bg-red-500/10 text-red-500",
};

function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return "just now";
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export function TaskDetails({ task }: TaskDetailsProps) {
  const assignee = getUserById(task.assigneeId);
  const assigner = getUserById(task.assignerId);
  const currentUser = getCurrentUser();
  const statusUpdate = useTaskStatusUpdate();
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed" && task.status !== "reviewed";
  const canEdit = task.assignerId === currentUser.id;
  const canUpdateStatus = task.assigneeId === currentUser.id || task.assignerId === currentUser.id;

  const handleStatusChange = (newStatus: typeof task.status) => {
    statusUpdate.mutate({ taskId: task.id, status: newStatus });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={cn("text-xs", priorityColors[task.priority])}>
                {task.priority}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {task.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {task.type}
              </Badge>
            </div>
          </div>
          {canEdit && (
            <Button asChild variant="secondary">
              <Link to="/tasks/edit/$taskId" params={{ taskId: task.id }}>
                Edit Task
              </Link>
            </Button>
          )}
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Assignee</h3>
              <p className="text-sm text-muted-foreground">
                {assignee ? `${assignee.name} (${assignee.role})` : "Unknown"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Assigned By</h3>
              <p className="text-sm text-muted-foreground">
                {assigner ? `${assigner.name} (${assigner.role})` : "Unknown"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Status</h3>
              {canUpdateStatus ? (
                <TaskStatusSelector
                  value={task.status}
                  onValueChange={handleStatusChange}
                  disabled={statusUpdate.isPending}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{task.status}</p>
              )}
            </div>

            {task.dueDate && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Due Date</h3>
                <p className={cn("text-sm", isOverdue && "text-destructive font-medium")}>
                  {new Date(task.dueDate).toLocaleDateString()}
                  {isOverdue && " (Overdue)"}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold mb-2">Created</h3>
              <p className="text-sm text-muted-foreground">
                {task.createdAt.toLocaleDateString()} ({formatDistanceToNow(task.createdAt)})
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Last Updated</h3>
              <p className="text-sm text-muted-foreground">
                {task.updatedAt.toLocaleDateString()} ({formatDistanceToNow(task.updatedAt)})
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

