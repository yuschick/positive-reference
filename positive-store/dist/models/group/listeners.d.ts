import { ThunkOn } from 'easy-peasy';
import { IGroupModel } from './model';
import { IStoreModel } from 'store';
export interface IGroupModelListeners {
    onSetGroups?: ThunkOn<IGroupModel, void, IStoreModel>;
    onSetSelectedGroupId?: ThunkOn<IGroupModel, void, IStoreModel>;
    onSetSelectedGroup?: ThunkOn<IGroupModel, void, IStoreModel>;
    onSetStatus: ThunkOn<IGroupModel, IStoreModel>;
}
declare const listeners: IGroupModelListeners;
export default listeners;
