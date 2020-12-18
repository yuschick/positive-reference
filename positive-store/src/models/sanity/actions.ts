import { Action, action } from 'easy-peasy';

import { ISanityModel } from './model';
import { RequestType } from './requests';

import { Dataset } from 'types/sanity';
import { Status } from 'types/status';

export interface ISanityModelActions {
  setDataset: Action<ISanityModel, Dataset>;
  setError: Action<
    ISanityModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setStatus: Action<ISanityModel, { type: RequestType; value: Status }>;
  setVerboseContent: Action<ISanityModel, boolean>;
}

const actions: ISanityModelActions = {
  setDataset: action((state, payload) => {
    state.dataset = payload;
  }),

  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setStatus: action((state, payload) => {
    state.status[payload.type] = payload.value;
  }),

  setVerboseContent: action((state, payload) => {
    state.verboseContent = payload;
  }),
};

export default actions;
