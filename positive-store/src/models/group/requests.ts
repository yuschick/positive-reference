import { Status } from 'types/status';

export enum RequestType {
  fetchGroups = 'fetchGroups',
  setSelectedGroup = 'setSelectedGroup',
  createGroup = 'createGroup',
  editGroup = 'editGroup',
  deleteGroup = 'deleteGroup',
}

export type RequestTypeToError = Partial<
  Record<RequestType, { error: Error; status: number } | undefined>
>;
export type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
