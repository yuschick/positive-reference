import { IUserModelActions } from './actions';
import { IUserModelState } from './state';
export interface IUserModel extends IUserModelState, IUserModelActions {
}
declare const userModel: IUserModel;
export default userModel;
