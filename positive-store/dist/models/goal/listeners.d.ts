import { ThunkOn } from 'easy-peasy';
import { IGoalModel } from './model';
import { IStoreModel } from 'store';
export interface IGoalModelListeners {
    onSetStatus: ThunkOn<IGoalModel, IStoreModel>;
}
declare const listeners: IGoalModelListeners;
export default listeners;
