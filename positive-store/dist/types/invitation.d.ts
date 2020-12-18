import { GroupRole } from './group';
import { User, UserResponse } from './user';
export declare type Invitation = {
    id: string;
    email?: string;
    group_id: string;
    role: GroupRole;
    status: InvitationStatus;
    type?: InvitationType;
    creator: User;
};
export declare type InvitationResponse = {
    ID: string;
    Email: string;
    Role: GroupRole;
    Status: InvitationStatus;
    GroupID: string;
    Creator: UserResponse;
    Type: InvitationType;
};
export declare enum InvitationType {
    email = "email",
    link = "link"
}
export declare enum InvitationStatus {
    waiting = "waiting",
    accepted = "accepted"
}
