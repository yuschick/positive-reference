import { persist } from 'easy-peasy';

import actions, { IMembershipModelActions } from './actions';
import listeners, { IMembershipModelListeners } from './listeners';
import state, { IMembershipModelState } from './state';
import thunks, { IMembershipModelThunks } from './thunks';

export interface IMembershipModel
  extends IMembershipModelActions,
    IMembershipModelListeners,
    IMembershipModelState,
    IMembershipModelThunks {}

const membershipModel: IMembershipModel = persist(
  {
    ...actions,
    ...listeners,
    ...state,
    ...thunks,
  },
  {
    storage: 'localStorage',
    allow: ['memberships'],
  }
);

export default membershipModel;
