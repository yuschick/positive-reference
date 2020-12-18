import { CancelTokenSource } from 'axios';
import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';
import { Invitation } from 'types/invitation';
import { RequestTimestampPayload } from 'types/request';
export interface IInvitationModelState {
    error: RequestTypeToError;
    invitation?: Invitation;
    invitations: Invitation[];
    request: Partial<Record<RequestType, CancelTokenSource | undefined>>;
    requestTimestamps: RequestTimestampPayload;
    status: RequestTypeToStatus;
}
declare const state: IInvitationModelState;
export default state;
