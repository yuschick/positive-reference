import { Action, action } from 'easy-peasy';

import { RequestType } from './requests';
import { IExerciseModel } from './model';

import { Exercise } from 'types/exercise';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IExerciseModelActions {
  setActiveExerciseSlug: Action<IExerciseModel, string | undefined>;
  setError: Action<
    IExerciseModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setExercises: Action<IExerciseModel, Exercise[]>;
  setRequestTimestamps: Action<IExerciseModel, { type: RequestTimestamp; value: number }>;
  setStatus: Action<IExerciseModel, { type: RequestType; value: Status }>;
}

const actions: IExerciseModelActions = {
  setActiveExerciseSlug: action((state, payload) => {
    state.activeExerciseSlug = payload;
  }),

  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setExercises: action((state, payload) => {
    state.exercises = payload;
  }),

  setRequestTimestamps: action((state, payload) => {
    state.requestTimestamps[payload.type] = payload.value;
  }),

  setStatus: action((state, payload) => {
    state.status[payload.type] = payload.value;
  }),
};

export default actions;
