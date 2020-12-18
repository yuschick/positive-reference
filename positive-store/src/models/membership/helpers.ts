import { scrubPII as scrubUserPII } from 'models/user/helpers';

import { MembershipResponse, Membership } from 'types/membership';

export const formatMembershipsResponse = (memberships: MembershipResponse[]): Membership[] =>
  memberships
    .map((membership: MembershipResponse) => ({
      user: {
        id: membership.ID,
        familyName: membership.FamilyName,
        givenName: membership.GivenName,
        name: [membership.GivenName, membership.FamilyName].filter(Boolean).join(' '),
      },
      role: membership.Role,
    }))
    .sort((a: Membership, b: Membership) => {
      if (a.role < b.role) {
        return -1;
      } else if (a.role > b.role) {
        return 1;
      } else if (a.user.name && b.user.name && a.user.name < b.user.name) {
        return -1;
      } else if (a.user.name && b.user.name && a.user.name > b.user.name) {
        return 1;
      }
      return 0;
    });

export const formatMembershipResponse = (membership: MembershipResponse) => ({
  user: {
    id: membership.ID,
    familyName: membership.FamilyName,
    givenName: membership.GivenName,
    name: [membership.GivenName, membership.FamilyName].filter(Boolean).join(' '),
  },
  role: membership.Role,
});

export const scrubPII = (membership: Membership): Membership => ({
  role: membership.role,
  user: scrubUserPII(membership.user),
});
