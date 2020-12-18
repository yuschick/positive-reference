import { ActTemplate } from 'types/goal';

export type CreateGoalPayload = {
  actTargetCount: number;
  actTemplates: ActTemplate[];
  groupId: string;
};

export type DeleteGoalPayload = {
  goalId: string;
  groupId: string;
};

export type EditGoalPayload = {
  actTargetCount: number;
  actTemplates: ActTemplate[];
  goalId: string;
  groupId: string;
};

export type FetchGoalsPayload = {
  groupId: string;
};
