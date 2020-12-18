import { Status } from 'types/status';

export enum RequestType {
  createGoal = 'createGoal',
  editGoal = 'editGoal',
  deleteGoal = 'deleteGoal',
  fetchGoals = 'fetchGoals',
}

export type RequestTypeToError = Partial<
  Record<RequestType, { error: Error; status: number } | undefined>
>;
export type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
