import { Audience, AudienceResponse } from 'types/audience';
import { Language } from 'types/settings';

export const formatAudiencesResponse = (audiences: AudienceResponse[]): Audience[] =>
  audiences.map((audience: AudienceResponse) => ({
    id: audience._id,
    live: audience.live,
    name: audience.name,
    slug: audience.slug,
    numExercises: audience.numExercises,
  }));

export const defaultAudiences: Record<Language, string> = {
  fi: 'students-v2',
  en: 'students-v1',
};

export const filterProductionAudiences = (audiences: Audience[], defaultAudienceSlug: string) =>
  audiences.filter(
    (audience: Audience) =>
      (!audience.slug.startsWith('students-') || audience.slug === defaultAudienceSlug) &&
      audience.numExercises > 0
  );
