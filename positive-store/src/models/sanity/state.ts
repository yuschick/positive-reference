import { computed, Computed } from 'easy-peasy';
import client from '@sanity/client';

import { RequestType, RequestTypeToError, RequestTypeToStatus } from './requests';

import { Dataset } from 'types/sanity';
import { Status } from 'types/status';

export interface ISanityModelState {
  dataset: Dataset;
  error: RequestTypeToError;
  project: string;
  sanityClient: Computed<ISanityModelState, any>; // TODO: Manually type this client out
  status: RequestTypeToStatus;
  token?: string;
  verboseContent: boolean;
}

const state: ISanityModelState = {
  dataset: Dataset.production,
  error: {},
  project: 'uxuhnfll',
  sanityClient: computed((state) =>
    client({
      projectId: state.project,
      dataset: state.dataset,
      token: state.token,
      useCdn: !state.token,
      ignoreBrowserTokenWarning: true,
    })
  ),
  status: Object.keys(RequestType).reduce(
    (status, key) => ({ ...status, [RequestType[key as RequestType]]: Status.idle }),
    {}
  ),
  verboseContent: false,
};

export default state;
