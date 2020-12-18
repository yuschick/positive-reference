import { CancelTokenSource } from 'axios';
import { Action } from 'easy-peasy';
import { RequestType } from './requests';
import { IInvitationModel } from './model';
import { Invitation } from 'types/invitation';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
export interface IInvitationModelActions {
    setError: Action<IInvitationModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setGroupInvitations: Action<IInvitationModel, Invitation[]>;
    setInvitation: Action<IInvitationModel, Invitation>;
    setRequest: Action<IInvitationModel, {
        type: RequestType;
        value: CancelTokenSource | undefined;
    }>;
    setRequestTimestamps: Action<IInvitationModel, {
        type: RequestTimestamp;
        value: number;
    }>;
    setStatus: Action<IInvitationModel, {
        type: RequestType;
        value: Status;
    }>;
}
declare const actions: IInvitationModelActions;
export default actions;
