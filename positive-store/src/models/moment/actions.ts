import { Action, action } from 'easy-peasy';

import { RequestType } from './requests';
import { IMomentModel } from './model';

import { Moment } from 'types/moment';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IMomentModelActions {
  setCursor: Action<IMomentModel, string | undefined>;
  setError: Action<
    IMomentModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setFirstMomentFlag: Action<IMomentModel, boolean>;
  setMoments: Action<IMomentModel, Moment[]>;
  setRequestTimestamps: Action<IMomentModel, { type: RequestTimestamp; value: number }>;
  setStatus: Action<IMomentModel, { type: RequestType; value: Status }>;
  setTempMoments: Action<IMomentModel, any[]>;
}

const actions: IMomentModelActions = {
  setCursor: action((state, payload) => {
    state.cursor = payload;
  }),

  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setFirstMomentFlag: action((state, payload) => {
    state.firstMomentFlag = payload;
  }),

  setMoments: action((state, payload) => {
    state.moments = payload;
  }),

  setRequestTimestamps: action((state, payload) => {
    state.requestTimestamps[payload.type] = payload.value;
  }),

  setStatus: action((state, payload) => {
    state.status[payload.type] = payload.value;
  }),

  setTempMoments: action((state, payload) => {
    state.tempMoments = payload;
  }),
};

export default actions;
