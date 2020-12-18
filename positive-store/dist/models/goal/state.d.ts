import { RequestTypeToError, RequestTypeToStatus } from './requests';
import { Goal } from 'types/goal';
import { RequestTimestampPayload } from 'types/request';
export interface IGoalModelState {
    error: RequestTypeToError;
    firstGoalFlag: boolean;
    goals: Goal[];
    requestTimestamps: RequestTimestampPayload;
    status: RequestTypeToStatus;
}
declare const state: IGoalModelState;
export default state;
