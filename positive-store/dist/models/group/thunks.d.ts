import { AxiosInstance } from 'axios';
import { Thunk } from 'easy-peasy';
import { CreateGroupPayload, DeleteGroupPayload, EditGroupPayload, FetchGroupsPayload } from './payloads';
import { IGroupModel } from './model';
import { IStoreModel } from 'store';
export interface IGroupModelThunks {
    createGroup: Thunk<IGroupModel, CreateGroupPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    deleteGroup: Thunk<IGroupModel, DeleteGroupPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    editGroup: Thunk<IGroupModel, EditGroupPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    fetchGroups: Thunk<IGroupModel, FetchGroupsPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
}
declare const thunks: IGroupModelThunks;
export default thunks;
