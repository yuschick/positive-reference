import { IInvitationModelActions } from './actions';
import { IInvitationModelListeners } from './listeners';
import { IInvitationModelState } from './state';
import { IInvitationModelThunks } from './thunks';
export interface IInvitationModel extends IInvitationModelActions, IInvitationModelListeners, IInvitationModelState, IInvitationModelThunks {
}
declare const invitationModel: IInvitationModel;
export default invitationModel;
