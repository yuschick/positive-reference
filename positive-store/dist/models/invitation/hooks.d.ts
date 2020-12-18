import { ThunkCreator } from 'easy-peasy';
import { FetchInvitationPayload, FetchGroupInvitationsPayload, InviteMemberPayload, AcceptInvitationPayload, DeleteInvitationPayload, ResendInvitationPayload } from './payloads';
import { Invitation } from 'types/invitation';
export declare const useInvitationState: () => import("easy-peasy").StateMapper<{
    invitations: Invitation[];
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    requestTimestamps: Record<import("../../types/request").RequestTimestamp, number>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
    request: Partial<Record<import("./requests").RequestType, import("axios").CancelTokenSource | undefined>>;
    onSetGroupInvitations?: import("easy-peasy").ThunkOn<import("./model").IInvitationModel, void, import("../../store").IStoreModel> | undefined;
    invitation?: Invitation | undefined;
}>;
export declare const useInvitationActions: () => {
    acceptInvitation: ThunkCreator<AcceptInvitationPayload, void>;
    deleteInvitation: ThunkCreator<DeleteInvitationPayload, void>;
    fetchInvitations: ThunkCreator<FetchGroupInvitationsPayload, void>;
    fetchInvitation: ThunkCreator<FetchInvitationPayload, void>;
    sendInvitation: ThunkCreator<InviteMemberPayload, void>;
    resendInvitation: ThunkCreator<ResendInvitationPayload, void>;
    scrubPII: (invitation: Invitation) => Invitation;
};
