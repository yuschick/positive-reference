import { ThunkOn, thunkOn } from 'easy-peasy';

import { IAuthModel } from './model';

import { IStoreModel } from 'store';
import { Status } from 'types/status';

export interface IAuthModelListeners {
  onSetStatus: ThunkOn<IAuthModel, IStoreModel>;
}

const listeners: IAuthModelListeners = {
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
