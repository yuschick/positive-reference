import { GoalResponse, Goal } from 'types/goal';

export const formatGoalResponse = (goal: GoalResponse): Goal => ({
  modifiedAt: goal.ModifiedAt,
  createdAt: goal.CreatedAt,
  id: goal.ID,
  actTargetCount: goal.ActTargetCount,
  creatorId: goal.CreatorID,
  groupId: goal.GroupID,
  actTemplates: goal.ActTemplates?.map((template) => ({
    text: template.Text,
    strengthSlug: template.StrengthSlug,
  })),
});
