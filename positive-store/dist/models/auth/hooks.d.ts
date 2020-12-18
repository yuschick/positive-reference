import { ThunkCreator } from 'easy-peasy';
export declare const useAuthState: () => import("easy-peasy").StateMapper<{
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
    idToken?: string | undefined;
    idTokenExpiresAt?: number | undefined;
    idTokenExpiresIn: import("easy-peasy").Computed<import("./state").IAuthModelState, () => number | undefined, {}>;
    isInitialized?: boolean | undefined;
    sessionExpiresAt?: number | undefined;
    sessionExpiresIn: import("easy-peasy").Computed<import("./state").IAuthModelState, () => number | undefined, {}>;
    request: Partial<Record<import("./requests").RequestType, Promise<undefined> | undefined>>;
}>;
export declare const useAuthActions: () => {
    authenticate: ThunkCreator<void, void>;
    initialize: ThunkCreator<void, void>;
    logout: ThunkCreator<void, void>;
};
