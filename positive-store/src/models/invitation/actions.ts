import { CancelTokenSource } from 'axios';
import { Action, action } from 'easy-peasy';

import { RequestType } from './requests';
import { IInvitationModel } from './model';

import { Invitation } from 'types/invitation';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IInvitationModelActions {
  setError: Action<
    IInvitationModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setGroupInvitations: Action<IInvitationModel, Invitation[]>;
  setInvitation: Action<IInvitationModel, Invitation>;
  setRequest: Action<IInvitationModel, { type: RequestType; value: CancelTokenSource | undefined }>;
  setRequestTimestamps: Action<IInvitationModel, { type: RequestTimestamp; value: number }>;
  setStatus: Action<IInvitationModel, { type: RequestType; value: Status }>;
}

const actions: IInvitationModelActions = {
  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setGroupInvitations: action((state, payload) => {
    state.invitations = payload;
  }),

  setInvitation: action((state, payload) => {
    state.invitation = payload;
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
