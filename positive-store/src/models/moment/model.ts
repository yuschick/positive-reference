import actions, { IMomentModelActions } from './actions';
import listeners, { IMomentModelListeners } from './listeners';
import state, { IMomentModelState } from './state';
import thunks, { IMomentModelThunks } from './thunks';

export interface IMomentModel
  extends IMomentModelActions,
    IMomentModelListeners,
    IMomentModelState,
    IMomentModelThunks {}

const momentModel: IMomentModel = {
  ...actions,
  ...listeners,
  ...state,
  ...thunks,
};

export default momentModel;
