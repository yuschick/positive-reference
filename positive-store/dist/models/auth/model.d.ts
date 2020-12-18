import { IAuthModelActions } from './actions';
import { IAuthModelListeners } from './listeners';
import { IAuthModelState } from './state';
import { IAuthModelThunks } from './thunks';
export interface IAuthModel extends IAuthModelActions, IAuthModelListeners, IAuthModelState, IAuthModelThunks {
}
declare const authModel: IAuthModel;
export default authModel;
