import { ThunkOn } from 'easy-peasy';
import { IExerciseModel } from './model';
import { IStoreModel } from 'store';
export interface IExerciseModelListeners {
    onSetStatus: ThunkOn<IExerciseModel, IStoreModel>;
}
declare const listeners: IExerciseModelListeners;
export default listeners;
