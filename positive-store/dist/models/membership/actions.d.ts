import { CancelTokenSource } from 'axios';
import { Action } from 'easy-peasy';
import { RequestType } from './requests';
import { IMembershipModel } from './model';
import { Membership } from 'types/membership';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
export interface IMembershipModelActions {
    setError: Action<IMembershipModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setMemberships: Action<IMembershipModel, Membership[]>;
    setRequest: Action<IMembershipModel, {
        type: RequestType;
        value: CancelTokenSource | undefined;
    }>;
    setRequestTimestamps: Action<IMembershipModel, {
        type: RequestTimestamp;
        value: number;
    }>;
    setStatus: Action<IMembershipModel, {
        type: RequestType;
        value: Status;
    }>;
}
declare const actions: IMembershipModelActions;
export default actions;
