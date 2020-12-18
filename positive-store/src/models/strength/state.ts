import { computed, Computed } from 'easy-peasy';

import { buildStrengthPackages } from './helpers';
import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';

import { IStoreModel } from 'store';
import { Strength, StrengthSlug } from 'types/strength';
import { RequestTimestampPayload } from 'types/request';
import { Status } from 'types/status';
import { findItemInArray } from 'utils/findItemInArray';

export interface IStrengthModelState {
  activeStrength: Computed<IStrengthModelState, Strength>;
  activeStrengthSlug?: StrengthSlug;
  error: RequestTypeToError;
  positiveCV?: Strength;
  requestTimestamps: RequestTimestampPayload;
  startingLesson?: Strength;
  status: RequestTypeToStatus;
  stgStrengths: Computed<IStrengthModelState, Strength[] | undefined>;
  strengthPackages: Computed<
    IStrengthModelState,
    { core: Strength[]; waves: Strength[][]; hasWavesContent: boolean } | undefined,
    IStoreModel
  >;
  strengthPowerPointUrl?: string;
  strengths: Strength[];
  teachStrengths: Computed<IStrengthModelState, Strength[] | undefined>;
  xmasCalendar?: Strength;
}

const state: IStrengthModelState = {
  activeStrength: computed((state) =>
    state.activeStrengthSlug === StrengthSlug.xmasCalendar
      ? state.xmasCalendar
      : state.activeStrengthSlug === StrengthSlug.positiveCV
      ? state.positiveCV
      : state.activeStrengthSlug &&
        findItemInArray(state.strengths, 'slug', state.activeStrengthSlug)
  ),
  activeStrengthSlug: undefined,
  error: {},
  positiveCV: undefined,
  requestTimestamps: { fresh: 0, stale: 0 },
  startingLesson: undefined,
  status: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: Status.idle }),
    {}
  ),
  stgStrengths: computed((state) =>
    state.strengths.filter((strength: Strength) => strength.live.inSeeTheGood)
  ),
  strengthPackages: computed(
    [
      (state) => state.strengths,
      (_, storeState) => storeState.settings.language,
      (_, storeState) => storeState.audiences.activeAudienceSlug,
      (_, storeState) => storeState.audiences.defaultAudienceSlug,
    ],
    (strengths, language, activeAudienceSlug, defaultAudienceSlug) =>
      buildStrengthPackages({
        language: language,
        audienceSlug: activeAudienceSlug || defaultAudienceSlug,
        strengths,
      })
  ),
  strengthPowerPointUrl: undefined,
  strengths: [],
  teachStrengths: computed((state) =>
    state.strengths.filter((strength: Strength) => strength.live.inTeach)
  ),
  xmasCalendar: undefined,
};

export default state;
