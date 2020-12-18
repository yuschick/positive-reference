import { AxiosInstance } from 'axios';
import { Thunk } from 'easy-peasy';
import { IMembershipModel } from './model';
import { FetchMembershipsPayload, EditMembershipPayload, DeleteMembershipPayload } from './payloads';
import { IStoreModel } from 'store';
export interface IMembershipModelThunks {
    deleteMembership: Thunk<IMembershipModel, DeleteMembershipPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    editMembership: Thunk<IMembershipModel, EditMembershipPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    fetchMemberships: Thunk<IMembershipModel, FetchMembershipsPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
}
declare const thunks: IMembershipModelThunks;
export default thunks;
