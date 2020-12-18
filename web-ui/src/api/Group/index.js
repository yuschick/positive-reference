import { scrubPIIs as scrubMembershipsPIIs } from 'api/GroupMembership';
import { scrubPIIs as scrubInvitationsPIIs } from 'api/GroupInvitation';

const groupType = {
  class: 'class',
  organization: 'organization',
};

const nameMinLength = 1;
const nameMaxLength = 32;

function Group({ ID, Name, Type, ParentGroup, UserRole }) {
  if (!(this instanceof Group)) {
    return new Group({ ID, Name, Type, ParentGroup, UserRole });
  }

  this.id = ID;
  this.name = Name;
  this.type = Type;
  this.userRole = UserRole;
  this.parentGroup = ParentGroup ? new Group(ParentGroup) : undefined;
  this.memberships = [];
  this.invitations = [];
}

const serialize = ({ id, name }) => ({
  ID: id,
  Name: name,
});

const scrubPII = group => {
  if (!group) {
    return undefined;
  }

  const { id, type, userRole, parentGroup, memberships, invitations } = group;

  return {
    id,
    type,
    userRole,
    parentGroup: scrubPII(parentGroup),
    memberships: scrubMembershipsPIIs(memberships),
    invitations: scrubInvitationsPIIs(invitations),
  };
};

const scrubPIIs = groups => {
  if (!groups) {
    return undefined;
  }
  return groups.map(scrubPII);
};

export { groupType, nameMinLength, nameMaxLength, scrubPII, scrubPIIs, serialize };
export default Group;
