import { Status } from 'types/status';
export declare enum RequestType {
    acceptInvitation = "acceptInvitation",
    deleteInvitation = "deleteInvitation",
    fetchInvitation = "fetchInvitation",
    fetchInvitations = "fetchInvitations",
    sendInvitation = "sendInvitation",
    resendInvitation = "resendInvitation"
}
export declare type RequestTypeToError = Partial<Record<RequestType, {
    error: Error;
    status: number;
} | undefined>>;
export declare type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
