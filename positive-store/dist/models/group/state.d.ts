import { Computed } from 'easy-peasy';
import { RequestTypeToError, RequestTypeToStatus } from './requests';
import { Group, Organization, Class } from 'types/group';
import { RequestTimestampPayload } from 'types/request';
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
declare const state: IGroupModelState;
export default state;
