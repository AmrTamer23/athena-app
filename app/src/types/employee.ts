export type EmploymentStatus = 'active' | 'on_leave' | 'terminated';
export type PerformanceTrend = 'improving' | 'declining' | 'stable';
export type SquadRole = 'member' | 'lead';
export type Level = 'Intern' | 'Junior' | 'Senior' | 'Staff' | 'Principal';

export interface SocialLinks {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
}

export interface Badge {
    id: string;
    name: string;
    icon: string; // URL or icon name
    description: string;
    earnedDate: string;
}

export interface GamificationStats {
    currentXp: number;
    currentLevel: Level;
    levelNumber: number;
    xpToNextLevel: number;
    lastXpUpdate: string;
    badges: Badge[];
}

export interface TaskAnalytics {
    totalTasksCompleted: number;
    tasksInProgress: number;
    tasksToDo: number;
    tasksOnHold: number;
    completionRate: number; // percentage 0-100
    averageCompletionTimeDays: number;
}

export interface PerformanceMetrics {
    overallRating: number; // 0.0 - 5.0
    totalFeedbackCount: number;
    fiveStarFeedbackCount: number;
    feedbackDistribution: Record<string, number>; // "5": 89
    trend: PerformanceTrend;
}

export interface SquadInfo {
    id: string;
    name: string;
    role: SquadRole;
}

export interface HierarchyInfo {
    reportsTo?: {
        id: string;
        name: string;
        avatarUrl?: string;
        role: string;
    };
    directReports?: {
        id: string;
        name: string;
        avatarUrl?: string;
        role: string;
    }[];
}

// Main Profile Interface
export interface EmployeeProfile {
    // Core Identity
    id: string;
    fullName: string;
    email: string;
    role: string;
    department: string;
    joinDate: string;
    avatarUrl?: string;
    status: EmploymentStatus;

    // Personal Info
    bio?: string;
    socialLinks: SocialLinks;

    // Sections
    gamification: GamificationStats;
    taskAnalytics: TaskAnalytics;
    performance: PerformanceMetrics;
    team: {
        squad?: SquadInfo;
        contact?: HierarchyInfo;
    };
}
