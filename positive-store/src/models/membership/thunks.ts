import axios, { AxiosInstance } from 'axios';
import { Thunk, thunk } from 'easy-peasy';

import { IMembershipModel } from './model';
import { formatMembershipsResponse, formatMembershipResponse } from './helpers';
import { RequestType } from './requests';
import {
  FetchMembershipsPayload,
  EditMembershipPayload,
  DeleteMembershipPayload,
} from './payloads';

import { IStoreModel } from 'store';
import { paths } from 'api';

import { MembershipResponse, Membership } from 'types/membership';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IMembershipModelThunks {
  deleteMembership: Thunk<
    IMembershipModel,
    DeleteMembershipPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
  editMembership: Thunk<
    IMembershipModel,
    EditMembershipPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
  fetchMemberships: Thunk<
    IMembershipModel,
    FetchMembershipsPayload,
    { client: AxiosInstance },
    IStoreModel
  >;
}

const thunks: IMembershipModelThunks = {
  deleteMembership: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.deleteMembership !== Status.idle) return;
      actions.setStatus({ type: RequestType.deleteMembership, value: Status.loading });

      await getStoreActions().auth.silentRefresh();

      try {
        await client
          .delete(
            paths.group.memberships.delete({ groupId: payload.groupId, memberId: payload.memberId })
          )
          .then(
            ({ data }: { data: MembershipResponse }): Membership => formatMembershipResponse(data)
          );

        const { memberships } = getState();
        if (!memberships) return;

        const updatedMemberships = memberships.filter((m) => m.user.id !== payload.memberId);

        actions.setMemberships(updatedMemberships);
        actions.setError({ type: RequestType.deleteMembership, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.deleteMembership,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.deleteMembership, value: Status.complete });
      }
    }
  ),

  editMembership: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status.editMembership !== Status.idle) return;
      actions.setStatus({ type: RequestType.editMembership, value: Status.loading });

      await getStoreActions().auth.silentRefresh();

      try {
        const membership = await client
          .put(
            paths.group.memberships.edit({
              groupId: payload.groupId,
              memberId: payload.membership.user.id,
            }),
            { data: payload.membership }
          )
          .then(
            ({ data }: { data: MembershipResponse }): Membership => formatMembershipResponse(data)
          );

        const { memberships } = getState();
        if (!memberships) return;

        const updatedMemberships = [...memberships];
        const editIndex = updatedMemberships.findIndex((m) => m.id === membership.id);
        updatedMemberships[editIndex] = membership;

        actions.setMemberships(updatedMemberships);
        actions.setError({ type: RequestType.editMembership, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.editMembership,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.editMembership, value: Status.complete });
      }
    }
  ),

  fetchMemberships: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      const requestToken = getState().request.fetchMemberships;
      if (requestToken) {
        requestToken.cancel();
      }

      await getStoreActions().auth.silentRefresh();

      const CancelToken = axios.CancelToken;
      const tokenSource = CancelToken.source();

      actions.setStatus({ type: RequestType.fetchMemberships, value: Status.loading });
      actions.setRequest({ type: RequestType.fetchMemberships, value: tokenSource });

      try {
        const {
          requestTimestamps: { fresh, stale },
        } = getState();
        const isCacheStale = fresh < stale;

        const memberships = await client
          .get(paths.group.memberships.get(payload), {
            cancelToken: tokenSource.token,
            clearCacheEntry: isCacheStale,
          })
          .then(({ data }: { data: MembershipResponse[] }): Membership[] =>
            formatMembershipsResponse(data)
          );

        actions.setMemberships(memberships);
        actions.setError({ type: RequestType.fetchMemberships, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.fetchMemberships,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setStatus({ type: RequestType.fetchMemberships, value: Status.complete });
        actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
        actions.setRequest({ type: RequestType.fetchMemberships, value: undefined });
      }
    }
  ),
};

export default thunks;
