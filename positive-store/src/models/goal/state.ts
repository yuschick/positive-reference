import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';

import { Goal } from 'types/goal';
import { RequestTimestampPayload } from 'types/request';
import { Status } from 'types/status';

export interface IGoalModelState {
  error: RequestTypeToError;
  firstGoalFlag: boolean;
  goals: Goal[];
  requestTimestamps: RequestTimestampPayload;
  status: RequestTypeToStatus;
}

const state: IGoalModelState = {
  error: {},
  firstGoalFlag: false,
  goals: [],
  requestTimestamps: { fresh: 0, stale: 0 },
  status: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: Status.idle }),
    {}
  ),
};

export default state;
