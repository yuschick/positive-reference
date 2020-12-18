import { Action, action } from 'easy-peasy';

import { RequestType } from './requests';
import { IUserModel } from './model';
import { User } from 'types/user';

export interface IUserModelActions {
  setLoading: Action<IUserModel, { type: RequestType; value: boolean }>;
  setError: Action<
    IUserModel,
    {
      type: RequestType;
      value: { error: Error; status: number } | undefined;
    }
  >;
  setUser: Action<IUserModel, User | undefined>;
}

const actions: IUserModelActions = {
  setError: action((state, payload) => {
    state.error[payload.type] = payload.value;
  }),

  setLoading: action((state, payload) => {
    state.loading[payload.type] = payload.value;
  }),

  setUser: action((state, payload) => {
    state.user = payload;
  }),
};

export default actions;
