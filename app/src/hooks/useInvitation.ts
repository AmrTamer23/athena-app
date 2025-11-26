import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  invitationService,
  type InvitationFormData,
  type Invitation,
  type InvitationStatus,
  type TeamRole,
} from "@/services/invitation";
import { invitationFormSchema } from "@/lib/validations/invitation";

export const useInvitations = () => {
  const { data: invitations = [], isLoading } = useQuery({
    queryKey: ["invitations"],
    queryFn: () => invitationService.getInvitations(),
  });

  return { invitations, isLoading };
};

export const useInvitationForm = () => {
  const queryClient = useQueryClient();

  const sendInvitationMutation = useMutation({
    mutationFn: (data: InvitationFormData) =>
      invitationService.sendInvitation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success("Invitation sent successfully");
    },
    onError: () => {
      toast.error("Failed to send invitation");
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      role: "" as TeamRole,
    },
    onSubmit: async ({ value }) => {
      const result = invitationFormSchema.safeParse(value);
      if (!result.success) {
        return;
      }
      await sendInvitationMutation.mutateAsync(value);
      form.reset();
    },
  });

  return { form, isSubmitting: sendInvitationMutation.isPending };
};

export const useInvitationActions = () => {
  const queryClient = useQueryClient();

  const resendMutation = useMutation({
    mutationFn: (id: string) => invitationService.resendInvitation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success("Invitation resent successfully");
    },
    onError: () => {
      toast.error("Failed to resend invitation");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => invitationService.deleteInvitation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success("Invitation deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete invitation");
    },
  });

  const bulkInviteMutation = useMutation({
    mutationFn: (invitations: InvitationFormData[]) =>
      invitationService.bulkInvite(invitations),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success(`${data.length} invitations sent successfully`);
    },
    onError: () => {
      toast.error("Failed to send bulk invitations");
    },
  });

  return {
    resendInvitation: resendMutation.mutate,
    deleteInvitation: deleteMutation.mutate,
    bulkInvite: bulkInviteMutation.mutateAsync,
    isResending: resendMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isBulkInviting: bulkInviteMutation.isPending,
  };
};

export const useInvitationFilters = (invitations: Invitation[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<TeamRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<InvitationStatus | "all">(
    "all"
  );

  const filteredInvitations = invitations.filter((invitation) => {
    const matchesSearch = invitation.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "all" || invitation.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || invitation.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return {
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    filteredInvitations,
  };
};
