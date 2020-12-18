import { ThunkOn } from 'easy-peasy';
import { IAudienceModel } from './model';
import { IStoreModel } from 'store';
export interface IAudienceModelListeners {
    onSetStatus: ThunkOn<IAudienceModel, IStoreModel>;
}
declare const listeners: IAudienceModelListeners;
export default listeners;
