import { CancelTokenSource } from 'axios';
import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';

import { Membership } from 'types/membership';
import { RequestTimestampPayload } from 'types/request';
import { Status } from 'types/status';

export interface IMembershipModelState {
  error: RequestTypeToError;
  memberships?: Membership[];
  request: Partial<Record<RequestType, CancelTokenSource | undefined>>;
  requestTimestamps: RequestTimestampPayload;
  status: RequestTypeToStatus;
}

const state: IMembershipModelState = {
  error: {},
  memberships: [],
  request: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: undefined }),
    {}
  ),
  requestTimestamps: { fresh: 0, stale: 0 },
  status: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: Status.idle }),
    {}
  ),
};

export default state;
