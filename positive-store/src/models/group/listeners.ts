import { ThunkOn, thunkOn } from 'easy-peasy';

import { RequestType } from './requests';
import { IGroupModel } from './model';

import { IStoreModel } from 'store';
import { Group, GroupType, GroupRole } from 'types/group';
import { RequestTimestamp } from 'types/request';
import { Status } from 'types/status';

export interface IGroupModelListeners {
  onSetGroups?: ThunkOn<IGroupModel, void, IStoreModel>;
  onSetSelectedGroupId?: ThunkOn<IGroupModel, void, IStoreModel>;
  onSetSelectedGroup?: ThunkOn<IGroupModel, void, IStoreModel>;
  onSetStatus: ThunkOn<IGroupModel, IStoreModel>;
}

const listeners: IGroupModelListeners = {
  onSetGroups: thunkOn(
    (actions) => [actions.setGroups],
    async (actions, payload, { getState }) => {
      const state = getState();
      const { groups } = payload.payload;

      const selectedGroupId: string | undefined = state.selectedGroupId;
      let groupId: string | undefined;

      if (selectedGroupId && groups.find((group: Group) => group.id === selectedGroupId)) {
        groupId = selectedGroupId;
      } else if (groups.length) {
        const newGroup = groups.find((group: Group) => group.type === GroupType.class);

        if (newGroup) {
          /* If a class exists */
          groupId = newGroup.id;
        } else {
          /* If not */
          groupId = groups[0].id;
        }
      }

      actions.setSelectedGroupId(groupId || undefined);
    }
  ),

  onSetSelectedGroupId: thunkOn(
    (actions) => [actions.setSelectedGroupId],
    async (actions, target, { getStoreState, getStoreActions }) => {
      actions.setStatus({ type: RequestType.setSelectedGroup, value: Status.loading });

      try {
        const { groups } = getStoreState().groups;

        const groupId: string | undefined = target.payload;
        const activeGroup = groups?.find((group: Group) => group.id === groupId);

        if (!groupId || !activeGroup) {
          actions.setSelectedGroup(undefined);
          return;
        }

        let isManager: boolean = false;

        /* MEMBERSHIPS */
        await getStoreActions().memberships.fetchMemberships({
          groupId,
        });

        /* INVITATIONS */
        if (activeGroup.userRole === GroupRole.manager) {
          isManager = true;
          await getStoreActions().invitations.fetchInvitations({
            groupId: activeGroup.id,
          });
        }

        actions.setSelectedGroup({
          ...activeGroup,
          invitations: isManager ? getStoreState().invitations.invitations : [],
          memberships: getStoreState().memberships.memberships,
        } as Group);
        actions.setError({
          type: RequestType.setSelectedGroup,
          value: undefined,
        });
      } catch (error) {
        actions.setError({
          type: RequestType.setSelectedGroup,
          value: { error, status: error.response?.status },
        });
      } finally {
        const { moments, goals, memberships, invitations } = getStoreActions();

        /* UPDATE STALE VALUES */
        Promise.all(
          [moments, goals, memberships, invitations].map((model) =>
            model.setRequestTimestamps({
              type: RequestTimestamp.stale,
              value: Date.now(),
            })
          )
        );

        actions.setStatus({ type: RequestType.setSelectedGroup, value: Status.complete });
      }
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
