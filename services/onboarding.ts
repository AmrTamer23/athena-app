import { onboardingProfileSchema } from "@/lib/validations/onboarding";

export type OnboardingInvite = {
  token: string;
  email: string;
  fullName: string;
  role: string;
  companyName: string;
  startDate: string;
};

export type RoleFieldDefinition = {
  key: string;
  label: string;
  placeholder: string;
};

export type ChecklistStep = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
};

export type ChecklistPreview = {
  id: string;
  title: string;
  steps: ChecklistStep[];
};

export type BuddyProfile = {
  name: string;
  role: string;
  email: string;
  timezone: string;
};

type VerifyInviteResponse = {
  invite: OnboardingInvite;
  roleFields: RoleFieldDefinition[];
  checklist: ChecklistPreview;
  buddy: BuddyProfile;
};

type SubmitProfileArgs = {
  token: string;
  profile: OnboardingProfilePayload;
};

export type OnboardingProfilePayload = {
  firstName: string;
  lastName: string;
  preferredName: string;
  timezone: string;
  startDate: string;
  bio: string;
  roleDetails: Record<string, string>;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
};

type SubmitProfileResponse = {
  checklist: ChecklistPreview;
  buddy: BuddyProfile;
};

const mockInvites: Record<string, OnboardingInvite> = {
  alpha123: {
    token: "alpha123",
    email: "sara.engineer@example.com",
    fullName: "Sara Park",
    role: "Senior Engineer",
    companyName: "Athena Labs",
    startDate: "2025-12-05",
  },
  beta789: {
    token: "beta789",
    email: "marco.pm@example.com",
    fullName: "Marco Carver",
    role: "Project Manager",
    companyName: "Athena Labs",
    startDate: "2025-12-12",
  },
};

const roleFieldLibrary: Record<string, RoleFieldDefinition[]> = {
  "Senior Engineer": [
    {
      key: "primaryStack",
      label: "Primary stack focus",
      placeholder: "React, GraphQL, etc.",
    },
    {
      key: "recentWins",
      label: "Recent project highlight",
      placeholder: "Ship or initiative you are proud of",
    },
  ],
  "Project Manager": [
    {
      key: "favoriteFramework",
      label: "Preferred planning framework",
      placeholder: "Scrum, Kanban, Shape Up, etc.",
    },
    {
      key: "tools",
      label: "Tooling comfort",
      placeholder: "Linear, Jira, ClickUp, etc.",
    },
  ],
};

const checklistLibrary: Record<string, ChecklistPreview> = {
  "Senior Engineer": {
    id: "se-onboarding",
    title: "Senior Engineer ramp-up",
    steps: [
      {
        id: "stack-tour",
        title: "Architecture deep dive",
        description: "Review Athena Labs front-end stack overview",
        status: "pending",
      },
      {
        id: "env-setup",
        title: "Environment ready",
        description: "Clone repos and configure tooling",
        status: "pending",
      },
      {
        id: "shadowing",
        title: "Shadow squad standups",
        description: "Attend two squad ceremonies with buddy",
        status: "pending",
      },
    ],
  },
  "Project Manager": {
    id: "pm-onboarding",
    title: "Project Manager warm-up",
    steps: [
      {
        id: "playbooks",
        title: "Review playbooks",
        description: "Read PM excellence docs",
        status: "pending",
      },
      {
        id: "tooling",
        title: "Tooling access",
        description: "Gain access to delivery boards",
        status: "pending",
      },
      {
        id: "handoff",
        title: "Meet outgoing PM",
        description: "Sync with previous project owner",
        status: "pending",
      },
    ],
  },
};

const buddies: Record<string, BuddyProfile> = {
  "Senior Engineer": {
    name: "Noah Lin",
    role: "Staff Engineer",
    email: "noah.lin@example.com",
    timezone: "UTC-5",
  },
  "Project Manager": {
    name: "Priya Mehta",
    role: "Head of Delivery",
    email: "priya.mehta@example.com",
    timezone: "UTC+1",
  },
};

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const resolveRoleFields = (role: string) =>
  roleFieldLibrary[role] ?? [
    {
      key: "roleContext",
      label: "Role context",
      placeholder: "Share focus areas for this role",
    },
  ];

const resolveChecklist = (role: string) =>
  checklistLibrary[role] ?? {
    id: "generic-onboarding",
    title: "Welcome checklist",
    steps: [
      {
        id: "intro",
        title: "Complete intro form",
        description: "Fill in your background and goals",
        status: "pending",
      },
      {
        id: "buddy-sync",
        title: "Meet your buddy",
        description: "Schedule the kickoff call",
        status: "pending",
      },
    ],
  };

const resolveBuddy = (role: string) =>
  buddies[role] ?? {
    name: "Operations Team",
    role: "People Ops",
    email: "people.ops@example.com",
    timezone: "UTC",
  };

export const onboardingService = {
  async verifyInvite(token: string | undefined): Promise<VerifyInviteResponse> {
    if (!token) {
      throw new Error("Missing invitation token");
    }
    await delay(400);
    const invite = mockInvites[token];
    if (!invite) {
      throw new Error("Invitation not found or expired");
    }
    const roleFields = resolveRoleFields(invite.role);
    const checklist = resolveChecklist(invite.role);
    const buddy = resolveBuddy(invite.role);
    return { invite, roleFields, checklist, buddy };
  },
  async submitProfile({
    token,
    profile,
  }: SubmitProfileArgs): Promise<SubmitProfileResponse> {
    if (!token) {
      throw new Error("Missing invitation token");
    }
    onboardingProfileSchema.parse(profile);
    await delay(500);
    const invite = mockInvites[token];
    if (!invite) {
      throw new Error("Invitation not found or expired");
    }
    return {
      checklist: resolveChecklist(invite.role),
      buddy: resolveBuddy(invite.role),
    };
  },
};
