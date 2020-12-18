import { computed, Computed } from 'easy-peasy';

import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';
import { formatExerciseSections } from './helpers';

import { Exercise, ExerciseSection } from 'types/exercise';
import { RequestTimestampPayload } from 'types/request';
import { Status } from 'types/status';
import { findItemInArray } from 'utils/findItemInArray';

export interface IExerciseModelState {
  error: RequestTypeToError;
  activeExercise: Computed<IExerciseModelState, Exercise>;
  activeExerciseSlug?: string;
  exercises: Exercise[];
  exerciseSections: Computed<IExerciseModelState, ExerciseSection[]>;
  requestTimestamps: RequestTimestampPayload;
  status: RequestTypeToStatus;
}

const state: IExerciseModelState = {
  error: {},
  activeExercise: computed(
    (state) =>
      state.activeExerciseSlug && findItemInArray(state.exercises, 'slug', state.activeExerciseSlug)
  ),
  activeExerciseSlug: undefined,
  exercises: [],
  exerciseSections: computed((state) => formatExerciseSections(state.exercises)),
  requestTimestamps: { fresh: 0, stale: 0 },
  status: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: Status.idle }),
    {}
  ),
};

export default state;
