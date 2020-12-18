import { Thunk } from 'easy-peasy';
import { IExerciseModel } from './model';
import { FetchExercisesPayload, FindExercisePayload } from './payloads';
import { IStoreModel } from 'store';
export interface IExerciseModelThunks {
    fetchExercises: Thunk<IExerciseModel, FetchExercisesPayload, void, IStoreModel>;
    findExercise: Thunk<IExerciseModel, FindExercisePayload>;
}
declare const thunks: IExerciseModelThunks;
export default thunks;
