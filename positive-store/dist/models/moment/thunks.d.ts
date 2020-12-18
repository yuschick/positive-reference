import { AxiosInstance } from 'axios';
import { Thunk } from 'easy-peasy';
import { CreateMomentMediaPayload, CreateMomentPayload, DeleteMomentMediaPayload, DeleteMomentPayload, EditMomentPayload, FetchMomentsPayload } from './payloads';
import { IMomentModel } from './model';
import { IStoreModel } from 'store';
export interface IMomentModelThunks {
    createMoment: Thunk<IMomentModel, CreateMomentPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    createMomentMedia: Thunk<IMomentModel, CreateMomentMediaPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    deleteMoment: Thunk<IMomentModel, DeleteMomentPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    deleteMomentMedia: Thunk<IMomentModel, DeleteMomentMediaPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    editMoment: Thunk<IMomentModel, EditMomentPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    fetchMoments: Thunk<IMomentModel, FetchMomentsPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
}
declare const thunks: IMomentModelThunks;
export default thunks;
