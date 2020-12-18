import { ThunkOn } from 'easy-peasy';
import { ISettingsModel } from './model';
import { IStoreModel } from 'store';
export interface ISettingsModelListeners {
    onSetLanguage: ThunkOn<ISettingsModel, void, IStoreModel>;
}
declare const listeners: ISettingsModelListeners;
export default listeners;
