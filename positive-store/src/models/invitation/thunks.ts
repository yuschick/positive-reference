import { Thunk, thunk } from 'easy-peasy';
import axios, { AxiosInstance } from 'axios';

import { formatInvitationResponse } from './helpers';
import { IInvitationModel } from './model';
import { RequestType } from './requests';
import {
  FetchInvitationPayload,
  FetchGroupInvitationsPayload,
  InviteMemberPayload,
  DeleteInvitationPayload,
  AcceptInvitationPayload,
  ResendInvitationPayload,
} from './payloads';

import { paths } from 'api';
import { IStoreModel } from 'store';

import { Invitation, InvitationResponse } from 'types/invitation';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IInvitationModelThunks {
  acceptInvitation: Thunk<
    IInvitationModel,
    AcceptInvitationPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
  deleteInvitation: Thunk<
    IInvitationModel,
    DeleteInvitationPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
  fetchInvitation: Thunk<
    IInvitationModel,
    FetchInvitationPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
  fetchInvitations: Thunk<
    IInvitationModel,
    FetchGroupInvitationsPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
  sendInvitation: Thunk<
    IInvitationModel,
    InviteMemberPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
  resendInvitation: Thunk<
    IInvitationModel,
    ResendInvitationPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
}

const thunks: IInvitationModelThunks = {
  acceptInvitation: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.acceptInvitation !== Status.idle) return;
      actions.setStatus({ type: RequestType.acceptInvitation, value: Status.loading });

      await getStoreActions().auth.silentRefresh();

      try {
        await client.post(paths.invitation.accept(payload));

        actions.setError({ type: RequestType.acceptInvitation, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.acceptInvitation,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.acceptInvitation, value: Status.complete });
      }
    }
  ),

  deleteInvitation: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.deleteInvitation !== Status.idle) return;
      actions.setStatus({ type: RequestType.deleteInvitation, value: Status.loading });

      await getStoreActions().auth.silentRefresh();

      try {
        await client.delete(paths.invitation.delete(payload));

        const updatedInvitations = getState().invitations.filter(
          (i) => i.id !== payload.invitationId
        );

        actions.setGroupInvitations(updatedInvitations);
        actions.setError({ type: RequestType.deleteInvitation, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.deleteInvitation,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.deleteInvitation, value: Status.complete });
      }
    }
  ),

  fetchInvitation: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.fetchInvitation !== Status.idle) return;
      actions.setStatus({ type: RequestType.fetchInvitation, value: Status.loading });

      await getStoreActions().auth.silentRefresh();

      try {
        const {
          requestTimestamps: { fresh, stale },
        } = getState();
        const isCacheStale = fresh < stale;

        const invitation = await client
          .get(paths.invitation.get(payload), { clearCacheEntry: isCacheStale })
          .then(
            ({ data }: { data: InvitationResponse }): Invitation => formatInvitationResponse(data)
          );

        actions.setInvitation(invitation);
        actions.setError({ type: RequestType.fetchInvitation, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.fetchInvitation,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
        actions.setStatus({ type: RequestType.fetchInvitation, value: Status.complete });
      }
    }
  ),

  fetchInvitations: thunk(
    async (
      actions,
      payload,
      { getState, getStoreState, getStoreActions, injections: { client } }
    ) => {
      const requestToken = getState().request.fetchInvitations;
      if (requestToken) {
        requestToken.cancel();
      }

      await getStoreActions().auth.silentRefresh();

      const CancelToken = axios.CancelToken;
      const tokenSource = CancelToken.source();

      actions.setStatus({ type: RequestType.fetchInvitations, value: Status.loading });
      actions.setRequest({ type: RequestType.fetchInvitations, value: tokenSource });

      try {
        const {
          requestTimestamps: { fresh, stale },
        } = getState();
        const isCacheStale = fresh < stale;

        const data = await client
          .get(paths.group.invitations.get(payload), {
            cancelToken: tokenSource.token,
            clearCacheEntry: isCacheStale,
          })
          .then(({ data }: { data: InvitationResponse[] }): Invitation[] =>
            data.map((invite: InvitationResponse) => formatInvitationResponse(invite))
          );

        const { groups } = getStoreState().groups;
        const updatedGroup = groups?.find((g) => g.id === payload.groupId);

        actions.setGroupInvitations(
          updatedGroup?.invitations ? [...updatedGroup.invitations, ...data] : data
        );

        actions.setError({ type: RequestType.fetchInvitations, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.fetchInvitations,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
        actions.setStatus({ type: RequestType.fetchInvitations, value: Status.complete });
      }
    }
  ),

  sendInvitation: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.sendInvitation !== Status.idle) return;
      actions.setStatus({ type: RequestType.sendInvitation, value: Status.loading });

      await getStoreActions().auth.silentRefresh();

      try {
        const invitation: Invitation = await client
          .post(paths.group.memberships.post({ groupId: payload.groupId }), {
            Email: payload.email,
            Role: payload.role,
            Type: payload.invitationType,
          })
          .then(
            ({ data }: { data: InvitationResponse }): Invitation => formatInvitationResponse(data)
          );

        const { invitations } = getState();

        actions.setGroupInvitations([...invitations, invitation]);
        actions.setError({ type: RequestType.sendInvitation, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.sendInvitation,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.sendInvitation, value: Status.complete });
      }
    }
  ),

  resendInvitation: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.resendInvitation !== Status.idle) return;
      actions.setStatus({ type: RequestType.resendInvitation, value: Status.loading });

      await getStoreActions().auth.silentRefresh();

      try {
        await client.post(paths.invitation.resend(payload));
        actions.setError({ type: RequestType.resendInvitation, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.resendInvitation,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.resendInvitation, value: Status.complete });
      }
    }
  ),
};

export default thunks;
