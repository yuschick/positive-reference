import { ThunkCreator } from 'easy-peasy';

import { FetchIllustrationUrlPayload } from './payloads';
import { usePositiveActions, usePositiveState } from 'store';
import { SanityImageSource } from 'types/sanity';

export const useSanityState = () => usePositiveState((state) => state.sanity);

export const useSanityActions: () => {
  getImageUrlBuilder: ThunkCreator<SanityImageSource>;
  fetchIllustrationUrl: ThunkCreator<FetchIllustrationUrlPayload, Promise<string | void | null>>;
} = () => {
  const { getImageUrlBuilder, fetchIllustrationUrl } = usePositiveActions(
    (actions) => actions.sanity
  );
  return {
    getImageUrlBuilder,
    fetchIllustrationUrl,
  };
};
