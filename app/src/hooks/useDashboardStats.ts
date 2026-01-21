import { useMemo } from "react";
import { useTasks } from "./useTasks";
import { getCurrentUser } from "@/services/hierarchy";
import { dashboardService } from "@/services/dashboard";
import type { Task } from "@/services/task";

export interface DashboardStats {
  assignedTasks: Task[];
  inProgressTasks: Task[];
  todoTasks: Task[];
  doneTasks: Task[];
  onHoldTasks: Task[];
  needsReviewTasks: Task[];
  completionRate: number;
  averageCompletionTime: number;
  currentStreak: number;
  gamification: ReturnType<typeof dashboardService.getGamificationData>;
  taskCompletionData: {
    threeMonths: ReturnType<typeof dashboardService.getTaskCompletionData>;
    sixMonths: ReturnType<typeof dashboardService.getTaskCompletionData>;
    twelveMonths: ReturnType<typeof dashboardService.getTaskCompletionData>;
  };
}

export function useDashboardStats() {
  const currentUser = getCurrentUser();
  const { data: allTasks = [], isLoading } = useTasks({});

  const stats = useMemo((): DashboardStats => {
    const assignedTasks = allTasks.filter(
      (t) => t.assigneeId === currentUser.id
    );
    const inProgressTasks = assignedTasks.filter(
      (t) => t.status === "in_progress"
    );
    const todoTasks = assignedTasks.filter((t) => t.status === "assigned");
    const doneTasks = assignedTasks.filter(
      (t) => t.status === "completed" || t.status === "reviewed"
    );
    const onHoldTasks = assignedTasks.filter(
      (t) =>
        t.status === "assigned" && t.dueDate && new Date(t.dueDate) < new Date()
    );

    const needsReviewTasks = allTasks.filter(
      (t) => t.status === "completed" && t.assignerId === currentUser.id
    );

    const totalAssigned = assignedTasks.length;
    const completionRate =
      totalAssigned > 0 ? (doneTasks.length / totalAssigned) * 100 : 0;

    const completedWithDates = doneTasks.filter((t) => t.updatedAt);
    let averageCompletionTime = 0;
    if (completedWithDates.length > 0) {
      const totalTime = completedWithDates.reduce((acc, task) => {
        const created = new Date(task.createdAt).getTime();
        const updated = new Date(task.updatedAt).getTime();
        return acc + (updated - created);
      }, 0);
      averageCompletionTime = totalTime / completedWithDates.length / (1000 * 60 * 60 * 24);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let currentStreak = 0;
    const sortedDoneTasks = [...doneTasks]
      .filter((t) => t.updatedAt)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

    if (sortedDoneTasks.length > 0) {
      let checkDate = new Date(today);
      for (const task of sortedDoneTasks) {
        const taskDate = new Date(task.updatedAt);
        taskDate.setHours(0, 0, 0, 0);

        if (taskDate.getTime() === checkDate.getTime()) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else if (taskDate.getTime() < checkDate.getTime()) {
          break;
        }
      }
    }

    const gamification = dashboardService.getGamificationData(assignedTasks);

    return {
      assignedTasks,
      inProgressTasks,
      todoTasks,
      doneTasks,
      onHoldTasks,
      needsReviewTasks,
      completionRate: Math.round(completionRate * 10) / 10,
      averageCompletionTime: Math.round(averageCompletionTime * 10) / 10,
      currentStreak,
      gamification,
      taskCompletionData: {
        threeMonths: dashboardService.getTaskCompletionData(
          assignedTasks,
          3
        ),
        sixMonths: dashboardService.getTaskCompletionData(assignedTasks, 6),
        twelveMonths: dashboardService.getTaskCompletionData(
          assignedTasks,
          12
        ),
      },
    };
  }, [allTasks, currentUser.id]);

  return { data: stats, isLoading };
}

