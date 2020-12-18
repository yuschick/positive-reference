import { CancelTokenSource } from 'axios';

import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';

import { Invitation } from 'types/invitation';
import { RequestTimestampPayload } from 'types/request';
import { Status } from 'types/status';

export interface IInvitationModelState {
  error: RequestTypeToError;
  invitation?: Invitation;
  invitations: Invitation[];
  request: Partial<Record<RequestType, CancelTokenSource | undefined>>;
  requestTimestamps: RequestTimestampPayload;
  status: RequestTypeToStatus;
}

const state: IInvitationModelState = {
  error: {},
  invitation: undefined,
  invitations: [],
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
