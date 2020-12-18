import { MembershipResponse, Membership } from 'types/membership';
export declare const formatMembershipsResponse: (memberships: MembershipResponse[]) => Membership[];
export declare const formatMembershipResponse: (membership: MembershipResponse) => {
    user: {
        id: string;
        familyName: string;
        givenName: string;
        name: string;
    };
    role: import("../..").GroupRole;
};
export declare const scrubPII: (membership: Membership) => Membership;
