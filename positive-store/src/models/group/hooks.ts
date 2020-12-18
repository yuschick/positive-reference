import { ThunkCreator, ActionCreator } from 'easy-peasy';

import {
  CreateGroupPayload,
  DeleteGroupPayload,
  EditGroupPayload,
  FetchGroupsPayload,
} from './payloads';

import { usePositiveActions, usePositiveState } from 'store';
import { Group } from 'types/group';

export const useGroupState = () => usePositiveState((state) => state.groups);

export const useGroupActions: () => {
  createGroup: ThunkCreator<CreateGroupPayload, void>;
  deleteGroup: ThunkCreator<DeleteGroupPayload, void>;
  editGroup: ThunkCreator<EditGroupPayload, void>;
  fetchGroups: ThunkCreator<FetchGroupsPayload, void>;
  setGroups: ActionCreator<{ groups: Group[] }>;
  setSelectedGroup: ActionCreator<Group | undefined>;
  setSelectedGroupId: ActionCreator<string | undefined>;
} = () => {
  const {
    createGroup,
    deleteGroup,
    editGroup,
    fetchGroups,
    setGroups,
    setSelectedGroup,
    setSelectedGroupId,
  } = usePositiveActions((actions) => actions.groups);
  return {
    setSelectedGroup,
    setSelectedGroupId,
    createGroup,
    deleteGroup,
    editGroup,
    fetchGroups,
    setGroups,
  };
};
