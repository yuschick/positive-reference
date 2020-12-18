import { Status } from 'types/status';

export enum RequestType {
  acceptInvitation = 'acceptInvitation',
  deleteInvitation = 'deleteInvitation',
  fetchInvitation = 'fetchInvitation',
  fetchInvitations = 'fetchInvitations',
  sendInvitation = 'sendInvitation',
  resendInvitation = 'resendInvitation',
}

export type RequestTypeToError = Partial<
  Record<RequestType, { error: Error; status: number } | undefined>
>;

export type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
