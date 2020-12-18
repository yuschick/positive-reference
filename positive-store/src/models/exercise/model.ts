import actions, { IExerciseModelActions } from './actions';
import listeners, { IExerciseModelListeners } from './listeners';
import state, { IExerciseModelState } from './state';
import thunks, { IExerciseModelThunks } from './thunks';

export interface IExerciseModel
  extends IExerciseModelActions,
    IExerciseModelListeners,
    IExerciseModelState,
    IExerciseModelThunks {}

const exerciseModel: IExerciseModel = {
  ...actions,
  ...listeners,
  ...state,
  ...thunks,
};

export default exerciseModel;
