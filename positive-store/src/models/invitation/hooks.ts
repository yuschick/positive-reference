import { ThunkCreator } from 'easy-peasy';

import { scrubPII } from './helpers';
import {
  FetchInvitationPayload,
  FetchGroupInvitationsPayload,
  InviteMemberPayload,
  AcceptInvitationPayload,
  DeleteInvitationPayload,
  ResendInvitationPayload,
} from './payloads';

import { usePositiveActions, usePositiveState } from 'store';
import { Invitation } from 'types/invitation';

export const useInvitationState = () => usePositiveState((state) => state.invitations);

export const useInvitationActions: () => {
  acceptInvitation: ThunkCreator<AcceptInvitationPayload, void>;
  deleteInvitation: ThunkCreator<DeleteInvitationPayload, void>;
  fetchInvitations: ThunkCreator<FetchGroupInvitationsPayload, void>;
  fetchInvitation: ThunkCreator<FetchInvitationPayload, void>;
  sendInvitation: ThunkCreator<InviteMemberPayload, void>;
  resendInvitation: ThunkCreator<ResendInvitationPayload, void>;
  scrubPII: (invitation: Invitation) => Invitation;
} = () => {
  const {
    acceptInvitation,
    deleteInvitation,
    fetchInvitation,
    fetchInvitations,
    sendInvitation,
    resendInvitation,
  } = usePositiveActions((actions) => actions.invitations);
  return {
    acceptInvitation,
    deleteInvitation,
    fetchInvitations,
    fetchInvitation,
    sendInvitation,
    resendInvitation,
    scrubPII,
  };
};
