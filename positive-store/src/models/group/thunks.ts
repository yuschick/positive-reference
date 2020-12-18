import { AxiosInstance } from 'axios';
import { Thunk, thunk } from 'easy-peasy';

import {
  CreateGroupPayload,
  DeleteGroupPayload,
  EditGroupPayload,
  FetchGroupsPayload,
} from './payloads';
import { IGroupModel } from './model';
import { RequestType } from './requests';
import { appendChildGroups, formatGroupsResponse } from './helpers';

import { IStoreModel } from 'store';
import { paths } from 'api';

import { Group, GroupResponse } from 'types/group';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IGroupModelThunks {
  createGroup: Thunk<IGroupModel, CreateGroupPayload, { client: AxiosInstance }, IStoreModel>;
  deleteGroup: Thunk<IGroupModel, DeleteGroupPayload, { client: AxiosInstance }, IStoreModel>;
  editGroup: Thunk<IGroupModel, EditGroupPayload, { client: AxiosInstance }, IStoreModel>;
  fetchGroups: Thunk<IGroupModel, FetchGroupsPayload, { client: AxiosInstance }, IStoreModel>;
}

const thunks: IGroupModelThunks = {
  createGroup: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      actions.setStatus({ type: RequestType.createGroup, value: Status.loading });
      await getStoreActions().auth.silentRefresh();

      const groups = getState().groups;

      try {
        await getStoreActions().auth.silentRefresh();

        const [newGroup] = await client
          .post(
            payload.parentGroupId
              ? paths.group.create.subgroup({ groupId: payload.parentGroupId })
              : paths.group.create.group(),
            payload
          )
          .then(({ data }: { data: GroupResponse }): Group[] => formatGroupsResponse([data]));

        /* UPDATE GROUPS */
        const updatedGroups = groups.concat(newGroup);
        updatedGroups && actions.setGroups({ groups: updatedGroups });

        /* SET NEW GROUP TO SELECTED GROUP */
        actions.setSelectedGroupId(newGroup.id);
        actions.setError({ type: RequestType.createGroup, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.createGroup,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.createGroup, value: Status.complete });
      }
    }
  ),

  deleteGroup: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      actions.setStatus({ type: RequestType.deleteGroup, value: Status.loading });
      await getStoreActions().auth.silentRefresh();

      const groups = getState().groups;

      try {
        await getStoreActions().auth.silentRefresh();

        /* DELETE GROUP */
        await client.delete(paths.group.delete(payload));

        /* REMOVE DELETED GROUP FROM GROUPS */
        const updatedGroups: Group[] =
          groups.filter((group: Group) => group.id !== payload.groupId) || [];

        actions.setGroups({ groups: updatedGroups });
        actions.setError({ type: RequestType.deleteGroup, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.deleteGroup,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.deleteGroup, value: Status.complete });
      }
    }
  ),

  editGroup: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      actions.setStatus({ type: RequestType.editGroup, value: Status.loading });
      await getStoreActions().auth.silentRefresh();

      const groups = getState().groups;

      try {
        await getStoreActions().auth.silentRefresh();

        await client
          .put(paths.group.edit({ groupId: payload.group.id }), payload.group)
          .then(() => {
            const updatedGroups = groups?.map((group: Group) =>
              group.id === payload.group.id
                ? {
                    ...group,
                    ...payload.group,
                  }
                : group
            );

            updatedGroups && actions.setGroups({ groups: updatedGroups });
            actions.setError({ type: RequestType.editGroup, value: undefined });
          });
      } catch (error) {
        actions.setError({
          type: RequestType.editGroup,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.editGroup, value: Status.complete });
      }
    }
  ),

  fetchGroups: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status[RequestType.fetchGroups] !== Status.idle) return;

      actions.setStatus({ type: RequestType.fetchGroups, value: Status.loading });
      await getStoreActions().auth.silentRefresh();

      try {
        const {
          requestTimestamps: { fresh, stale },
        } = getState();
        const isCacheStale = fresh < stale;

        const groups: Group[] = await client
          .get(
            payload?.groupId ? paths.group.get({ groupId: payload.groupId }) : paths.groups.get(),
            { clearCacheEntry: isCacheStale }
          )
          .then(({ data }: { data: GroupResponse[] | GroupResponse }): Group[] =>
            appendChildGroups(formatGroupsResponse(Array.isArray(data) ? data : [data]))
          );

        actions.setGroups({ groups });
        actions.setError({ type: RequestType.fetchGroups, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.fetchGroups,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
        actions.setStatus({ type: RequestType.fetchGroups, value: Status.complete });
      }
    }
  ),
};

export default thunks;
