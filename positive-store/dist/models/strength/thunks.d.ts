import { Thunk } from 'easy-peasy';
import { IStrengthModel } from './model';
import { FetchStrengthPayload, FetchStrengthAttachmentPayload } from './payloads';
import { IStoreModel } from 'store';
export interface IStrengthModelThunks {
    fetchStrengths: Thunk<IStrengthModel, FetchStrengthPayload, void, IStoreModel>;
    fetchStrengthAttachment: Thunk<IStrengthModel, FetchStrengthAttachmentPayload, void, IStoreModel>;
}
declare const thunks: IStrengthModelThunks;
export default thunks;
