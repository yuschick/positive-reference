import { ThunkCreator } from 'easy-peasy';
import { FetchMembershipsPayload, EditMembershipPayload, DeleteMembershipPayload } from './payloads';
import { Membership } from 'types/membership';
export declare const useMembershipState: () => import("easy-peasy").StateMapper<{
    memberships?: Membership[] | undefined;
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    requestTimestamps: Record<import("../../types/request").RequestTimestamp, number>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
    request: Partial<Record<import("./requests").RequestType, import("axios").CancelTokenSource | undefined>>;
    onSetMemberships?: import("easy-peasy").ThunkOn<import("./model").IMembershipModel, void, import("../../store").IStoreModel> | undefined;
}>;
export declare const useMembershipActions: () => {
    deleteMembership: ThunkCreator<DeleteMembershipPayload, void>;
    editMembership: ThunkCreator<EditMembershipPayload, void>;
    fetchMemberships: ThunkCreator<FetchMembershipsPayload, void>;
    scrubPII: (membership: Membership) => Membership;
};
