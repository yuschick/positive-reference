import { Status } from '../../types/status';

export enum RequestType {
  fetchIllustrationUrl = 'fetchIllustrationUrl',
}

export type RequestTypeToError = Partial<
  Record<RequestType, { error: Error; status: number } | undefined>
>;
export type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
