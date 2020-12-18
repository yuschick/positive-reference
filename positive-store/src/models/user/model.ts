import actions, { IUserModelActions } from './actions';
import state, { IUserModelState } from './state';

export interface IUserModel extends IUserModelState, IUserModelActions {}

const userModel: IUserModel = {
  ...state,
  ...actions,
};

export default userModel;
