import { Action } from 'easy-peasy';
import { RequestType } from './requests';
import { IExerciseModel } from './model';
import { Exercise } from 'types/exercise';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
export interface IExerciseModelActions {
    setActiveExerciseSlug: Action<IExerciseModel, string | undefined>;
    setError: Action<IExerciseModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setExercises: Action<IExerciseModel, Exercise[]>;
    setRequestTimestamps: Action<IExerciseModel, {
        type: RequestTimestamp;
        value: number;
    }>;
    setStatus: Action<IExerciseModel, {
        type: RequestType;
        value: Status;
    }>;
}
declare const actions: IExerciseModelActions;
export default actions;
