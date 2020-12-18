import { IExerciseModelActions } from './actions';
import { IExerciseModelListeners } from './listeners';
import { IExerciseModelState } from './state';
import { IExerciseModelThunks } from './thunks';
export interface IExerciseModel extends IExerciseModelActions, IExerciseModelListeners, IExerciseModelState, IExerciseModelThunks {
}
declare const exerciseModel: IExerciseModel;
export default exerciseModel;
