import { Invitation } from './invitation';
import { Membership } from './membership';
export declare type Group = {
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
export declare type GroupResponse = {
    ID: string;
    Name: string;
    Type: GroupType;
    UserRole: GroupRole;
    ParentGroup?: GroupResponse;
};
export declare enum GroupType {
    class = "class",
    organization = "organization"
}
export declare enum GroupRole {
    manager = "owner",
    member = "tutor",
    none = ""
}
