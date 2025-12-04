import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useInvitations,
  useInvitationActions,
  useInvitationFilters,
} from "@/hooks/useInvitation";
import { SearchIcon, MoreHorizontalIcon, SendIcon, Trash2Icon } from "lucide-react";
import { fadeInUpVariants } from "@/lib/animations-settings";
import type { InvitationStatus } from "@/services/invitation";

const statusConfig: Record<
  InvitationStatus,
  { label: string; variant: "success" | "warning" | "secondary" }
> = {
  sent: { label: "Sent", variant: "success" },
  expired: { label: "Expired", variant: "warning" },
  accepted: { label: "Accepted", variant: "secondary" },
};

export function PendingInvitations() {
  const { invitations, isLoading } = useInvitations();
  const { resendInvitation, deleteInvitation } = useInvitationActions();

  const {
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    filteredInvitations,
  } = useInvitationFilters(invitations);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading invitations...</p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Pending Onboarding</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track your team invitation status
          </p>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={roleFilter}
            onValueChange={(value) => setRoleFilter(value as any)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>{roleFilter === "all" ? "All Roles" : roleFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Product Manager">Product Manager</SelectItem>
              <SelectItem value="UX/UI Designer">UX/UI Designer</SelectItem>
              <SelectItem value="Software Engineer">Software Engineer</SelectItem>
              <SelectItem value="Data Analyst">Data Analyst</SelectItem>
              <SelectItem value="Marketing Specialist">Marketing Specialist</SelectItem>
              <SelectItem value="Sales Manager">Sales Manager</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as any)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {statusFilter === "all" ? "All Statuses" : statusConfig[statusFilter].label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredInvitations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No invitations found</p>
            </div>
          ) : (
            filteredInvitations.map((invitation, index) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <img
                  src={invitation.avatar}
                  alt={invitation.email}
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{invitation.email}</p>
                  <p className="text-sm text-muted-foreground">{invitation.role}</p>
                </div>

                <Badge variant={statusConfig[invitation.status].variant}>
                  {statusConfig[invitation.status].label}
                </Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {invitation.status !== "accepted" && (
                      <DropdownMenuItem
                        onClick={() => resendInvitation(invitation.id)}
                      >
                        <SendIcon />
                        Resend Invitation
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => deleteInvitation(invitation.id)}
                    >
                      <Trash2Icon />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </motion.div>
  );
}
