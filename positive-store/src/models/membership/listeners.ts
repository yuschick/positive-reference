import { ThunkOn, thunkOn } from 'easy-peasy';

import { IMembershipModel } from './model';

import { IStoreModel } from 'store';
import { Status } from 'types/status';

export interface IMembershipModelListeners {
  onSetMemberships?: ThunkOn<IMembershipModel, void, IStoreModel>;
  onSetStatus: ThunkOn<IMembershipModel, IStoreModel>;
}

const listeners: IMembershipModelListeners = {
  onSetMemberships: thunkOn(
    (actions) => actions.setMemberships,
    async (_, payload, { getStoreState, getStoreActions }) => {
      const { selectedGroup } = getStoreState().groups;
      if (!selectedGroup) return;

      const updatedGroup = { ...selectedGroup, memberships: payload.payload };

      getStoreActions().groups.setSelectedGroup(updatedGroup);
    }
  ),

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
