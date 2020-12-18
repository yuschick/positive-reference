import { Thunk } from 'easy-peasy';
import { IAudienceModel } from './model';
import { FetchAudiencesPayload } from './payloads';
import { IStoreModel } from 'store';
export interface IAudienceModelThunks {
    fetchAudiences: Thunk<IAudienceModel, FetchAudiencesPayload, void, IStoreModel>;
}
declare const thunks: IAudienceModelThunks;
export default thunks;
