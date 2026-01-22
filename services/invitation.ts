export type InvitationStatus = "sent" | "expired" | "accepted";

export type TeamRole = 
  | "Product Manager"
  | "UX/UI Designer"
  | "Software Engineer"
  | "Data Analyst"
  | "Marketing Specialist"
  | "Sales Manager";

export interface Invitation {
  id: string;
  email: string;
  role: TeamRole;
  status: InvitationStatus;
  sentAt: Date;
  expiresAt: Date;
  avatar?: string;
}

export interface InvitationFormData {
  email: string;
  role: TeamRole;
}

let mockInvitations: Invitation[] = [
  {
    id: "1",
    email: "alex.johnson@example.com",
    role: "Product Manager",
    status: "sent",
    sentAt: new Date("2025-11-20"),
    expiresAt: new Date("2025-12-04"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "2",
    email: "maria.garcia@example.com",
    role: "UX/UI Designer",
    status: "expired",
    sentAt: new Date("2025-11-10"),
    expiresAt: new Date("2025-11-24"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  },
  {
    id: "3",
    email: "james.smith@example.com",
    role: "Software Engineer",
    status: "sent",
    sentAt: new Date("2025-11-22"),
    expiresAt: new Date("2025-12-06"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
];

export const invitationService = {
  async getInvitations(): Promise<Invitation[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...mockInvitations];
  },

  async sendInvitation(data: InvitationFormData): Promise<Invitation> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newInvitation: Invitation = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      role: data.role,
      status: "sent",
      sentAt: new Date(),
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
    };

    mockInvitations = [newInvitation, ...mockInvitations];
    return newInvitation;
  },

  async resendInvitation(id: string): Promise<Invitation> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const invitation = mockInvitations.find((inv) => inv.id === id);
    if (!invitation) throw new Error("Invitation not found");

    invitation.status = "sent";
    invitation.sentAt = new Date();
    invitation.expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    return invitation;
  },

  async deleteInvitation(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    mockInvitations = mockInvitations.filter((inv) => inv.id !== id);
  },

  async bulkInvite(invitations: InvitationFormData[]): Promise<Invitation[]> {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    const newInvitations = invitations.map((data) => ({
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      role: data.role,
      status: "sent" as InvitationStatus,
      sentAt: new Date(),
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
    }));

    mockInvitations = [...newInvitations, ...mockInvitations];
    return newInvitations;
  },
};

export const TEAM_ROLES: TeamRole[] = [
  "Product Manager",
  "UX/UI Designer",
  "Software Engineer",
  "Data Analyst",
  "Marketing Specialist",
  "Sales Manager",
];
