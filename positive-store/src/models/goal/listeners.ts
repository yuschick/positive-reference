import { ThunkOn, thunkOn } from 'easy-peasy';

import { IGoalModel } from './model';

import { IStoreModel } from 'store';
import { Status } from 'types/status';

export interface IGoalModelListeners {
  onSetStatus: ThunkOn<IGoalModel, IStoreModel>;
}

const listeners: IGoalModelListeners = {
  onSetStatus: thunkOn(
    (actions) => actions.setStatus,
    (actions, target) => {
      if (target.payload.value !== Status.complete) return;

      /* After a status is set to 'complete', reset it to 'idle' */
      actions.setStatus({ type: target.payload.type, value: Status.idle });
    }
  ),
};

export default listeners;
