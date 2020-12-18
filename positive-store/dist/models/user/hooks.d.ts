import { User } from 'types/user';
export declare const useUserState: () => import("easy-peasy").StateMapper<{
    user?: User | undefined;
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    hasError: import("easy-peasy").Computed<import("./state").IUserModelState, boolean, {}>;
    loading: Partial<Record<import("./requests").RequestType, boolean>>;
    isLoading: import("easy-peasy").Computed<import("./state").IUserModelState, boolean, {}>;
}>;
export declare const useUserActions: () => {
    scrubPII: (user: User) => User;
};
