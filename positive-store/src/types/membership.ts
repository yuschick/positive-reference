import { GroupRole } from './group';
import { User } from './user';

export type Membership = {
  id?: string;
  role: GroupRole;
  user: User;
};

export type MembershipResponse = {
  ID: string;
  FamilyName: string;
  GivenName: string;
  Role: GroupRole;
};
