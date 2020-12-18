import { Action, action } from 'easy-peasy';

import { RequestType } from './requests';
import { IGoalModel } from './model';

import { Goal } from 'types/goal';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IGoalModelActions {
  setError: Action<
    IGoalModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setFirstGoalFlag: Action<IGoalModel, boolean>;
  setGoals: Action<IGoalModel, Goal[]>;
  setRequestTimestamps: Action<IGoalModel, { type: RequestTimestamp; value: number }>;
  setStatus: Action<IGoalModel, { type: RequestType; value: Status }>;
}

const actions: IGoalModelActions = {
  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setFirstGoalFlag: action((state, payload) => {
    state.firstGoalFlag = payload;
  }),

  setGoals: action((state, payload) => {
    state.goals = payload;
  }),

  setRequestTimestamps: action((state, payload) => {
    state.requestTimestamps[payload.type] = payload.value;
  }),

  setStatus: action((state, payload) => {
    state.status[payload.type] = payload.value;
  }),
};

export default actions;
