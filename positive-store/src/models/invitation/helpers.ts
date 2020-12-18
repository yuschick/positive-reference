import { scrubPII as scrubUserPII } from 'models/user/helpers';
import { Invitation, InvitationResponse } from 'types/invitation';
import { formatName } from 'utils/formatName';

export const formatInvitationResponse = (invitation: InvitationResponse): Invitation => ({
  id: invitation.ID,
  email: invitation.Email,
  role: invitation.Role,
  status: invitation.Status,
  group_id: invitation.GroupID,
  creator: {
    id: invitation.Creator?.ID,
    name: formatName(invitation.Creator?.GivenName, invitation.Creator?.FamilyName),
    givenName: invitation.Creator?.GivenName,
    familyName: invitation.Creator?.FamilyName,
  },
  type: invitation.Type,
});

export const scrubPII = (invitation: Invitation): Invitation => ({
  id: invitation.id,
  role: invitation.role,
  status: invitation.status,
  group_id: invitation.group_id,
  creator: scrubUserPII(invitation.creator),
});
