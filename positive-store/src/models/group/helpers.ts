import { scrubPII as scrubMembershipsPII } from 'models/membership/helpers';
import { scrubPII as scrubInvitationsPII } from 'models/invitation/helpers';

import { Class, Group, GroupResponse, GroupType, GroupRole, Organization } from 'types/group';

export const isClass = (g: Group): g is Class => g.type === GroupType.class;

export const isOrphanClass = (g: Group): g is Class => isClass(g) && !g.parentGroup;

export const isOrg = (g: Group): g is Organization => g.type === GroupType.organization;

export const formatGroupsResponse = (groups: GroupResponse[]): Group[] =>
  groups
    .map((group: GroupResponse) => ({
      id: group.ID,
      name: group.Name,
      userRole: group.UserRole,
      type: group.Type,
      parentGroup: group.ParentGroup
        ? {
            id: group.ParentGroup.ID,
            name: group.ParentGroup.Name,
            type: group.ParentGroup.Type,
            userRole: group.ParentGroup.UserRole,
          }
        : undefined,
    }))
    .sort((a: Group, b: Group): number => {
      const nameA = a.name?.toUpperCase() || '';
      const nameB = b.name?.toUpperCase() || '';
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

export const appendChildGroups = (groups: Group[]): Group[] =>
  groups.map((group) => ({
    ...group,
    childGroups:
      group.type === GroupType.organization
        ? groups.filter(({ parentGroup }) => parentGroup && parentGroup.id === group.id)
        : undefined,
  }));

export const resolveRestrictedAccount = (groups: Group[]) => {
  const hasOrganizations = filterOrganizations(groups || []).length > 0;
  const hasParentGroups = (groups || []).filter((group) => group.parentGroup).length > 0;

  return hasParentGroups && !hasOrganizations;
};

const filterOrganizations = (groups: Group[], managerOnly: boolean = false) =>
  groups
    .filter((group) => group.type === GroupType.organization)
    .filter((organization) => (managerOnly ? organization.userRole === GroupRole.manager : true));

export const scrubPII = (group: Group): Group => ({
  id: group.id,
  type: group.type,
  userRole: group.userRole,
  parentGroup: group.parentGroup && scrubPII(group.parentGroup),
  memberships: group.memberships?.map((m) => scrubMembershipsPII(m)),
  invitations: group.invitations?.map((i) => scrubInvitationsPII(i)),
});
