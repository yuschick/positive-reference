import { Status } from 'types/status';
export declare enum RequestType {
    createMoment = "createMoment",
    createMomentMedia = "createMomentMedia",
    deleteMoment = "deleteMoment",
    deleteMomentMedia = "deleteMomentMedia",
    editMoment = "editMoment",
    fetchMoments = "fetchMoments",
    fetchMoreMoments = "fetchMoreMoments"
}
export declare type RequestTypeToError = Partial<Record<RequestType, {
    error: Error;
    status: number;
} | undefined>>;
export declare type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
