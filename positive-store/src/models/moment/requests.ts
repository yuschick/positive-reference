import { Status } from 'types/status';

export enum RequestType {
  createMoment = 'createMoment',
  createMomentMedia = 'createMomentMedia',
  deleteMoment = 'deleteMoment',
  deleteMomentMedia = 'deleteMomentMedia',
  editMoment = 'editMoment',
  fetchMoments = 'fetchMoments',
  fetchMoreMoments = 'fetchMoreMoments',
}

export type RequestTypeToError = Partial<
  Record<RequestType, { error: Error; status: number } | undefined>
>;
export type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
