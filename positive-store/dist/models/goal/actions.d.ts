import { Action } from 'easy-peasy';
import { RequestType } from './requests';
import { IGoalModel } from './model';
import { Goal } from 'types/goal';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';
export interface IGoalModelActions {
    setError: Action<IGoalModel, {
        type: RequestType;
        value: {
            error: Error;
            status: number;
        } | undefined;
    }>;
    setFirstGoalFlag: Action<IGoalModel, boolean>;
    setGoals: Action<IGoalModel, Goal[]>;
    setRequestTimestamps: Action<IGoalModel, {
        type: RequestTimestamp;
        value: number;
    }>;
    setStatus: Action<IGoalModel, {
        type: RequestType;
        value: Status;
    }>;
}
declare const actions: IGoalModelActions;
export default actions;
