import { Action } from 'easy-peasy';
import { RequestType } from './requests';
import { IUserModel } from './model';
import { User } from 'types/user';
export interface IUserModelActions {
    setLoading: Action<IUserModel, {
        type: RequestType;
        value: boolean;
    }>;
    setError: Action<IUserModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setUser: Action<IUserModel, User | undefined>;
}
declare const actions: IUserModelActions;
export default actions;
