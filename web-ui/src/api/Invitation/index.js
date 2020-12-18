import { default as GroupConstructor } from 'api/Group';
import User from 'api/User';

function Invitation({ ID, Email, Role, Status, GroupID, Group, Token, Creator }) {
  if (!(this instanceof Invitation)) {
    return new Invitation({ ID, Email, Role, Status, GroupID, Group, Token, Creator });
  }

  this.id = ID;
  this.email = Email;
  this.role = Role;
  this.status = Status;
  this.groupId = GroupID;
  this.group = Group ? GroupConstructor(Group) : null;
  this.token = Token;
  this.creator = Creator ? User(Creator) : null;
}

const serialize = ({ id, email, role, groupId, token }) => ({
  ID: id,
  Email: email,
  Role: role,
  GroupID: groupId,
  Token: token,
});

export { serialize };
export default Invitation;
