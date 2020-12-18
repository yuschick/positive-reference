import { ThunkCreator, ActionCreator } from 'easy-peasy';

import {
  CreateGoalPayload,
  DeleteGoalPayload,
  EditGoalPayload,
  FetchGoalsPayload,
} from './payloads';

import { usePositiveActions, usePositiveState } from 'store';
import { Goal } from 'types/goal';

export const useGoalState = () => usePositiveState((state) => state.goals);

export const useGoalActions: () => {
  createGoal: ThunkCreator<CreateGoalPayload, void>;
  deleteGoal: ThunkCreator<DeleteGoalPayload, void>;
  editGoal: ThunkCreator<EditGoalPayload, void>;
  fetchGoals: ThunkCreator<FetchGoalsPayload, Goal[]>;
  setFirstGoalFlag: ActionCreator<boolean>;
} = () => {
  const { createGoal, deleteGoal, editGoal, fetchGoals, setFirstGoalFlag } = usePositiveActions(
    (actions) => actions.goals
  );
  return {
    createGoal,
    deleteGoal,
    editGoal,
    fetchGoals,
    setFirstGoalFlag,
  };
};
