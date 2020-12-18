import { Language } from 'types/settings';
import { StrengthSlug } from 'types/strength';

export type FetchStrengthPayload = { language?: Language; audience?: string } | undefined;

export type FetchStrengthAttachmentPayload =
  | { language: Language; audience: string; strength: StrengthSlug }
  | undefined;
