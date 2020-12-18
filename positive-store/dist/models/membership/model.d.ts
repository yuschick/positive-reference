import { IMembershipModelActions } from './actions';
import { IMembershipModelListeners } from './listeners';
import { IMembershipModelState } from './state';
import { IMembershipModelThunks } from './thunks';
export interface IMembershipModel extends IMembershipModelActions, IMembershipModelListeners, IMembershipModelState, IMembershipModelThunks {
}
declare const membershipModel: IMembershipModel;
export default membershipModel;
