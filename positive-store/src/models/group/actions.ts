import { Action, action } from 'easy-peasy';

import { RequestType } from './requests';
import { IGroupModel } from './model';

import { Group } from 'types/group';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IGroupModelActions {
  setError: Action<
    IGroupModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setGroups: Action<IGroupModel, { groups: Group[] }>;
  setRequestTimestamps: Action<IGroupModel, { type: RequestTimestamp; value: number }>;
  setSelectedGroup: Action<IGroupModel, Group | undefined>;
  setSelectedGroupId: Action<IGroupModel, string | undefined>;
  setStatus: Action<IGroupModel, { type: RequestType; value: Status }>;
}

const actions: IGroupModelActions = {
  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setGroups: action((state, payload) => {
    state.groups = payload.groups;
  }),

  setRequestTimestamps: action((state, payload) => {
    state.requestTimestamps[payload.type] = payload.value;
  }),

  setSelectedGroup: action((state, payload) => {
    state.selectedGroup = payload;
  }),

  setSelectedGroupId: action((state, payload) => {
    state.selectedGroupId = payload;
  }),

  setStatus: action((state, payload) => {
    state.status[payload.type] = payload.value;
  }),
};

export default actions;
