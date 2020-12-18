import { AxiosInstance } from 'axios';
import { Thunk, thunk } from 'easy-peasy';

import { IAuthModel } from './model';
import { IStoreModel } from 'store';
import { Language } from 'types/settings';
import { RequestType } from './requests';
import { Status } from 'types/status';
import { User, UserResponse } from 'types/user';
import { formatUserResponse } from 'models/user/helpers';
import { paths } from 'api';

export type PostIdTokenPayload = { idToken: string; language: Language };
export type RequestCodePayload = { clientId: string; domain: string; redirectUri: string };
export type RequestTokensPayload = {
  code?: string;
  refreshToken?: string;
  clientId: string;
  domain: string;
  redirectUri?: string;
};

export interface IAuthModelThunks {
  authenticate: Thunk<IAuthModel, undefined, any, IStoreModel>;
  initialize: Thunk<IAuthModel, undefined, any, IStoreModel>;
  logout: Thunk<IAuthModel, undefined, any, IStoreModel>;
  postIdToken: Thunk<IAuthModel, PostIdTokenPayload, { client: AxiosInstance }, IStoreModel>;
  refresh: Thunk<IAuthModel, undefined, any, IStoreModel>;
  requestCode: Thunk<IAuthModel, RequestCodePayload, any, IStoreModel>;
  requestTokens: Thunk<IAuthModel, RequestTokensPayload, any, IStoreModel>;
  silentRefresh: Thunk<IAuthModel, undefined, any, IStoreModel>;
}

const thunks: IAuthModelThunks = {
  authenticate: thunk(async () => console.log('This is a no-op, to be declared in UI package.')),
  initialize: thunk(async () => console.log('This is a no-op, to be declared in UI package.')),
  logout: thunk(async () => console.log('This is a no-op, to be declared in UI package.')),

  postIdToken: thunk(
    async (
      actions,
      payload,
      { getState, getStoreActions, getStoreState, injections: { client } }
    ) => {
      if (getState().status.postIdToken !== Status.idle) return;

      actions.setStatus({ type: RequestType.postIdToken, value: Status.loading });

      try {
        const user: User | undefined = await client
          .post(paths.session.postIdToken({ language: payload.language }), undefined, {
            headers: { Authorization: 'Bearer ' + payload.idToken },
          })
          .then((response: { data: UserResponse }): User | undefined => {
            return response?.data ? formatUserResponse(response.data) : undefined;
          });

        if (!user) {
          throw new Error('Id token post request response is invalid.');
        }

        actions.setSessionExpiresAt(Math.floor(Date.now() / 1000 + 20 * 60));

        if (!getStoreState().user.user) {
          getStoreActions().user.setUser(user);
        }

        actions.setError({ type: RequestType.postIdToken, value: undefined });
      } catch (error) {
        getStoreActions().user.setUser(undefined);

        actions.setError({
          type: RequestType.postIdToken,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setStatus({ type: RequestType.postIdToken, value: Status.complete });
      }
    }
  ),

  refresh: thunk(async () => console.log('This is a no-op, to be declared in UI package.')),
  requestCode: thunk(async () => console.log('This is a no-op, to be declared in UI package.')),
  requestTokens: thunk(async () => console.log('This is a no-op, to be declared in UI package.')),
  silentRefresh: thunk(async () => console.log('This is a no-op, to be declared in UI package.')),
};

export default thunks;
