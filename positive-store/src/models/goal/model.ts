import actions, { IGoalModelActions } from './actions';
import listeners, { IGoalModelListeners } from './listeners';
import state, { IGoalModelState } from './state';
import thunks, { IGoalModelThunks } from './thunks';

export interface IGoalModel
  extends IGoalModelActions,
    IGoalModelListeners,
    IGoalModelState,
    IGoalModelThunks {}

const goalModel: IGoalModel = {
  ...actions,
  ...listeners,
  ...state,
  ...thunks,
};

export default goalModel;
