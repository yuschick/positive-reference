import { GroupRole } from './group';
import { User, UserResponse } from './user';

export type Invitation = {
  id: string;
  email?: string;
  group_id: string;
  role: GroupRole;
  status: InvitationStatus;
  type?: InvitationType;
  creator: User;
};

export type InvitationResponse = {
  ID: string;
  Email: string;
  Role: GroupRole;
  Status: InvitationStatus;
  GroupID: string;
  Creator: UserResponse;
  Type: InvitationType;
};

export enum InvitationType {
  email = 'email',
  link = 'link',
}

export enum InvitationStatus {
  waiting = 'waiting',
  accepted = 'accepted',
}
