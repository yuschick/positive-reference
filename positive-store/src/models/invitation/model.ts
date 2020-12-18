import { persist } from 'easy-peasy';

import actions, { IInvitationModelActions } from './actions';
import listeners, { IInvitationModelListeners } from './listeners';
import state, { IInvitationModelState } from './state';
import thunks, { IInvitationModelThunks } from './thunks';

export interface IInvitationModel
  extends IInvitationModelActions,
    IInvitationModelListeners,
    IInvitationModelState,
    IInvitationModelThunks {}

const invitationModel: IInvitationModel = persist(
  {
    ...actions,
    ...listeners,
    ...state,
    ...thunks,
  },
  {
    storage: 'localStorage',
    allow: ['invitations'],
  }
);

export default invitationModel;
