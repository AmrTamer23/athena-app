import type { User } from "./hierarchy";

export type TaskStatus = "assigned" | "in_progress" | "completed" | "reviewed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskCategory = "development" | "design" | "qa" | "marketing" | "other";
export type TaskType = "bug" | "feature" | "improvement" | "task" | "other";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignerId: string;
  assigneeId: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  type: TaskType;
  dueDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskData {
  title: string;
  description: string;
  assigneeId: string;
  priority: TaskPriority;
  category: TaskCategory;
  type: TaskType;
  dueDate?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  assigneeId?: string;
  priority?: TaskPriority;
  category?: TaskCategory;
  type?: TaskType;
  dueDate?: string;
}

export interface TaskFilters {
  assigneeId?: string;
  assignerId?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: TaskCategory;
  type?: TaskType;
  dueDateFrom?: string;
  dueDateTo?: string;
}

let mockTasks: Task[] = [
  {
    id: "task_1",
    title: "Implement user authentication",
    description: "Add login and signup functionality with JWT tokens",
    assignerId: "user_cto",
    assigneeId: "user_senior_eng",
    status: "in_progress",
    priority: "high",
    category: "development",
    type: "feature",
    dueDate: "2025-12-15",
    createdAt: new Date("2025-11-20"),
    updatedAt: new Date("2025-11-22"),
  },
  {
    id: "task_2",
    title: "Fix login button styling",
    description: "The login button is not aligned properly on mobile devices",
    assignerId: "user_senior_eng",
    assigneeId: "user_eng",
    status: "assigned",
    priority: "medium",
    category: "development",
    type: "bug",
    dueDate: "2025-12-10",
    createdAt: new Date("2025-11-25"),
    updatedAt: new Date("2025-11-25"),
  },
  {
    id: "task_3",
    title: "Design new dashboard layout",
    description: "Create wireframes and mockups for the new dashboard design",
    assignerId: "user_pm",
    assigneeId: "user_eng",
    status: "completed",
    priority: "high",
    category: "design",
    type: "feature",
    dueDate: "2025-11-30",
    createdAt: new Date("2025-11-15"),
    updatedAt: new Date("2025-11-28"),
  },
  {
    id: "task_4",
    title: "Write unit tests for auth module",
    description: "Add comprehensive unit tests for authentication functions",
    assignerId: "user_senior_eng",
    assigneeId: "user_junior_eng",
    status: "reviewed",
    priority: "medium",
    category: "qa",
    type: "task",
    dueDate: "2025-12-05",
    createdAt: new Date("2025-11-18"),
    updatedAt: new Date("2025-11-29"),
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter((task) => {
    if (filters.assigneeId && task.assigneeId !== filters.assigneeId) return false;
    if (filters.assignerId && task.assignerId !== filters.assignerId) return false;
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.category && task.category !== filters.category) return false;
    if (filters.type && task.type !== filters.type) return false;
    if (filters.dueDateFrom && task.dueDate && task.dueDate < filters.dueDateFrom) return false;
    if (filters.dueDateTo && task.dueDate && task.dueDate > filters.dueDateTo) return false;
    return true;
  });
}

export const taskService = {
  async createTask(data: CreateTaskData, assignerId: string): Promise<Task> {
    await delay(800);

    const newTask: Task = {
      id: `task_${Math.random().toString(36).substring(2, 9)}`,
      title: data.title,
      description: data.description,
      assignerId,
      assigneeId: data.assigneeId,
      status: "assigned",
      priority: data.priority,
      category: data.category,
      type: data.type,
      dueDate: data.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockTasks = [newTask, ...mockTasks];
    return newTask;
  },

  async getTasks(filters: TaskFilters = {}): Promise<Task[]> {
    await delay(500);
    return filterTasks([...mockTasks], filters);
  },

  async getTaskById(id: string): Promise<Task | undefined> {
    await delay(300);
    return mockTasks.find((t) => t.id === id);
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    await delay(500);

    const task = mockTasks.find((t) => t.id === id);
    if (!task) throw new Error("Task not found");

    task.status = status;
    task.updatedAt = new Date();

    return task;
  },

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    await delay(600);

    const task = mockTasks.find((t) => t.id === id);
    if (!task) throw new Error("Task not found");

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.assigneeId !== undefined) task.assigneeId = data.assigneeId;
    if (data.priority !== undefined) task.priority = data.priority;
    if (data.category !== undefined) task.category = data.category;
    if (data.type !== undefined) task.type = data.type;
    if (data.dueDate !== undefined) task.dueDate = data.dueDate;
    task.updatedAt = new Date();

    return task;
  },

  async deleteTask(id: string): Promise<void> {
    await delay(400);
    mockTasks = mockTasks.filter((t) => t.id !== id);
  },
};

export const TASK_PRIORITIES: TaskPriority[] = ["low", "medium", "high", "urgent"];
export const TASK_CATEGORIES: TaskCategory[] = ["development", "design", "qa", "marketing", "other"];
export const TASK_TYPES: TaskType[] = ["bug", "feature", "improvement", "task", "other"];
export const TASK_STATUSES: TaskStatus[] = ["assigned", "in_progress", "completed", "reviewed"];

