import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect } from "react";
import { taskFormSchema, type TaskFormValues } from "@/lib/validations/task";
import { taskService } from "@/services/task";
import { getCurrentUser } from "@/services/hierarchy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTask } from "./useTasks";
import { toast } from "sonner";

function validateWithZod(value: TaskFormValues) {
  const result = taskFormSchema.safeParse(value);
  if (result.success) {
    return undefined;
  }

  const fieldErrors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const fieldName = issue.path[0] as string;
    if (!fieldErrors[fieldName]) {
      fieldErrors[fieldName] = issue.message;
    }
  });

  return fieldErrors;
}

export function useTaskForm(taskId?: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  const { data: task } = useTask(taskId);

  const createMutation = useMutation({
    mutationFn: (data: TaskFormValues) => taskService.createTask(data, currentUser.id),
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully");
      navigate({ to: "/tasks" });
    },
    onError: () => {
      toast.error("Failed to create task");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: TaskFormValues) => {
      if (!taskId) throw new Error("Task ID is required");
      return taskService.updateTask(taskId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success("Task updated successfully");
      navigate({ to: "/tasks" });
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      assigneeId: "",
      priority: "medium" as const,
      category: "development" as const,
      type: "task" as const,
      dueDate: "",
    } as TaskFormValues,
    onSubmit: async ({ value }) => {
      if (taskId) {
        updateMutation.mutate(value);
      } else {
        createMutation.mutate(value);
      }
    },
    validators: {
      onSubmit: ({ value }) => validateWithZod(value),
      onBlur: ({ value }) => validateWithZod(value),
    },
  });

  useEffect(() => {
    if (task) {
      form.setFieldValue("title", task.title);
      form.setFieldValue("description", task.description);
      form.setFieldValue("assigneeId", task.assigneeId);
      form.setFieldValue("priority", task.priority);
      form.setFieldValue("category", task.category);
      form.setFieldValue("type", task.type);
      form.setFieldValue("dueDate", task.dueDate || "");
    }
  }, [task, form]);

  return {
    form,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
}

