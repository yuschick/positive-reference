import actions, { IStrengthModelActions } from './actions';
import listeners, { IStrengthModelListeners } from './listeners';
import state, { IStrengthModelState } from './state';
import thunks, { IStrengthModelThunks } from './thunks';

export interface IStrengthModel
  extends IStrengthModelActions,
    IStrengthModelListeners,
    IStrengthModelState,
    IStrengthModelThunks {}

const audienceModel: IStrengthModel = {
  ...actions,
  ...listeners,
  ...state,
  ...thunks,
};

export default audienceModel;
