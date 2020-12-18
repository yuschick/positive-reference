import { ThunkOn } from 'easy-peasy';
import { IInvitationModel } from './model';
import { IStoreModel } from 'store';
export interface IInvitationModelListeners {
    onSetGroupInvitations?: ThunkOn<IInvitationModel, void, IStoreModel>;
    onSetStatus: ThunkOn<IInvitationModel>;
}
declare const listeners: IInvitationModelListeners;
export default listeners;
