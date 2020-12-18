import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { CreateGoalPayload, DeleteGoalPayload, EditGoalPayload, FetchGoalsPayload } from './payloads';
import { Goal } from 'types/goal';
export declare const useGoalState: () => import("easy-peasy").StateMapper<{
    goals: Goal[];
    error: Partial<Record<import("./requests").RequestType, {
        error: Error;
        status: number;
    } | undefined>>;
    requestTimestamps: Record<import("../../types/request").RequestTimestamp, number>;
    status: Partial<Record<import("./requests").RequestType, import("../..").Status>>;
    firstGoalFlag: boolean;
}>;
export declare const useGoalActions: () => {
    createGoal: ThunkCreator<CreateGoalPayload, void>;
    deleteGoal: ThunkCreator<DeleteGoalPayload, void>;
    editGoal: ThunkCreator<EditGoalPayload, void>;
    fetchGoals: ThunkCreator<FetchGoalsPayload, Goal[]>;
    setFirstGoalFlag: ActionCreator<boolean>;
};
