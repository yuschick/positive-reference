import { IGoalModelActions } from './actions';
import { IGoalModelListeners } from './listeners';
import { IGoalModelState } from './state';
import { IGoalModelThunks } from './thunks';
export interface IGoalModel extends IGoalModelActions, IGoalModelListeners, IGoalModelState, IGoalModelThunks {
}
declare const goalModel: IGoalModel;
export default goalModel;
