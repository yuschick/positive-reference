import { AxiosInstance } from 'axios';
import { Thunk } from 'easy-peasy';
import { IAuthModel } from './model';
import { IStoreModel } from 'store';
import { Language } from 'types/settings';
export declare type PostIdTokenPayload = {
    idToken: string;
    language: Language;
};
export declare type RequestCodePayload = {
    clientId: string;
    domain: string;
    redirectUri: string;
};
export declare type RequestTokensPayload = {
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
    postIdToken: Thunk<IAuthModel, PostIdTokenPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    refresh: Thunk<IAuthModel, undefined, any, IStoreModel>;
    requestCode: Thunk<IAuthModel, RequestCodePayload, any, IStoreModel>;
    requestTokens: Thunk<IAuthModel, RequestTokensPayload, any, IStoreModel>;
    silentRefresh: Thunk<IAuthModel, undefined, any, IStoreModel>;
}
declare const thunks: IAuthModelThunks;
export default thunks;
