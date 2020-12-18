import { computed, Computed } from 'easy-peasy';

import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';
import { isOrg, isOrphanClass, resolveRestrictedAccount } from './helpers';

import { Group, Organization, Class } from 'types/group';
import { RequestTimestampPayload } from 'types/request';
import { Status } from 'types/status';

export interface IGroupModelState {
  error: RequestTypeToError;
  groups: Group[];
  hasSelectableGroups: Computed<IGroupModelState, boolean>;
  nameMaxLength: number;
  nameMinLength: number;
  organizations: Computed<IGroupModelState, Organization[]>;
  orphanGroups: Computed<IGroupModelState, Class[]>;
  restrictedAccount: Computed<IGroupModelState, boolean>;
  requestTimestamps: RequestTimestampPayload;
  selectedGroup?: Group;
  selectedGroupId?: string;
  status: RequestTypeToStatus;
}

const state: IGroupModelState = {
  error: {},
  groups: [],
  hasSelectableGroups: computed(
    (state) => state.groups?.length > 0 || state.orphanGroups?.length > 0
  ),
  nameMaxLength: 32,
  nameMinLength: 1,
  organizations: computed(({ groups }) => groups.filter(isOrg)),
  orphanGroups: computed(({ groups }) => groups.filter(isOrphanClass)),
  restrictedAccount: computed((state) => resolveRestrictedAccount(state.groups)),
  requestTimestamps: { fresh: 0, stale: 0 },
  selectedGroup: undefined,
  selectedGroupId: undefined,
  status: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: Status.idle }),
    {}
  ),
};

export default state;
