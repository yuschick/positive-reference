import { GroupRole } from 'types/Group';
import { InvitationType } from 'types/invitation';

export type AcceptInvitationPayload = { invitationId: string };

export type DeleteInvitationPayload = { invitationId: string };

export type FetchInvitationPayload = { token: string };
export type FetchGroupInvitationsPayload = { groupId: string };

export type InviteMemberPayload = {
  groupId: string;
  email: string;
  role: GroupRole;
  invitationType: InvitationType;
};

export type ResendInvitationPayload = { invitationId: string };
