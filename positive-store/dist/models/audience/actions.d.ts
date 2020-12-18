import { Action } from 'easy-peasy';
import { RequestType } from './requests';
import { IAudienceModel } from './model';
import { Audience } from 'types/audience';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
export interface IAudienceModelActions {
    setActiveAudienceSlug: Action<IAudienceModel, string | undefined>;
    setAudiences: Action<IAudienceModel, Audience[]>;
    setError: Action<IAudienceModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setRawAudiences: Action<IAudienceModel, Audience[]>;
    setRequestTimestamps: Action<IAudienceModel, {
        type: RequestTimestamp;
        value: number;
    }>;
    setStatus: Action<IAudienceModel, {
        type: RequestType;
        value: Status;
    }>;
}
declare const actions: IAudienceModelActions;
export default actions;
