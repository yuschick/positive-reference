import { ThunkOn } from 'easy-peasy';
import { IMomentModel } from './model';
import { IStoreModel } from 'store';
export interface IMomentModelListeners {
    onSetStatus: ThunkOn<IMomentModel, IStoreModel>;
}
declare const listeners: IMomentModelListeners;
export default listeners;
