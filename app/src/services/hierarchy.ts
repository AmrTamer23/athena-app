export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  managerId?: string;
}

const ROLE_HIERARCHY: Record<string, number> = {
  CEO: 1,
  CTO: 2,
  "Product Manager": 3,
  "Senior Engineer": 4,
  "Software Engineer": 5,
  "Junior Engineer": 6,
  "UX/UI Designer": 5,
  "Data Analyst": 5,
  "Marketing Specialist": 5,
  "Sales Manager": 3,
  Intern: 7,
};

let mockUsers: User[] = [
  {
    id: "user_ceo",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "CEO",
  },
  {
    id: "user_cto",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "CTO",
    managerId: "user_ceo",
  },
  {
    id: "user_pm",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "Product Manager",
    managerId: "user_ceo",
  },
  {
    id: "user_senior_eng",
    name: "David Kim",
    email: "david@example.com",
    role: "Senior Engineer",
    managerId: "user_cto",
  },
  {
    id: "user_eng",
    name: "Alex Martinez",
    email: "alex@example.com",
    role: "Software Engineer",
    managerId: "user_senior_eng",
  },
  {
    id: "user_junior_eng",
    name: "Jordan Taylor",
    email: "jordan@example.com",
    role: "Junior Engineer",
    managerId: "user_eng",
  },
];

export function getRoleHierarchyLevel(role: string): number {
  return ROLE_HIERARCHY[role] ?? 999;
}

export function getUserById(userId: string): User | undefined {
  return mockUsers.find((u) => u.id === userId);
}

export function getSubordinates(userId: string): User[] {
  const user = getUserById(userId);
  if (!user) return [];

  return mockUsers.filter((u) => u.managerId === userId);
}

export function canAssignTask(assignerId: string, assigneeId: string): boolean {
  const assigner = getUserById(assignerId);
  const assignee = getUserById(assigneeId);

  if (!assigner || !assignee) return false;

  if (assignerId === assigneeId) return false;

  const assignerLevel = getRoleHierarchyLevel(assigner.role);
  const assigneeLevel = getRoleHierarchyLevel(assignee.role);

  if (assignerLevel >= assigneeLevel) return false;

  const isDirectReport = assignee.managerId === assignerId;

  return isDirectReport || assignerLevel < assigneeLevel;
}

export function getAllUsers(): User[] {
  return [...mockUsers];
}

export function getCurrentUser(): User {
  return mockUsers[4];
}

