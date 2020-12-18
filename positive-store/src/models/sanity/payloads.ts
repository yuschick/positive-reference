import { IllustrationSlug } from '../../types/sanity';

export type FetchIllustrationUrlPayload = {
  slug: IllustrationSlug;
  width?: number;
  height?: number;
};
