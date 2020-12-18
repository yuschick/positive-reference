import { Thunk, thunk } from 'easy-peasy';

import { formatExercisesResponse } from './helpers';
import { IExerciseModel } from './model';
import { fetchExercisesQuery } from './queries';
import { RequestType } from './requests';
import { FetchExercisesPayload, FindExercisePayload } from './payloads';

import { IStoreModel } from 'store';

import { Exercise, ExerciseResponse } from 'types/exercise';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IExerciseModelThunks {
  fetchExercises: Thunk<IExerciseModel, FetchExercisesPayload, void, IStoreModel>;
  findExercise: Thunk<IExerciseModel, FindExercisePayload>;
}

const thunks: IExerciseModelThunks = {
  fetchExercises: thunk(async (actions, payload, { getStoreActions, getStoreState }) => {
    actions.setStatus({ type: RequestType.fetchExercises, value: Status.loading });
    await getStoreActions().auth.silentRefresh();

    const {
      audiences: { activeAudienceSlug, defaultAudienceSlug },
      sanity: { sanityClient, verboseContent },
      settings: { language },
      strengths: { activeStrength },
    } = getStoreState();
    try {
      const exercises: ExerciseResponse[] = await sanityClient.fetch(fetchExercisesQuery, {
        language: payload?.language || language,
        strengthSlug: payload?.strengthSlug || activeStrength?.slug,
        audienceSlug: payload?.audienceSlug || activeAudienceSlug || defaultAudienceSlug,
      });

      const formattedExercises = formatExercisesResponse(exercises, verboseContent);
      actions.setExercises(formattedExercises);
      actions.setError({ type: RequestType.fetchExercises, value: undefined });
    } catch (error) {
      actions.setError({
        type: RequestType.fetchExercises,
        value: { error, status: error.response?.status },
      });
    } finally {
      actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
      actions.setStatus({ type: RequestType.fetchExercises, value: Status.complete });
    }
  }),

  findExercise: thunk(
    async (_, payload, { getState }): Promise<Exercise | undefined> => {
      const { exercises } = getState();
      return exercises.find((exercise: Exercise) => exercise.slug === payload.slug);
    }
  ),
};

export default thunks;
