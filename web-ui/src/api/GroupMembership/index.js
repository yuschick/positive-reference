import User, { scrubPII as scrubUserPII } from 'api/User';

function GroupMembership({ ID, GivenName, FamilyName, Role }) {
  if (!(this instanceof GroupMembership)) {
    return new GroupMembership({ ID, GivenName, FamilyName, Role });
  }

  this.user = new User({ ID, GivenName, FamilyName });
  this.role = Role;
}

const serialize = ({ id, role }) => ({
  ID: id,
  Role: role,
});

const scrubPII = membership => {
  if (!membership) {
    return undefined;
  }

  return {
    role: membership.role,
    user: scrubUserPII(membership.user),
  };
};

const scrubPIIs = memberships => {
  if (!memberships) {
    return undefined;
  }
  return memberships.map(scrubPII);
};

export { scrubPII, scrubPIIs, serialize };

export default GroupMembership;
