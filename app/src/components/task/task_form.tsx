import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date_picker";
import { FieldInfo } from "@/components/field_info";
import { useTaskForm } from "@/hooks/useTaskForm";
import { getSubordinates, getCurrentUser } from "@/services/hierarchy";
import { TASK_PRIORITIES, TASK_CATEGORIES, TASK_TYPES } from "@/services/task";
import { Frame, FramePanel } from "@/components/ui/frame";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  FileText,
  User,
  Flag,
  Tag,
  Calendar,
  X,
} from "lucide-react";

const priorityLabels: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

const categoryLabels: Record<string, string> = {
  development: "Development",
  design: "Design",
  qa: "QA",
  marketing: "Marketing",
  other: "Other",
};

const typeLabels: Record<string, string> = {
  bug: "Bug",
  feature: "Feature",
  improvement: "Improvement",
  task: "Task",
  other: "Other",
};

type TaskFormProps = {
  taskId?: string;
};

export function TaskForm({ taskId }: TaskFormProps) {
  const { form, isSubmitting } = useTaskForm(taskId);
  const currentUser = getCurrentUser();
  const subordinates = getSubordinates(currentUser.id);

  const FormSection = ({
    icon: Icon,
    title,
    children,
  }: {
    icon: React.ComponentType<{ className?: string; size?: number }>;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" size={20} />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const FormField = ({
    icon: Icon,
    label,
    required,
    children,
    field,
  }: {
    icon?: React.ComponentType<{ className?: string; size?: number }>;
    label: string;
    required?: boolean;
    children: React.ReactNode;
    field?: any;
  }) => (
    <div className="flex flex-col gap-2">
      <Label className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" size={16} />}
        <span>{label}</span>
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {field && <FieldInfo field={field} />}
    </div>
  );

  return (
    <Frame>
      <FramePanel>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-6"
        >
          <FormSection icon={FileText} title="Basic Information">
            <form.Field name="title">
              {(field) => (
                <FormField icon={FileText} label="Title" required field={field}>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter a clear and descriptive task title"
                    className="w-full"
                  />
                </FormField>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <FormField
                  icon={FileText}
                  label="Description"
                  required
                  field={field}
                >
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Provide detailed information about the task"
                    rows={5}
                    className="w-full"
                  />
                </FormField>
              )}
            </form.Field>
          </FormSection>

          <Separator />

          <FormSection icon={User} title="Assignment">
            <form.Field name="assigneeId">
              {(field) => (
                <FormField icon={User} label="Assignee" required field={field}>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger id={field.name} className="w-full">
                      <SelectValue placeholder="Select a team member to assign this task" />
                    </SelectTrigger>
                    <SelectContent>
                      {subordinates.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              )}
            </form.Field>
          </FormSection>

          <Separator />

          <FormSection icon={Tag} title="Classification">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <form.Field name="priority">
                {(field) => (
                  <FormField icon={Flag} label="Priority" field={field}>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger id={field.name} className="w-full">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {TASK_PRIORITIES.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priorityLabels[priority]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                )}
              </form.Field>

              <form.Field name="category">
                {(field) => (
                  <FormField icon={Tag} label="Category" field={field}>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger id={field.name} className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {TASK_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {categoryLabels[category]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                )}
              </form.Field>

              <form.Field name="type">
                {(field) => (
                  <FormField icon={Tag} label="Type" field={field}>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger id={field.name} className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {TASK_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {typeLabels[type]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                )}
              </form.Field>
            </div>
          </FormSection>

          <Separator />

          <FormSection icon={Calendar} title="Timeline">
            <form.Field name="dueDate">
              {(field) => (
                <FormField icon={Calendar} label="Due Date" field={field}>
                  <DatePicker
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Select a due date (optional)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Optional: Set a deadline for this task
                  </p>
                </FormField>
              )}
            </form.Field>
          </FormSection>

          <Separator />

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              asChild
              disabled={isSubmitting}
            >
              <Link to="/tasks">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : taskId
                ? "Update Task"
                : "Create Task"}
            </Button>
          </div>
        </form>
      </FramePanel>
    </Frame>
  );
}
