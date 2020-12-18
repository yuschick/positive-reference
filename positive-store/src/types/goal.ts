import { StrengthSlug } from './strength';

export type Goal = {
  modifiedAt: string;
  createdAt: string;
  id: string;
  actTargetCount: number;
  creatorId: string;
  groupId: string;
  actTemplates: ActTemplate[];
};

export type ActTemplate = {
  text: string;
  strengthSlug: StrengthSlug;
};

export type GoalResponse = {
  ModifiedAt: string;
  CreatedAt: string;
  ID: string;
  ActTargetCount: number;
  CreatorID: string;
  GroupID: string;
  ActTemplates: ActTemplateResponse[];
};

export type ActTemplateResponse = {
  Text: string;
  StrengthSlug: StrengthSlug;
};
