import { Membership } from 'types/membership';

export type DeleteMembershipPayload = { groupId: string; memberId: string };

export type EditMembershipPayload = { membership: Membership; groupId: string };

export type FetchMembershipsPayload = { groupId: string };
