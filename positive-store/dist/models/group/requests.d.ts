import { Status } from 'types/status';
export declare enum RequestType {
    fetchGroups = "fetchGroups",
    setSelectedGroup = "setSelectedGroup",
    createGroup = "createGroup",
    editGroup = "editGroup",
    deleteGroup = "deleteGroup"
}
export declare type RequestTypeToError = Partial<Record<RequestType, {
    error: Error;
    status: number;
} | undefined>>;
export declare type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
