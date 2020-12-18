import { Computed } from 'easy-peasy';
import { RequestTypeToError, RequestTypeToBool } from './requests';
import { User } from 'types/user';
export interface IUserModelState {
    error: RequestTypeToError;
    hasError: Computed<IUserModelState, boolean>;
    loading: RequestTypeToBool;
    isLoading: Computed<IUserModelState, boolean>;
    user?: User;
}
declare const state: IUserModelState;
export default state;
