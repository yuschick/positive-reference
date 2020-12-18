import { url } from 'config';
import { formatRelativeDate } from 'utils/helpers';
import { formatName } from 'api/User';

function Moment({
  ID,
  CreatedAt,
  Creator,
  Group,
  StrengthSlug,
  Description,
  MediaID,
  MediaURL,
  MediaType,
}) {
  if (!(this instanceof Moment)) {
    return new Moment({
      ID,
      CreatedAt,
      Creator,
      Group,
      StrengthSlug,
      Description,
      MediaID,
      MediaURL,
      MediaType,
    });
  }

  this.id = ID;
  this.groupId = Group ? Group.ID : undefined;
  this.groupName = Group ? Group.Name : undefined;
  this.strengthSlug = StrengthSlug;
  this.createdAt = new Date(CreatedAt);
  this.creatorId = Creator ? Creator.ID : undefined;
  this.creatorName = Creator ? formatName(Creator.GivenName, Creator.FamilyName) : undefined;
  this.description = Description;
  this.mediaId = MediaID;
  this.mediaUrl = MediaURL || fetchMediaURL(MediaID);
  this.mediaType = MediaType;
}

const fetchMediaURL = mediaId => (mediaId ? `${url.moment.media.makeGet({ mediaId })}` : undefined);

const serialize = ({ strengthSlug, description }) => ({
  StrengthSlug: strengthSlug,
  Description: description,
});

const formatDate = formatRelativeDate;

const getSubmitEventLabel = ({ description, mediaType }) => {
  if (mediaType) {
    mediaType = mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
  }

  if (description && mediaType) {
    return `${mediaType} & Description`;
  } else if (mediaType) {
    return mediaType;
  } else if (description) {
    return 'Description';
  }
  return 'Plain';
};

export { serialize, formatDate, getSubmitEventLabel };
export default Moment;
