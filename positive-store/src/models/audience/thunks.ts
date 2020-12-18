import { Thunk, thunk } from 'easy-peasy';

import { IAudienceModel } from './model';
import { fetchAudiencesQuery } from './queries';
import { RequestType } from './requests';
import { formatAudiencesResponse, filterProductionAudiences } from './helpers';
import { FetchAudiencesPayload } from './payloads';

import { IStoreModel } from 'store';
import { AudienceResponse, Audience } from 'types/audience';
import { RequestTimestamp } from 'types/request';
import { Environment } from 'types/settings';
import { Status } from 'types/status';

export interface IAudienceModelThunks {
  fetchAudiences: Thunk<IAudienceModel, FetchAudiencesPayload, void, IStoreModel>;
}

const thunks: IAudienceModelThunks = {
  fetchAudiences: thunk(async (actions, payload, { getState, getStoreState, getStoreActions }) => {
    actions.setStatus({ type: RequestType.fetchAudiences, value: Status.loading });
    await getStoreActions().auth.silentRefresh();

    const {
      sanity: { sanityClient },
      settings: { env, language },
    } = getStoreState();

    try {
      const audiences: AudienceResponse[] = await sanityClient.fetch(fetchAudiencesQuery, {
        language: payload || language,
      });
      const formattedAudiences: Audience[] = formatAudiencesResponse(audiences);
      let productionAudiences = [...formattedAudiences];
      const defaultAudienceSlug = getState().defaultAudienceSlug;

      if (env === Environment.production) {
        productionAudiences = filterProductionAudiences(formattedAudiences, defaultAudienceSlug);
      }

      actions.setRawAudiences(formattedAudiences);
      actions.setAudiences(productionAudiences);
      actions.setActiveAudienceSlug(defaultAudienceSlug);
      actions.setError({ type: RequestType.fetchAudiences, value: undefined });
    } catch (error) {
      actions.setError({
        type: RequestType.fetchAudiences,
        value: { error, status: error.response?.status },
      });
    } finally {
      actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
      actions.setStatus({ type: RequestType.fetchAudiences, value: Status.complete });
    }
  }),
};

export default thunks;
