import { Action, action } from 'easy-peasy';

import { RequestType } from './requests';
import { IStrengthModel } from './model';

import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
import { Strength, StrengthSlug } from 'types/strength';

export interface IStrengthModelActions {
  setActiveStrengthSlug: Action<IStrengthModel, StrengthSlug | undefined>;
  setError: Action<
    IStrengthModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setPositiveCV: Action<IStrengthModel, Strength | undefined>;
  setRequestTimestamps: Action<IStrengthModel, { type: RequestTimestamp; value: number }>;
  setStartingLesson: Action<IStrengthModel, Strength | undefined>;
  setStatus: Action<IStrengthModel, { type: RequestType; value: Status }>;
  setStrengthPowerPointUrl: Action<IStrengthModel, string | undefined>;
  setStrengths: Action<IStrengthModel, Strength[]>;
  setXmasCalendar: Action<IStrengthModel, Strength | undefined>;
}

const actions: IStrengthModelActions = {
  setActiveStrengthSlug: action((state, payload) => {
    state.activeStrengthSlug = payload;
  }),

  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setPositiveCV: action((state, payload) => {
    state.positiveCV = payload;
  }),

  setRequestTimestamps: action((state, payload) => {
    state.requestTimestamps[payload.type] = payload.value;
  }),

  setStartingLesson: action((state, payload) => {
    state.startingLesson = payload;
  }),

  setStatus: action((state, payload) => {
    state.status[payload.type] = payload.value;
  }),

  setStrengthPowerPointUrl: action((state, payload) => {
    state.strengthPowerPointUrl = payload;
  }),

  setStrengths: action((state, payload) => {
    state.strengths = payload;
  }),

  setXmasCalendar: action((state, payload) => {
    state.xmasCalendar = payload;
  }),
};

export default actions;
