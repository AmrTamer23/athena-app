import { Card } from "@/components/ui/card";
import { TaskStatusBadge } from "./task_status_badge";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/services/task";
import { getUserById } from "@/services/hierarchy";
import { Link } from "@tanstack/react-router";
function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  let result = "";
  if (diffMins < 1) {
    result = "just now";
  } else if (diffMins < 60) {
    result = `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    result = `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    result = `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else {
    result = date.toLocaleDateString();
  }

  return result;
}
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: Task;
};

const priorityColors: Record<Task["priority"], string> = {
  low: "bg-blue-500/10 text-blue-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  high: "bg-orange-500/10 text-orange-500",
  urgent: "bg-red-500/10 text-red-500",
};

export function TaskCard({ task }: TaskCardProps) {
  const assignee = getUserById(task.assigneeId);
  const assigner = getUserById(task.assignerId);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed" && task.status !== "reviewed";

  return (
    <Link to="/tasks/$taskId" params={{ taskId: task.id }}>
      <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-sm truncate">{task.title}</h3>
              <TaskStatusBadge status={task.status} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={cn("text-xs", priorityColors[task.priority])}>
                {task.priority}
              </Badge>
              <span className="text-xs text-muted-foreground">{task.category}</span>
              <span className="text-xs text-muted-foreground">{task.type}</span>
              {task.dueDate && (
                <span className={cn("text-xs", isOverdue && "text-destructive font-medium")}>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              {assignee && <span>Assignee: {assignee.name}</span>}
              {assigner && <span>Assigned by: {assigner.name}</span>}
              <span>Updated {formatDistanceToNow(task.updatedAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

