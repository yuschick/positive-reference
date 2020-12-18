import { ThunkOn } from 'easy-peasy';
import { IStrengthModel } from './model';
import { IStoreModel } from 'store';
export interface IStrengthModelListeners {
    onSetStatus: ThunkOn<IStrengthModel, IStoreModel>;
}
declare const listeners: IStrengthModelListeners;
export default listeners;
