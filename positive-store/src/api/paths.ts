import { Path } from 'types/api';

export default {
  goal: {
    delete: ({ groupId, goalId }: { groupId: string; goalId: string }) =>
      `${Path.groups}/${groupId}/${Path.goals}/${goalId}`,
    edit: ({ groupId, goalId }: { groupId: string; goalId: string }) =>
      `${Path.groups}/${groupId}/${Path.goals}/${goalId}`,
    create: ({ groupId }: { groupId: string }) => `${Path.groups}/${groupId}/${Path.goals}`,
  },
  goals: {
    get: ({ groupId }: { groupId: string }) => `${Path.groups}/${groupId}/${Path.goals}`,
  },
  group: {
    create: {
      group: () => `/${Path.groups}/`,
      subgroup: ({ groupId }: { groupId: string }) => `/${Path.groups}/${groupId}/subgroups`,
    },
    invitations: {
      get: ({ groupId }: { groupId: string }) => `${Path.groups}/${groupId}/${Path.invitations}`,
    },
    memberships: {
      delete: ({ groupId, memberId }: { groupId: string; memberId: string }) =>
        `${Path.groups}/${groupId}/members/${memberId}`,
      edit: ({ groupId, memberId }: { groupId: string; memberId: string }) =>
        `${Path.groups}/${groupId}/members/${memberId}`,
      get: ({ groupId }: { groupId: string }) => `${Path.groups}/${groupId}/${Path.members}`,
      post: ({ groupId }: { groupId: string }) => `${Path.groups}/${groupId}/members`,
    },
    delete: ({ groupId }: { groupId: string }) => `/${Path.groups}/${groupId}`,
    edit: ({ groupId }: { groupId: string }) => `/${Path.groups}/${groupId}`,
    get: ({ groupId }: { groupId: string }) => `/${Path.groups}/${groupId}`,
  },
  groups: {
    get: () => `/${Path.groups}`,
  },
  invitation: {
    accept: ({ invitationId }: { invitationId: string }) =>
      `${Path.invitations}/${invitationId}/acceptance`,
    delete: ({ invitationId }: { invitationId: string }) => `${Path.invitations}/${invitationId}`,
    get: ({ token }: { token: string }) => `${Path.invitations}?token=${token}`,
    resend: ({ invitationId }: { invitationId: string }) =>
      `${Path.invitations}/${invitationId}/resend`,
  },
  moment: {
    create: ({ groupId }: { groupId: string }) => `${Path.groups}/${groupId}/moments`,
    delete: ({ groupId, momentId }: { groupId: string; momentId: string }) =>
      `${Path.groups}/${groupId}/moments/${momentId}`,
    edit: ({ groupId, momentId }: { groupId: string; momentId: string }) =>
      `${Path.groups}/${groupId}/moments/${momentId}`,
    media: {
      create: ({ momentId }: { momentId: string }) => `${Path.media}?momentID=${momentId}`,
      delete: ({ mediaId }: { mediaId: string }) => `${Path.media}/${mediaId}`,
    },
  },
  moments: {
    get: ({ groupId, cursor, count }: { groupId: string; cursor?: string; count?: number }) =>
      `${Path.groups}/${groupId}/moments${
        cursor && count ? `?cursor=${cursor}&count=${count}` : ''
      }${cursor && !count ? `?cursor=${cursor}` : ''}${!cursor && count ? `?count=${count}` : ''}`,
  },
  session: {
    postIdToken: ({ language }: { language: string }) => `/${Path.session}?lang=${language}`,
  },
};
