import { Status } from 'types/status';
export declare enum RequestType {
    authenticate = "authenticate",
    initialize = "initialize",
    logout = "logout",
    postIdToken = "postIdToken",
    refresh = "refresh",
    silentRefresh = "silentRefresh"
}
export declare type RequestTypeToError = Partial<Record<RequestType, {
    error: Error;
    status: number;
} | undefined>>;
export declare type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
