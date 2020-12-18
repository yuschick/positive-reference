import { Status } from 'types/status';

export enum RequestType {
  fetchStrengths = 'fetchStrengths',
  fetchStrengthAttachment = 'fetchStrengthAttachment',
}

export type RequestTypeToError = Partial<
  Record<RequestType, { error: Error; status: number } | undefined>
>;
export type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
