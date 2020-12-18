import { computed, Computed } from 'easy-peasy';

import { defaultAudiences } from './helpers';
import { RequestTypeToError, RequestTypeToStatus, RequestType } from './requests';

import { IStoreModel } from 'store';

import { Audience } from 'types/audience';
import { RequestTimestampPayload } from 'types/request';
import { Language } from 'types/settings';
import { Status } from 'types/status';
import { findItemInArray } from 'utils/findItemInArray';

export interface IAudienceModelState {
  error: RequestTypeToError;
  audiences: Audience[];
  activeAudience: Computed<IAudienceModelState, Audience>;
  activeAudienceSlug?: string;
  defaultAudienceSlug: Computed<IAudienceModelState, string, IStoreModel>;
  rawAudiences: Audience[];
  requestTimestamps: RequestTimestampPayload;
  status: RequestTypeToStatus;
}

const state: IAudienceModelState = {
  error: {},
  audiences: [],
  activeAudience: computed((state) =>
    findItemInArray(
      state.rawAudiences,
      'slug',
      state?.activeAudienceSlug || state.defaultAudienceSlug
    )
  ),
  activeAudienceSlug: defaultAudiences[Language.fi],
  defaultAudienceSlug: computed(
    [(_, storeState) => storeState.settings.language],
    (language) => defaultAudiences[language]
  ),
  rawAudiences: [],
  requestTimestamps: { fresh: 0, stale: 0 },
  status: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: Status.idle }),
    {}
  ),
};

export default state;
