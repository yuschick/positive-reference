import { computed, Computed } from 'easy-peasy';

import { RequestType, RequestTypeToError, RequestTypeToStatus } from './requests';
import { Status } from 'types/status';

export interface IAuthModelState {
  error: RequestTypeToError;
  idToken?: string;
  idTokenExpiresAt?: number;
  idTokenExpiresIn: Computed<IAuthModelState, () => number | undefined>;
  isInitialized?: boolean;
  sessionExpiresAt?: number;
  sessionExpiresIn: Computed<IAuthModelState, () => number | undefined>;
  request: Partial<Record<RequestType, Promise<undefined> | undefined>>;
  status: RequestTypeToStatus;
}

const state: IAuthModelState = {
  error: {},
  idToken: undefined,
  idTokenExpiresAt: undefined,
  idTokenExpiresIn: computed((state) => () =>
    state.idTokenExpiresAt !== undefined
      ? Math.floor((state.idTokenExpiresAt * 1000 - Date.now()) / 1000)
      : undefined
  ),
  isInitialized: false,
  sessionExpiresAt: undefined,
  sessionExpiresIn: computed((state) => () =>
    state.sessionExpiresAt !== undefined
      ? Math.floor((state.sessionExpiresAt * 1000 - Date.now()) / 1000)
      : undefined
  ),
  request: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: undefined }),
    {}
  ),
  status: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: Status.idle }),
    {}
  ),
};

export default state;
