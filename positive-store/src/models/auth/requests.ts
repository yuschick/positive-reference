import { Status } from 'types/status';

export enum RequestType {
  authenticate = 'authenticate',
  initialize = 'initialize',
  logout = 'logout',
  postIdToken = 'postIdToken',
  refresh = 'refresh',
  silentRefresh = 'silentRefresh',
}

export type RequestTypeToError = Partial<
  Record<RequestType, { error: Error; status: number } | undefined>
>;

export type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
