import { IMomentModelActions } from './actions';
import { IMomentModelListeners } from './listeners';
import { IMomentModelState } from './state';
import { IMomentModelThunks } from './thunks';
export interface IMomentModel extends IMomentModelActions, IMomentModelListeners, IMomentModelState, IMomentModelThunks {
}
declare const momentModel: IMomentModel;
export default momentModel;
