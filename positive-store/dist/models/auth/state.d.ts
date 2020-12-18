import { Computed } from 'easy-peasy';
import { RequestType, RequestTypeToError, RequestTypeToStatus } from './requests';
export interface IAuthModelState {
    error: RequestTypeToError;
    idToken?: string;
    idTokenExpiresAt?: number;
    idTokenExpiresIn: Computed<IAuthModelState, () => number | undefined>;
    isInitialized?: boolean;
    sessionExpiresAt?: number;
    sessionExpiresIn: Computed<IAuthModelState, () => number | undefined>;
    request: Partial<Record<RequestType, Promise<undefined> | undefined>>;
    status: RequestTypeToStatus;
}
declare const state: IAuthModelState;
export default state;
