import actions, { IAuthModelActions } from './actions';
import listeners, { IAuthModelListeners } from './listeners';
import state, { IAuthModelState } from './state';
import thunks, { IAuthModelThunks } from './thunks';

export interface IAuthModel
  extends IAuthModelActions,
    IAuthModelListeners,
    IAuthModelState,
    IAuthModelThunks {}

const authModel: IAuthModel = {
  ...actions,
  ...listeners,
  ...state,
  ...thunks,
};

export default authModel;
