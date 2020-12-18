import { ThunkOn, thunkOn } from 'easy-peasy';

import { IAudienceModel } from './model';

import { IStoreModel } from 'store';
import { Status } from 'types/status';

export interface IAudienceModelListeners {
  onSetStatus: ThunkOn<IAudienceModel, IStoreModel>;
}

const listeners: IAudienceModelListeners = {
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
