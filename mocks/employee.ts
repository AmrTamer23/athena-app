import type { EmployeeProfile } from "@/types/employee";

export const MOCK_EMPLOYEE_PROFILE: EmployeeProfile = {
  id: "user_1",
  fullName: "John Doe",
  role: "Senior Engineer",
  avatarUrl: "/avatar.jpg",
  department: "Engineering",
  joinDate: "2024-01-15",
  status: "active",
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
  gamification: {
    levelNumber: 5,
    currentXp: 750,
    xpToNextLevel: 1000,
    badges: [
      {
        id: "badge_1",
        name: "Task Master",
        description: "Completed 100+ tasks",
        unlockedAt: "2024-11-01",
      },
      {
        id: "badge_2",
        name: "5-Star Performer",
        description: "Received 10+ 5-star reviews",
        unlockedAt: "2024-10-15",
      },
    ],
  },
  taskAnalytics: {
    totalTasksCompleted: 125,
    tasksInProgress: 8,
    tasksToDo: 3,
    tasksOnHold: 2,
    completionRate: 92,
  },
  performance: {
    overallRating: 4.8,
    totalFeedbackCount: 45,
    fiveStarFeedbackCount: 38,
    feedbackDistribution: {
      "5": 38,
      "4": 5,
      "3": 2,
      "2": 0,
      "1": 0,
    },
    trend: "+0.3 this month",
  },
  team: {
    squad: {
      id: "squad_1",
      name: "Frontend Team",
      role: "Tech Lead",
    },
    contact: {
      reportsTo: {
        id: "user_cto",
        name: "Jane Smith",
        role: "CTO",
        avatarUrl: "/avatar-jane.jpg",
      },
      directReports: [
        {
          id: "user_junior_1",
          name: "Alice Johnson",
          role: "Junior Engineer",
          avatarUrl: "/avatar-alice.jpg",
        },
        {
          id: "user_junior_2",
          name: "Bob Williams",
          role: "Junior Engineer",
          avatarUrl: "/avatar-bob.jpg",
        },
      ],
    },
  },
};
