import { AxiosInstance } from 'axios';
import { Thunk, thunk } from 'easy-peasy';

import { IGoalModel } from './model';
import { formatGoalResponse } from './helpers';
import { RequestType } from './requests';
import {
  CreateGoalPayload,
  DeleteGoalPayload,
  EditGoalPayload,
  FetchGoalsPayload,
} from './payloads';

import { IStoreModel } from 'store';
import { paths } from 'api';

import { GoalResponse, Goal } from 'types/goal';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IGoalModelThunks {
  createGoal: Thunk<IGoalModel, CreateGoalPayload, { client: AxiosInstance }, IStoreModel>;
  deleteGoal: Thunk<IGoalModel, DeleteGoalPayload, { client: AxiosInstance }, IStoreModel>;
  editGoal: Thunk<IGoalModel, EditGoalPayload, { client: AxiosInstance }, IStoreModel>;
  fetchGoals: Thunk<IGoalModel, FetchGoalsPayload, { client: AxiosInstance }, IStoreModel>;
}

const thunks: IGoalModelThunks = {
  createGoal: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      actions.setStatus({ type: RequestType.createGoal, value: Status.loading });
      await getStoreActions().auth.silentRefresh();

      try {
        const createdGoal = await client
          .post(paths.goal.create({ groupId: payload.groupId }), {
            ActTargetCount: payload.actTargetCount,
            ActTemplates: payload.actTemplates,
          })
          .then(({ data }: { data: GoalResponse }): Goal => formatGoalResponse(data));

        const { goals } = getState();
        actions.setFirstGoalFlag(goals.length === 0);
        actions.setGoals([createdGoal, ...goals]);
        actions.setError({ type: RequestType.createGoal, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.createGoal,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.createGoal, value: Status.complete });
      }
    }
  ),

  deleteGoal: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      actions.setStatus({ type: RequestType.deleteGoal, value: Status.loading });
      await getStoreActions().auth.silentRefresh();

      try {
        await client.delete(paths.goal.delete(payload));

        const { goals } = getState();
        const updatedGoals = goals.filter((g) => g.id !== payload.goalId);

        actions.setGoals(updatedGoals.length ? updatedGoals : []);
        actions.setError({ type: RequestType.deleteGoal, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.deleteGoal,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.deleteGoal, value: Status.complete });
      }
    }
  ),

  editGoal: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      actions.setStatus({ type: RequestType.editGoal, value: Status.loading });
      await getStoreActions().auth.silentRefresh();

      try {
        const editedGoal = await client
          .put(paths.goal.edit({ groupId: payload.groupId, goalId: payload.goalId }), {
            ActTargetCount: payload.actTargetCount,
            ActTemplates: payload.actTemplates,
          })
          .then(({ data }: { data: GoalResponse }): Goal => formatGoalResponse(data));

        const { goals } = getState();
        const updatedGoals = [...goals];
        const goalIndex = goals.findIndex((goal: Goal) => goal.id === payload.goalId);

        updatedGoals[goalIndex] = editedGoal;

        actions.setGoals(updatedGoals);
        actions.setError({ type: RequestType.editGoal, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.editGoal,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.stale, value: Date.now() });
        actions.setStatus({ type: RequestType.editGoal, value: Status.complete });
      }
    }
  ),

  fetchGoals: thunk(
    async (actions, payload, { getState, getStoreActions, injections: { client } }) => {
      if (getState().status[RequestType.fetchGoals] !== Status.idle) return;

      actions.setStatus({ type: RequestType.fetchGoals, value: Status.loading });
      await getStoreActions().auth.silentRefresh();

      try {
        const {
          requestTimestamps: { fresh, stale },
        } = getState();
        const isCacheStale = fresh < stale;

        const goals = await client
          .get(paths.goals.get({ groupId: payload.groupId }), { clearCacheEntry: isCacheStale })
          .then(({ data }: { data: GoalResponse[] }): Goal[] =>
            data?.map((goal) => formatGoalResponse(goal))
          );

        actions.setGoals(goals || []);
        actions.setError({ type: RequestType.fetchGoals, value: undefined });
      } catch (error) {
        actions.setError({
          type: RequestType.fetchGoals,
          value: { error, status: error.response?.status },
        });
      } finally {
        actions.setRequestTimestamps({ type: RequestTimestamp.fresh, value: Date.now() });
        actions.setStatus({ type: RequestType.fetchGoals, value: Status.complete });
      }
    }
  ),
};

export default thunks;
