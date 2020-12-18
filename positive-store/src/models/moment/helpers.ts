import { Path } from 'types/api';
import { Media, MediaResponse, Moment, ResponseMoment } from 'types/moment';
import { formatName } from 'utils/formatName';

export const formatSingleMomentResponse = (moment: ResponseMoment): Moment => ({
  createdAt: new Date(moment.CreatedAt),
  creatorId: moment.CreatorID,
  creatorName: formatName(moment.Creator.GivenName, moment.Creator.FamilyName),
  description: moment.Description,
  groupId: moment.GroupID,
  groupName: moment.Group.Name,
  id: moment.ID,
  mediaId: moment.MediaID,
  mediaType: moment.MediaType,
  mediaUrl: moment.MediaID && getMediaUrl(moment.MediaID),
  strengthSlug: moment.StrengthSlug,
  goalId: moment.GoalID,
});

export const formatMomentsResponse = (moments: ResponseMoment[]): Moment[] =>
  moments.map((moment: ResponseMoment) => formatSingleMomentResponse(moment));

export const formatMediaResponse = (media: MediaResponse): Media => ({
  id: media.ID,
  modifiedAt: media.ModifiedAt,
  momentId: media.MomentID,
  type: media.Type,
  uploaderId: media.UploaderID,
});

export const getMediaType = (blob: Blob): string | undefined => {
  if (blob.type.includes('image')) return 'image';

  return undefined;
};

export const getMediaUrl = (mediaId: string) => `${Path.media}/${mediaId}`;
