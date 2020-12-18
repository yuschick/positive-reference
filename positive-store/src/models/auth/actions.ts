import { Action, action } from 'easy-peasy';

import { IAuthModel } from './model';
import { RequestType } from './requests';
import { Status } from 'types/status';

export interface IAuthModelActions {
  setError: Action<
    IAuthModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setIdToken: Action<IAuthModel, string | undefined>;
  setIdTokenExpiresAt: Action<IAuthModel, number | undefined>;
  setIsInitialized: Action<IAuthModel, boolean>;
  setRequest: Action<IAuthModel, { type: RequestType; value: Promise<undefined> | undefined }>;
  setSessionExpiresAt: Action<IAuthModel, number | undefined>;
  setStatus: Action<IAuthModel, { type: RequestType; value: Status }>;
}

const actions: IAuthModelActions = {
  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setIdToken: action((state, payload) => {
    state.idToken = payload;
  }),

  setIdTokenExpiresAt: action((state, payload) => {
    state.idTokenExpiresAt = payload;
  }),

  setIsInitialized: action((state, payload) => {
    state.isInitialized = payload;
  }),

  setRequest: action((state, payload) => {
    state.request[payload.type] = payload.value;
  }),

  setSessionExpiresAt: action((state, payload) => {
    state.sessionExpiresAt = payload;
  }),

  setStatus: action((state, payload) => {
    state.status[payload.type] = payload.value;
  }),
};

export default actions;
