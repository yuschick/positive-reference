import { computed, Computed } from 'easy-peasy';

import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';

import { Moment, TempMoment } from 'types/moment';
import { RequestTimestampPayload } from 'types/request';
import { Status } from 'types/status';

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

const state: IMomentModelState = {
  cursor: undefined,
  error: {},
  firstMomentFlag: false,
  moments: [],
  moreMomentsExist: computed(({ cursor }) => !!cursor),
  requestTimestamps: { fresh: 0, stale: 0 },
  status: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: Status.idle }),
    {}
  ),
  tempMoments: [],
};

export default state;
