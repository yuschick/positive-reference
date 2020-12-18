import { Action } from 'easy-peasy';
import { IAuthModel } from './model';
import { RequestType } from './requests';
import { Status } from 'types/status';
export interface IAuthModelActions {
    setError: Action<IAuthModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setIdToken: Action<IAuthModel, string | undefined>;
    setIdTokenExpiresAt: Action<IAuthModel, number | undefined>;
    setIsInitialized: Action<IAuthModel, boolean>;
    setRequest: Action<IAuthModel, {
        type: RequestType;
        value: Promise<undefined> | undefined;
    }>;
    setSessionExpiresAt: Action<IAuthModel, number | undefined>;
    setStatus: Action<IAuthModel, {
        type: RequestType;
        value: Status;
    }>;
}
declare const actions: IAuthModelActions;
export default actions;
