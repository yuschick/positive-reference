import { User, UserResponse } from 'types/user';
import { formatName } from 'utils/formatName';

export const formatUserResponse = (userResponse: UserResponse): User => ({
  id: userResponse.ID,
  email: userResponse.Email,
  givenName: userResponse.GivenName,
  familyName: userResponse.FamilyName,
  name: formatName(userResponse.GivenName, userResponse.FamilyName),
});

export const scrubPII = (user: User): User => ({ id: user.id });
