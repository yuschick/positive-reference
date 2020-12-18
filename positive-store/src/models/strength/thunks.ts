import { Thunk, thunk } from 'easy-peasy';
import { remove } from 'lodash';

import { IStrengthModel } from './model';
import { fetchStrengthsQuery, strengthAttachmentQuery } from './queries';
import { formatStrengthsResponse } from './helpers';
import { FetchStrengthPayload, FetchStrengthAttachmentPayload } from './payloads';
import { RequestType } from './requests';

import { IStoreModel } from 'store';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
import { StrengthResponse, Strength, AttachmentType } from 'types/strength';

export interface IStrengthModelThunks {
  fetchStrengths: Thunk<IStrengthModel, FetchStrengthPayload, void, IStoreModel>;
  fetchStrengthAttachment: Thunk<IStrengthModel, FetchStrengthAttachmentPayload, void, IStoreModel>;
}

const thunks: IStrengthModelThunks = {
  fetchStrengths: thunk(async (actions, payload, { getState, getStoreState, getStoreActions }) => {
    if (getState().status[RequestType.fetchStrengths] !== Status.idle) return;

    actions.setStatus({ type: RequestType.fetchStrengths, value: Status.loading });
    await getStoreActions().auth.silentRefresh();

    const {
      sanity: { sanityClient, verboseContent },
      settings: { language },
      audiences: { defaultAudienceSlug },
    } = getStoreState();

    try {
      const strengths: StrengthResponse[] = await sanityClient.fetch(fetchStrengthsQuery, {
        language: payload?.language || language,
        audienceSlug: payload?.audience || defaultAudienceSlug,
      });

      const formattedStrengths: Strength[] = formatStrengthsResponse(strengths, verboseContent);

      const positiveCV: Strength | undefined = remove(
        formattedStrengths,
        ({ slug, numExercises }) => slug.includes('positive-cv') && numExercises
      )[0];
      const xmasCalendar: Strength | undefined = remove(
        formattedStrengths,
        ({ slug, numExercises }) => slug.includes('xmas-calendar') && numExercises
      )[0];
      const startingLesson: Strength | undefined = formattedStrengths.find(
        ({ slug, numExercises }) => slug.includes('start') && numExercises
      );

      actions.setStrengths(formattedStrengths);
      actions.setPositiveCV(positiveCV);
      actions.setXmasCalendar(xmasCalendar);
      actions.setStartingLesson(startingLesson);
      actions.setError({ type: RequestType.fetchStrengths, value: undefined });
    } catch (error) {
      actions.setError({
        type: RequestType.fetchStrengths,
        value: { error, status: error.response?.status },
      });
    } finally {
      actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
      actions.setStatus({ type: RequestType.fetchStrengths, value: Status.complete });
    }
  }),

  fetchStrengthAttachment: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      if (getState().status[RequestType.fetchStrengthAttachment] !== Status.idle) return;

      actions.setStatus({ type: RequestType.fetchStrengthAttachment, value: Status.loading });
      await getStoreActions().auth.silentRefresh();

      const {
        sanity: { sanityClient },
        settings: { language },
        audiences: { activeAudienceSlug, defaultAudienceSlug },
      } = getStoreState();
      const { activeStrength } = getState();

      try {
        const attachment: { downloadUrl: string } | undefined = await sanityClient.fetch(
          strengthAttachmentQuery,
          {
            language: payload?.language || language,
            audienceSlug: payload?.audience || activeAudienceSlug || defaultAudienceSlug,
            strengthV2Slug: payload?.strength || activeStrength?.slug,
            type: AttachmentType.slidesPowerpoint,
          }
        );

        /*
        TODO:
        When more attachment types are added, set type-specific state value (state.powerPointUrl)
        Or have a single, generic attachmentUrl property in the state (state.attachmentUrl)
      */
        actions.setStrengthPowerPointUrl(attachment?.downloadUrl);
        actions.setError({ type: RequestType.fetchStrengthAttachment, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.fetchStrengthAttachment,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
        actions.setStatus({ type: RequestType.fetchStrengthAttachment, value: Status.complete });
      }
    }
  ),
};

export default thunks;
