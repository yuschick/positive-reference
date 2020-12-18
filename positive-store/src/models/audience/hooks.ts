import { ActionCreator, ThunkCreator } from 'easy-peasy';

import { FetchAudiencesPayload } from './payloads';

import { usePositiveActions, usePositiveState } from 'store';
import { Audience } from 'types/audience';

export const useAudienceState = () => usePositiveState((state) => state.audiences);

export const useAudienceActions: () => {
  fetchAudiences: ThunkCreator<FetchAudiencesPayload, Audience[]>;
  setActiveAudienceSlug: ActionCreator<string>;
} = () => {
  const { fetchAudiences, setActiveAudienceSlug } = usePositiveActions(
    (actions) => actions.audiences
  );
  return {
    fetchAudiences,
    setActiveAudienceSlug,
  };
};
