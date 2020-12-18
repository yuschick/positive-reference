import { Invitation } from './invitation';
import { Membership } from './membership';

export type Group = {
  id: string;
  invitations?: Invitation[];
  memberships?: Membership[];
  name?: string;
  userRole: GroupRole;
  parentGroup?: Group;
  type: GroupType;
};

export interface Class extends Group {
  type: GroupType.class;
}

export interface Organization extends Group {
  childGroups?: Group[];
  type: GroupType.organization;
}

export type GroupResponse = {
  ID: string;
  Name: string;
  Type: GroupType;
  UserRole: GroupRole;
  ParentGroup?: GroupResponse;
};

export enum GroupType {
  class = 'class',
  organization = 'organization',
}

export enum GroupRole {
  manager = 'owner',
  member = 'tutor',
  none = '',
}
