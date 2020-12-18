import { Moment } from 'types/moment';
import { StrengthSlug } from 'types/strength';

export type CreateMomentPayload = {
  groupId: string;
  strengthSlug: StrengthSlug;
  description: string;
  media?: Blob;
  goalId?: string;
};
export type CreateMomentMediaPayload = { media: Blob; moment: Moment };
export type DeleteMomentPayload = { groupId: string; momentId: string };
export type DeleteMomentMediaPayload = { mediaId: string };
export type EditMomentPayload = {
  media?: Blob;
  mediaUrl?: string;
  momentId: string;
  groupId: string;
  strengthSlug: StrengthSlug;
  description: string;
};
export type FetchMomentsPayload = {
  clearCacheEntry?: boolean;
  count?: number;
  cursor?: string;
  groupId: string;
  resetCursor?: boolean;
};
