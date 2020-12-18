import { ThunkCreator } from 'easy-peasy';

import { usePositiveActions, usePositiveState } from 'store';

export const useAuthState = () => usePositiveState((state) => state.auth);

export const useAuthActions: () => {
  authenticate: ThunkCreator<void, void>;
  initialize: ThunkCreator<void, void>;
  logout: ThunkCreator<void, void>;
} = () => {
  const { authenticate, initialize, logout } = usePositiveActions((actions) => actions.auth);
  return { authenticate, initialize, logout };
};
