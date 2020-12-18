import { ThunkCreator } from 'easy-peasy';

import { scrubPII } from './helpers';
import {
  FetchMembershipsPayload,
  EditMembershipPayload,
  DeleteMembershipPayload,
} from './payloads';

import { usePositiveActions, usePositiveState } from 'store';
import { Membership } from 'types/membership';

export const useMembershipState = () => usePositiveState((state) => state.memberships);

export const useMembershipActions: () => {
  deleteMembership: ThunkCreator<DeleteMembershipPayload, void>;
  editMembership: ThunkCreator<EditMembershipPayload, void>;
  fetchMemberships: ThunkCreator<FetchMembershipsPayload, void>;
  scrubPII: (membership: Membership) => Membership;
} = () => {
  const { deleteMembership, editMembership, fetchMemberships } = usePositiveActions(
    (actions) => actions.memberships
  );
  return {
    deleteMembership,
    editMembership,
    fetchMemberships,
    scrubPII,
  };
};
