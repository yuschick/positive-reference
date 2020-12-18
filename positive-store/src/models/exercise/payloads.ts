import { Language } from 'types/settings';
import { StrengthSlug } from 'types/strength';

export type FetchExercisesPayload =
  | {
      language?: Language;
      strengthSlug?: StrengthSlug;
      audienceSlug?: string;
    }
  | undefined;

export type FindExercisePayload = { slug: string };
