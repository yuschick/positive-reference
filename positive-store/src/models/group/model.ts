import { PersistConfig } from 'easy-peasy';

import state, { IGroupModelState } from './state';
import actions, { IGroupModelActions } from './actions';
import thunks, { IGroupModelThunks } from './thunks';
import listeners, { IGroupModelListeners } from './listeners';

export interface IGroupModel
  extends IGroupModelState,
    IGroupModelActions,
    IGroupModelThunks,
    IGroupModelListeners {}

export const persistConfig: PersistConfig<IGroupModel> = {
  storage: 'localStorage',
  allow: ['groups', 'selectedGroup', 'selectedGroupId', 'organizations', 'orphanGroups'],
};

const groupModel: IGroupModel = {
  ...actions,
  ...listeners,
  ...state,
  ...thunks,
};

export default groupModel;
