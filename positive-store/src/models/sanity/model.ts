import { persist } from 'easy-peasy';

import state, { ISanityModelState } from './state';
import actions, { ISanityModelActions } from './actions';
import thunks, { ISanityModelThunks } from './thunks';

export interface ISanityModel extends ISanityModelState, ISanityModelActions, ISanityModelThunks {}

const sanityModel: ISanityModel = persist(
  {
    ...state,
    ...actions,
    ...thunks,
  },
  {
    storage: 'localStorage',
    allow: ['verboseContent'],
  }
);

export default sanityModel;
