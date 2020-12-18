import { Invitation, InvitationResponse } from 'types/invitation';
export declare const formatInvitationResponse: (invitation: InvitationResponse) => Invitation;
export declare const scrubPII: (invitation: Invitation) => Invitation;
