import { ActionCreator, ThunkCreator } from 'easy-peasy';
import { FetchExercisesPayload, FindExercisePayload } from './payloads';
import { Exercise } from 'types/exercise';
export declare const useExerciseState: () => import("easy-peasy").StateMapper<{
    exercises: Exercise[];
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    requestTimestamps: Record<import("../../types/request").RequestTimestamp, number>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
    activeExercise: import("easy-peasy").Computed<import("./state").IExerciseModelState, Exercise, {}>;
    activeExerciseSlug?: string | undefined;
    exerciseSections: import("easy-peasy").Computed<import("./state").IExerciseModelState, import("../../types/exercise").ExerciseSection[], {}>;
}>;
export declare const useExerciseActions: () => {
    fetchExercises: ThunkCreator<FetchExercisesPayload, Exercise[]>;
    findExercise: ThunkCreator<FindExercisePayload, Exercise>;
    setActiveExerciseSlug: ActionCreator<string | undefined>;
    setExercises: ActionCreator<Exercise[]>;
};
