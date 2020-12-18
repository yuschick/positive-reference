import { ActionCreator, ThunkCreator } from 'easy-peasy';
import { FetchAudiencesPayload } from './payloads';
import { Audience } from 'types/audience';
export declare const useAudienceState: () => import("easy-peasy").StateMapper<{
    audiences: Audience[];
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    activeAudience: import("easy-peasy").Computed<import("./state").IAudienceModelState, Audience, {}>;
    activeAudienceSlug?: string | undefined;
    defaultAudienceSlug: import("easy-peasy").Computed<import("./state").IAudienceModelState, string, import("../../store").IStoreModel>;
    rawAudiences: Audience[];
    requestTimestamps: Record<import("../../types/request").RequestTimestamp, number>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
}>;
export declare const useAudienceActions: () => {
    fetchAudiences: ThunkCreator<FetchAudiencesPayload, Audience[]>;
    setActiveAudienceSlug: ActionCreator<string>;
};
