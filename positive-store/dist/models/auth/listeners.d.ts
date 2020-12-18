import { ThunkOn } from 'easy-peasy';
import { IAuthModel } from './model';
import { IStoreModel } from 'store';
export interface IAuthModelListeners {
    onSetStatus: ThunkOn<IAuthModel, IStoreModel>;
}
declare const listeners: IAuthModelListeners;
export default listeners;
