import { CancelTokenSource } from 'axios';
import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';
import { Membership } from 'types/membership';
import { RequestTimestampPayload } from 'types/request';
export interface IMembershipModelState {
    error: RequestTypeToError;
    memberships?: Membership[];
    request: Partial<Record<RequestType, CancelTokenSource | undefined>>;
    requestTimestamps: RequestTimestampPayload;
    status: RequestTypeToStatus;
}
declare const state: IMembershipModelState;
export default state;
