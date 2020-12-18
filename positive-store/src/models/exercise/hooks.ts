import { ActionCreator, ThunkCreator } from 'easy-peasy';

import { FetchExercisesPayload, FindExercisePayload } from './payloads';

import { usePositiveActions, usePositiveState } from 'store';
import { Exercise } from 'types/exercise';

export const useExerciseState = () => usePositiveState((state) => state.exercises);

export const useExerciseActions: () => {
  fetchExercises: ThunkCreator<FetchExercisesPayload, Exercise[]>;
  findExercise: ThunkCreator<FindExercisePayload, Exercise>;
  setActiveExerciseSlug: ActionCreator<string | undefined>;
  setExercises: ActionCreator<Exercise[]>;
} = () => {
  const { fetchExercises, findExercise, setActiveExerciseSlug, setExercises } = usePositiveActions(
    (actions) => actions.exercises
  );
  return {
    fetchExercises,
    findExercise,
    setActiveExerciseSlug,
    setExercises,
  };
};
