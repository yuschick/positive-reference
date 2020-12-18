import { CancelTokenSource } from 'axios';
import { Action, action } from 'easy-peasy';

import { RequestType } from './requests';
import { IMembershipModel } from './model';

import { Membership } from 'types/membership';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IMembershipModelActions {
  setError: Action<
    IMembershipModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setMemberships: Action<IMembershipModel, Membership[]>;
  setRequest: Action<IMembershipModel, { type: RequestType; value: CancelTokenSource | undefined }>;
  setRequestTimestamps: Action<IMembershipModel, { type: RequestTimestamp; value: number }>;
  setStatus: Action<IMembershipModel, { type: RequestType; value: Status }>;
}

const actions: IMembershipModelActions = {
  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setMemberships: action((state, payload) => {
    state.memberships = payload;
  }),

  setRequest: action((state, payload) => {
    state.request[payload.type] = payload.value;
  }),

  setRequestTimestamps: action((state, payload) => {
    state.requestTimestamps[payload.type] = payload.value;
  }),

  setStatus: action((state, payload) => {
    state.status[payload.type] = payload.value;
  }),
};

export default actions;
