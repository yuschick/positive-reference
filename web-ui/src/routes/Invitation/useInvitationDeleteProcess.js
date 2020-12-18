import { useInvitationActions, useInvitationState, Status } from 'positive-store';

import { useEffect, useReducer } from 'react';
import { getLogger } from 'utils/logger';
import { scrubPII } from 'api/GroupInvitation';

const logger = getLogger('useInvitationDeleteProcess');

const DEFAULT_STATE = {
  status: 'idle',
  invitation: null,
  error: null,
};

const useInvitationDeleteProcess = () => {
  const [state, updateState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    DEFAULT_STATE
  );

  const { deleteInvitation } = useInvitationActions();
  const { status, error } = useInvitationState();

  useEffect(() => {
    if (state.invitation) {
      logger.info('Delete invitation.', { invitation: scrubPII(state.invitation) });
      deleteInvitation({ invitationId: state.invitation.id });
    }
  }, [state.invitation]);

  useEffect(() => {
    if (state.status === 'success' || state.status === 'error') {
      updateState(DEFAULT_STATE);
    }
  }, [state.status]);

  useEffect(() => {
    if (status.deleteInvitation === Status.loading) {
      updateState({ status: 'loading' });
      return;
    }

    if (error.deleteInvitation) {
      logger.error('Error deleting invitation.', { error: error.deleteInvitation.error });
      updateState({ status: 'error', error: error.deleteInvitation.error });
      return;
    }

    if (status.deleteInvitation === Status.complete) {
      logger.debug('Invitation deleted successfully.');
      updateState({ status: 'success' });
    }
  }, [status.deleteInvitation, error.deleteInvitation]);

  const deleteInvitation = ({ invitation }) => {
    updateState({ invitation });
  };

  return {
    status: state.status,
    error: state.error,
    deleteInvitation,
  };
};

export default useInvitationDeleteProcess;
