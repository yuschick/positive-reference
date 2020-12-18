import { Computed } from 'easy-peasy';
import { RequestTypeToError, RequestTypeToStatus } from './requests';
import { IStoreModel } from 'store';
import { Audience } from 'types/audience';
import { RequestTimestampPayload } from 'types/request';
export interface IAudienceModelState {
    error: RequestTypeToError;
    audiences: Audience[];
    activeAudience: Computed<IAudienceModelState, Audience>;
    activeAudienceSlug?: string;
    defaultAudienceSlug: Computed<IAudienceModelState, string, IStoreModel>;
    rawAudiences: Audience[];
    requestTimestamps: RequestTimestampPayload;
    status: RequestTypeToStatus;
}
declare const state: IAudienceModelState;
export default state;
