import User, { scrubPII as scrubUserPII } from 'api/User';

function GroupInvitation({ ID, Email, Role, Status, GroupID, Creator }) {
  if (!(this instanceof GroupInvitation)) {
    return new GroupInvitation({ ID, Email, Role, Status, GroupID, Creator });
  }

  this.id = ID;
  this.email = Email;
  this.role = Role;
  this.status = Status;
  this.group_id = GroupID;
  this.creator = Creator ? User(Creator) : null;
}

const scrubPII = invitation => {
  if (!invitation) {
    return undefined;
  }
  const { id, role, status, group_id, creator } = invitation;
  return {
    id,
    role,
    status,
    group_id,
    creator: scrubUserPII(creator),
  };
};

const scrubPIIs = invitations => {
  if (!invitations) {
    return undefined;
  }
  return invitations.map(scrubPII);
};

export { scrubPII, scrubPIIs };
export default GroupInvitation;
