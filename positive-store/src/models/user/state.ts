import { computed, Computed } from 'easy-peasy';

import { RequestTypeToError, RequestTypeToBool } from './requests';
import { User } from 'types/user';
import { anyLoadingValueTrue, anyErrorValueTrue } from 'utils/anyValueTrue';

export interface IUserModelState {
  error: RequestTypeToError;
  hasError: Computed<IUserModelState, boolean>;
  loading: RequestTypeToBool;
  isLoading: Computed<IUserModelState, boolean>;
  user?: User;
}

const state: IUserModelState = {
  error: {},
  hasError: computed((state) => anyErrorValueTrue(state.error)),
  loading: {},
  isLoading: computed((state) => anyLoadingValueTrue(state.loading)),
  user: undefined,
};

export default state;
