import { Status } from 'types/status';

export enum RequestType {
  fetchExercises = 'fetchExercises',
}

export type RequestTypeToError = Partial<
  Record<RequestType, { error: Error; status: number } | undefined>
>;
export type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
