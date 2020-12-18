import { Computed } from 'easy-peasy';
import { RequestTypeToError, RequestTypeToStatus } from './requests';
import { Exercise, ExerciseSection } from 'types/exercise';
import { RequestTimestampPayload } from 'types/request';
export interface IExerciseModelState {
    error: RequestTypeToError;
    activeExercise: Computed<IExerciseModelState, Exercise>;
    activeExerciseSlug?: string;
    exercises: Exercise[];
    exerciseSections: Computed<IExerciseModelState, ExerciseSection[]>;
    requestTimestamps: RequestTimestampPayload;
    status: RequestTypeToStatus;
}
declare const state: IExerciseModelState;
export default state;
