import { Computed } from 'easy-peasy';
import { RequestTypeToError, RequestTypeToStatus } from './requests';
import { Moment, TempMoment } from 'types/moment';
import { RequestTimestampPayload } from 'types/request';
export interface IMomentModelState {
    cursor?: string;
    error: RequestTypeToError;
    firstMomentFlag: boolean;
    moments: Moment[];
    moreMomentsExist: Computed<IMomentModelState, boolean>;
    requestTimestamps: RequestTimestampPayload;
    status: RequestTypeToStatus;
    tempMoments: TempMoment[];
}
declare const state: IMomentModelState;
export default state;
