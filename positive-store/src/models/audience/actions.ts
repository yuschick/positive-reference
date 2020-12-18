import { Action, action } from 'easy-peasy';

import { RequestType } from './requests';
import { IAudienceModel } from './model';

import { Audience } from 'types/audience';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IAudienceModelActions {
  setActiveAudienceSlug: Action<IAudienceModel, string | undefined>;
  setAudiences: Action<IAudienceModel, Audience[]>;
  setError: Action<
    IAudienceModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setRawAudiences: Action<IAudienceModel, Audience[]>;
  setRequestTimestamps: Action<IAudienceModel, { type: RequestTimestamp; value: number }>;
  setStatus: Action<IAudienceModel, { type: RequestType; value: Status }>;
}

const actions: IAudienceModelActions = {
  setActiveAudienceSlug: action((state, payload) => {
    state.activeAudienceSlug = payload;
  }),

  setAudiences: action((state, payload) => {
    state.audiences = payload;
  }),

  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setRawAudiences: action((state, payload) => {
    state.rawAudiences = payload;
  }),

  setRequestTimestamps: action((state, payload) => {
    state.requestTimestamps[payload.type] = payload.value;
  }),

  setStatus: action((state, payload) => {
    state.status[payload.type] = payload.value;
  }),
};

export default actions;
