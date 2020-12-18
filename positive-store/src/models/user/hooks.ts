import { scrubPII } from './helpers';
import { usePositiveState } from 'store';

import { User } from 'types/user';

export const useUserState = () => usePositiveState((state) => state.user);

export const useUserActions: () => {
  scrubPII: (user: User) => User;
} = () => {
  return { scrubPII };
};
