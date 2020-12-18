import { ThunkOn } from 'easy-peasy';
import { IMembershipModel } from './model';
import { IStoreModel } from 'store';
export interface IMembershipModelListeners {
    onSetMemberships?: ThunkOn<IMembershipModel, void, IStoreModel>;
    onSetStatus: ThunkOn<IMembershipModel, IStoreModel>;
}
declare const listeners: IMembershipModelListeners;
export default listeners;
