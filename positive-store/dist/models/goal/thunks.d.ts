import { AxiosInstance } from 'axios';
import { Thunk } from 'easy-peasy';
import { IGoalModel } from './model';
import { CreateGoalPayload, DeleteGoalPayload, EditGoalPayload, FetchGoalsPayload } from './payloads';
import { IStoreModel } from 'store';
export interface IGoalModelThunks {
    createGoal: Thunk<IGoalModel, CreateGoalPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    deleteGoal: Thunk<IGoalModel, DeleteGoalPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    editGoal: Thunk<IGoalModel, EditGoalPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
    fetchGoals: Thunk<IGoalModel, FetchGoalsPayload, {
        client: AxiosInstance;
    }, IStoreModel>;
}
declare const thunks: IGoalModelThunks;
export default thunks;
