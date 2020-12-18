import { PersistConfig } from 'easy-peasy';
import { IGroupModelState } from './state';
import { IGroupModelActions } from './actions';
import { IGroupModelThunks } from './thunks';
import { IGroupModelListeners } from './listeners';
export interface IGroupModel extends IGroupModelState, IGroupModelActions, IGroupModelThunks, IGroupModelListeners {
}
export declare const persistConfig: PersistConfig<IGroupModel>;
declare const groupModel: IGroupModel;
export default groupModel;
