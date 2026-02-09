import { useQuery } from "@tanstack/react-query";
import { taskService, type TaskFilters } from "@/services/task";

export function useTasks(filters: TaskFilters = {}) {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => taskService.getTasks(filters),
    staleTime: 1000 * 30,
  });
}

export function useTask(taskId: string | undefined) {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => (taskId ? taskService.getTaskById(taskId) : undefined),
    enabled: Boolean(taskId),
    staleTime: 1000 * 60,
  });
}

