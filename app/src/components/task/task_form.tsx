import { useForm } from "@tanstack/react-form";
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
import { Card } from "@/components/ui/card";

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

  return (
    <Card className="p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-6"
      >
        <form.Field name="title">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter task title"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Description</Label>
              <Textarea
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter task description"
                rows={5}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="assigneeId">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Assignee</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {subordinates.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <form.Field name="priority">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Priority</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger id={field.name}>
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
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="category">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Category</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger id={field.name}>
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
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="type">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Type</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger id={field.name}>
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
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="dueDate">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Due Date (Optional)</Label>
              <DatePicker
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                placeholder="Select due date"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <div className="flex gap-3 justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : taskId
              ? "Update Task"
              : "Create Task"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
