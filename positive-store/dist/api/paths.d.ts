declare const _default: {
    goal: {
        delete: ({ groupId, goalId }: {
            groupId: string;
            goalId: string;
        }) => string;
        edit: ({ groupId, goalId }: {
            groupId: string;
            goalId: string;
        }) => string;
        create: ({ groupId }: {
            groupId: string;
        }) => string;
    };
    goals: {
        get: ({ groupId }: {
            groupId: string;
        }) => string;
    };
    group: {
        create: {
            group: () => string;
            subgroup: ({ groupId }: {
                groupId: string;
            }) => string;
        };
        invitations: {
            get: ({ groupId }: {
                groupId: string;
            }) => string;
        };
        memberships: {
            delete: ({ groupId, memberId }: {
                groupId: string;
                memberId: string;
            }) => string;
            edit: ({ groupId, memberId }: {
                groupId: string;
                memberId: string;
            }) => string;
            get: ({ groupId }: {
                groupId: string;
            }) => string;
            post: ({ groupId }: {
                groupId: string;
            }) => string;
        };
        delete: ({ groupId }: {
            groupId: string;
        }) => string;
        edit: ({ groupId }: {
            groupId: string;
        }) => string;
        get: ({ groupId }: {
            groupId: string;
        }) => string;
    };
    groups: {
        get: () => string;
    };
    invitation: {
        accept: ({ invitationId }: {
            invitationId: string;
        }) => string;
        delete: ({ invitationId }: {
            invitationId: string;
        }) => string;
        get: ({ token }: {
            token: string;
        }) => string;
        resend: ({ invitationId }: {
            invitationId: string;
        }) => string;
    };
    moment: {
        create: ({ groupId }: {
            groupId: string;
        }) => string;
        delete: ({ groupId, momentId }: {
            groupId: string;
            momentId: string;
        }) => string;
        edit: ({ groupId, momentId }: {
            groupId: string;
            momentId: string;
        }) => string;
        media: {
            create: ({ momentId }: {
                momentId: string;
            }) => string;
            delete: ({ mediaId }: {
                mediaId: string;
            }) => string;
        };
    };
    moments: {
        get: ({ groupId, cursor, count }: {
            groupId: string;
            cursor?: string | undefined;
            count?: number | undefined;
        }) => string;
    };
    session: {
        postIdToken: ({ language }: {
            language: string;
        }) => string;
    };
};
export default _default;
