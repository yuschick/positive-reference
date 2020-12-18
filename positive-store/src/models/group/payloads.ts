import { Group } from 'types/group';

export type CreateGroupPayload = { name: string; parentGroupId?: string };
export type DeleteGroupPayload = { groupId: string };
export type EditGroupPayload = { group: Group };
export type FetchGroupsPayload = { groupId: string } | undefined;
