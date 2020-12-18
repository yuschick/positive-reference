import { ThunkOn, thunkOn } from 'easy-peasy';

import { IInvitationModel } from './model';

import { IStoreModel } from 'store';
import { Status } from 'types/status';

export interface IInvitationModelListeners {
  onSetGroupInvitations?: ThunkOn<IInvitationModel, void, IStoreModel>;
  onSetStatus: ThunkOn<IInvitationModel>;
}

const listeners: IInvitationModelListeners = {
  onSetGroupInvitations: thunkOn(
    (actions) => actions.setGroupInvitations,
    async (_, payload, { getStoreState, getStoreActions }) => {
      const { selectedGroup } = getStoreState().groups;
      if (!selectedGroup) return;

      const updatedGroup = { ...selectedGroup, invitations: payload.payload };

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
