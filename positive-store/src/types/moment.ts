import { StrengthSlug } from './strength';

export type Moment = {
  createdAt: Date;
  creatorId: string;
  creatorName: string;
  description: string;
  groupId: string;
  groupName: string;
  id: string;
  mediaId?: string;
  mediaType?: string;
  mediaUrl?: string;
  strengthSlug: StrengthSlug;
  goalId?: string;
};

export type TempMoment = Moment & {
  progress?: number;
};

export type MomentResponse = {
  Cursor: string;
  Items: ResponseMoment[];
};

export type ResponseMoment = {
  CreatedAt: string;
  Creator: {
    ID: string;
    GivenName: string;
    FamilyName: string;
  };
  CreatorID: string;
  Description: string;
  Group: GroupResponse;
  GroupID: string;
  ID: string;
  MediaID?: string;
  MediaURL?: string;
  MediaType?: string;
  ModifiedAt: string;
  StrengthSlug: StrengthSlug;
  GoalID?: string;
};

type GroupResponse = {
  ID: string;
  Name: string;
  Type: string;
  GroupID: string;
};

export type MediaResponse = {
  ID: string;
  ModifiedAt: string;
  MomentID: string;
  Type: MediaType;
  UploaderID: string;
};

export type Media = {
  id: string;
  modifiedAt: string;
  momentId: string;
  type: MediaType;
  uploaderId: string;
};

export enum MediaType {
  image = 'image',
}
