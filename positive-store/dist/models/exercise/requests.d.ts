import { Status } from 'types/status';
export declare enum RequestType {
    fetchExercises = "fetchExercises"
}
export declare type RequestTypeToError = Partial<Record<RequestType, {
    error: Error;
    status: number;
} | undefined>>;
export declare type RequestTypeToStatus = Partial<Record<RequestType, Status>>;
