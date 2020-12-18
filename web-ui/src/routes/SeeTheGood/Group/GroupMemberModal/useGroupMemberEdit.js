import { useEffect, useState } from 'react';
import {
  useGroupState,
  useGroupActions,
  useInvitationActions,
  useInvitationState,
  useMembershipActions,
  useMembershipState,
  Status,
  useTranslation,
} from 'positive-store';

import useGroupMembershipApi from 'api/useGroupMembershipApi';
import useSentry from 'utils/useSentry';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useToast } from 'context/ToastContext';
import { useSession } from 'context/SessionContext/SessionContext';

const useGroupMemberEdit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [membership, setMembership] = useState(undefined);
  const [invitation, setInvitation] = useState(undefined);
  const [groupsBackup, setGroupsBackup] = useState(undefined);

  const { user } = useSession();

  const { setGroups } = useGroupActions();
  const { groups, selectedGroup } = useGroupState();
  const { deleteInvitation } = useInvitationActions();
  const { status: invitationStatus, error: invitationErrors } = useInvitationState();
  const { editMembership, deleteMembership } = useMembershipActions();
  const { status: membershipStatus, error: membershipErrors } = useMembershipState();

  const groupMembershipApi = useGroupMembershipApi();
  const sentry = useSentry();

  const { t } = useTranslation();
  const { addToast } = useToast();
  const { trackEvent } = useAnalytics();

  const memberIsUser = membership && membership.user.id === user.id;

  const formatGroupsToSet = groups => {
    groups = groups.sort((groupA, groupB) => {
      const nameA = groupA.name.toUpperCase();
      const nameB = groupB.name.toUpperCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    setGroups({ groups });
  };

  useEffect(() => {
    if (
      membershipStatus.deleteMembership === Status.complete &&
      membershipErrors.deleteMembership
    ) {
      addToast(t('route.see_the_good.errors.updating_membership'), true);
      sentry.capture({ error: groupMembershipApi.error });
      formatGroupsToSet(groupsBackup);
    }
  }, [membershipStatus.deleteMembership, membershipErrors.deleteMembership]);

  useEffect(() => {
    if (
      invitationStatus.deleteInvitation === Status.complete &&
      invitationErrors.deleteInvitation
    ) {
      addToast(t('route.see_the_good.errors.canceling_invitation'), true);
      sentry.capture({ error: invitationErrors.deleteInvitation.error });
      formatGroupsToSet(groupsBackup);
    }
  }, [invitationStatus.deleteInvitation, invitationErrors.deleteInvitation]);

  const updateMembership = membership => {
    setGroupsBackup(groups);
    editMembership({ groupId: selectedGroup.id, membership });
    trackEvent({ category: 'Group', action: 'Update Membership' });
  };

  const leaveGroup = membership => {
    setGroupsBackup(groups);
    editMembership({ groupId: selectedGroup.id, membership });
    trackEvent({ category: 'Group', action: 'Leave Group' });
  };

  const removeMember = membership => {
    setGroupsBackup(groups);
    deleteMembership({ groupId: selectedGroup.id, memberId: membership.user.id });
    trackEvent({ category: 'Group', action: 'Remove Member' });
  };

  const cancelInvitation = invitation => {
    setGroupsBackup(groups);
    deleteInvitation({ invitationId: invitation.id });
    trackEvent({ category: 'Group', action: 'Cancel Invitation' });
  };

  return {
    isOpen,
    setIsOpen,
    membership,
    setMembership,
    invitation,
    setInvitation,
    memberIsUser,
    updateMembership,
    removeMember,
    leaveGroup,
    cancelInvitation,
  };
};

export default useGroupMemberEdit;
