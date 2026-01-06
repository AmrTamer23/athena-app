import type { EmployeeProfile } from "@/types/employee";

export const MOCK_EMPLOYEE_PROFILE: EmployeeProfile = {
    id: "emp-123",
    fullName: "Sarah Connor",
    email: "sarah.connor@athena.tech",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    joinDate: "2024-03-15",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
    status: "active",

    bio: "Passionate about building accessible and performant user interfaces. I love React, TypeScript, and clean code. When I'm not coding, I'm usually hiking or playing chess.",

    socialLinks: {
        github: "https://github.com/sarahconnor",
        linkedin: "https://linkedin.com/in/sarahconnor",
        portfolio: "https://sarah.dev"
    },

    gamification: {
        currentXp: 4500,
        currentLevel: "Senior",
        levelNumber: 12,
        xpToNextLevel: 5000,
        lastXpUpdate: "2025-01-05T10:30:00Z",
        badges: [
            {
                id: "b1",
                name: "Bug Hunter",
                icon: "bug",
                description: "Resolved 50 critical bugs",
                earnedDate: "2024-11-20"
            },
            {
                id: "b2",
                name: "Team Player",
                icon: "users",
                description: "Received 10 peer appreciations",
                earnedDate: "2024-12-15"
            },
            {
                id: "b3",
                name: "Code Ninja",
                icon: "code",
                description: "Completed 100 tasks",
                earnedDate: "2025-01-02"
            }
        ]
    },

    taskAnalytics: {
        totalTasksCompleted: 142,
        tasksInProgress: 5,
        tasksToDo: 8,
        tasksOnHold: 2,
        completionRate: 94.5,
        averageCompletionTimeDays: 2.4
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
            "1": 0
        },
        trend: "improving"
    },

    team: {
        squad: {
            id: "sq-alpha",
            name: "Alpha Squad",
            role: "lead"
        },
        contact: {
            reportsTo: {
                id: "mgr-01",
                name: "Ellen Ripley",
                role: "Engineering Manager",
                avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces"
            },
            directReports: [
                {
                    id: "dev-02",
                    name: "John Wick",
                    role: "Junior Developer",
                    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces"
                }
            ]
        }
    }
};
