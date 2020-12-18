import { persist } from 'easy-peasy';

import actions, { IAudienceModelActions } from './actions';
import listeners, { IAudienceModelListeners } from './listeners';
import state, { IAudienceModelState } from './state';
import thunks, { IAudienceModelThunks } from './thunks';

export interface IAudienceModel
  extends IAudienceModelActions,
    IAudienceModelListeners,
    IAudienceModelState,
    IAudienceModelThunks {}

const audienceModel: IAudienceModel = persist(
  {
    ...actions,
    ...listeners,
    ...state,
    ...thunks,
  },
  {
    storage: 'localStorage',
    allow: ['activeAudienceSlug'],
  }
);

export default audienceModel;
