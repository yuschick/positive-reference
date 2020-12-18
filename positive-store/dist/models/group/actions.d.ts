import { Action } from 'easy-peasy';
import { RequestType } from './requests';
import { IGroupModel } from './model';
import { Group } from 'types/group';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
export interface IGroupModelActions {
    setError: Action<IGroupModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setGroups: Action<IGroupModel, {
        groups: Group[];
    }>;
    setRequestTimestamps: Action<IGroupModel, {
        type: RequestTimestamp;
        value: number;
    }>;
    setSelectedGroup: Action<IGroupModel, Group | undefined>;
    setSelectedGroupId: Action<IGroupModel, string | undefined>;
    setStatus: Action<IGroupModel, {
        type: RequestType;
        value: Status;
    }>;
}
declare const actions: IGroupModelActions;
export default actions;
