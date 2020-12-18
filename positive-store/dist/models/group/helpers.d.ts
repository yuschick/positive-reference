import { Class, Group, GroupResponse, Organization } from 'types/group';
export declare const isClass: (g: Group) => g is Class;
export declare const isOrphanClass: (g: Group) => g is Class;
export declare const isOrg: (g: Group) => g is Organization;
export declare const formatGroupsResponse: (groups: GroupResponse[]) => Group[];
export declare const appendChildGroups: (groups: Group[]) => Group[];
export declare const resolveRestrictedAccount: (groups: Group[]) => boolean;
export declare const scrubPII: (group: Group) => Group;
