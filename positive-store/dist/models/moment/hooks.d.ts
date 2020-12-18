import { ActionCreator, ThunkCreator } from 'easy-peasy';
import { CreateMomentPayload, DeleteMomentPayload, DeleteMomentMediaPayload, EditMomentPayload, FetchMomentsPayload } from './payloads';
import { Moment } from 'types/moment';
export declare const useMomentState: () => import("easy-peasy").StateMapper<{
    moments: Moment[];
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    requestTimestamps: Record<import("../../types/request").RequestTimestamp, number>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
    cursor?: string | undefined;
    firstMomentFlag: boolean;
    moreMomentsExist: import("easy-peasy").Computed<import("./state").IMomentModelState, boolean, {}>;
    tempMoments: import("../../types/moment").TempMoment[];
}>;
export declare const useMomentActions: () => {
    createMoment: ThunkCreator<CreateMomentPayload, any>;
    deleteMoment: ThunkCreator<DeleteMomentPayload, void>;
    deleteMomentMedia: ThunkCreator<DeleteMomentMediaPayload, void>;
    editMoment: ThunkCreator<EditMomentPayload, void>;
    fetchMoments: ThunkCreator<FetchMomentsPayload, Moment[]>;
    setFirstMomentFlag: ActionCreator<boolean>;
};
