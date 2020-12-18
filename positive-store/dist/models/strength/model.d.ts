import { IStrengthModelActions } from './actions';
import { IStrengthModelListeners } from './listeners';
import { IStrengthModelState } from './state';
import { IStrengthModelThunks } from './thunks';
export interface IStrengthModel extends IStrengthModelActions, IStrengthModelListeners, IStrengthModelState, IStrengthModelThunks {
}
declare const audienceModel: IStrengthModel;
export default audienceModel;
