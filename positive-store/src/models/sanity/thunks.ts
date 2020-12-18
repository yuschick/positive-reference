import { Thunk, thunk } from 'easy-peasy';
import ImageURLBuilder from '@sanity/image-url';

import { FetchIllustrationUrlPayload } from './payloads';
import { ISanityModel } from './model';
import { RequestType } from './requests';
import { fetchIllustrationUrlQuery } from './queries';

import { SanityImageSource } from 'types/sanity';
import { Status } from '../../types/status';

export interface ISanityModelThunks {
  fetchIllustrationUrl: Thunk<ISanityModel, FetchIllustrationUrlPayload>;
  getImageUrlBuilder: Thunk<ISanityModel, SanityImageSource>;
}

const thunks: ISanityModelThunks = {
  fetchIllustrationUrl: thunk(
    async (actions, payload, { getState }): Promise<string | void | null> => {
      actions.setStatus({ type: RequestType.fetchIllustrationUrl, value: Status.loading });

      const { sanityClient } = getState();

      try {
        const sanityIllustration: SanityImageSource = await sanityClient.fetch(
          fetchIllustrationUrlQuery,
          {
            slug: payload.slug,
          }
        );
        const imageUrl = await actions
          .getImageUrlBuilder(sanityIllustration)
          .width(payload.width)
          .height(payload.height)
          .url();

        actions.setError({ type: RequestType.fetchIllustrationUrl, value: undefined });
        return imageUrl;
      } catch (error) {
        return actions.setError({
          type: RequestType.fetchIllustrationUrl,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setStatus({ type: RequestType.fetchIllustrationUrl, value: Status.complete });
      }
    }
  ),

  getImageUrlBuilder: thunk((_, payload, { getState }): any => {
    /* TODO: Manually type out the ImageBuilder */
    return ImageURLBuilder(getState().sanityClient).image(payload);
  }),
};

export default thunks;
