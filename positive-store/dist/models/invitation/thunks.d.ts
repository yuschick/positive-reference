import { Thunk } from 'easy-peasy';
import { AxiosInstance } from 'axios';
import { IInvitationModel } from './model';
import { FetchInvitationPayload, FetchGroupInvitationsPayload, InviteMemberPayload, DeleteInvitationPayload, AcceptInvitationPayload, ResendInvitationPayload } from './payloads';
import { IStoreModel } from 'store';
export interface IInvitationModelThunks {
    acceptInvitation: Thunk<IInvitationModel, AcceptInvitationPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    deleteInvitation: Thunk<IInvitationModel, DeleteInvitationPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    fetchInvitation: Thunk<IInvitationModel, FetchInvitationPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    fetchInvitations: Thunk<IInvitationModel, FetchGroupInvitationsPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    sendInvitation: Thunk<IInvitationModel, InviteMemberPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    resendInvitation: Thunk<IInvitationModel, ResendInvitationPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
}
declare const thunks: IInvitationModelThunks;
export default thunks;
