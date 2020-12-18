function User({ ID, Email, GivenName, FamilyName }) {
  if (!(this instanceof User)) {
    return new User({ ID, Email, GivenName, FamilyName });
  }

  this.id = ID;
  this.email = Email;
  this.givenName = GivenName;
  this.familyName = FamilyName;
  this.name = formatName(GivenName, FamilyName);
}

const formatName = (givenName, familyName) => [givenName, familyName].filter(Boolean).join(' ');

const serialize = ({ id, email, givenName, familyName }) => ({
  ID: id,
  Email: email,
  GivenName: givenName,
  FamilyName: familyName,
});

const scrubPII = user => {
  if (!user) {
    return undefined;
  }
  return { id: user.id };
};

export { formatName, serialize, scrubPII };
export default User;
