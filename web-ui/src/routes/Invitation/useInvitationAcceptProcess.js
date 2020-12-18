import { useInvitationActions, useInvitationState, Status } from 'positive-store';

import { useEffect, useReducer } from 'react';
import { getLogger } from 'utils/logger';
import { scrubPII } from 'api/GroupInvitation';

const logger = getLogger('useInvitationAcceptProcess');

const DEFAULT_STATE = {
  status: 'idle',
  invitation: null,
  error: null,
};

const useInvitationAcceptProcess = () => {
  const [state, updateState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    DEFAULT_STATE
  );

  const { acceptInvitation: storeAcceptInvitation } = useInvitationActions();
  const { status, error } = useInvitationState();

  useEffect(() => {
    if (state.invitation) {
      logger.info('Accept invitation.', { invitation: scrubPII(state.invitation) });
      storeAcceptInvitation({ invitationId: state.invitation.id });
    }
  }, [state.invitation]);

  useEffect(() => {
    if (state.status === 'success' || state.status === 'error') {
      updateState(DEFAULT_STATE);
    }
  }, [state.status]);

  useEffect(() => {
    if (status.acceptInvitation === Status.loading) {
      updateState({ status: 'loading' });
      return;
    }

    if (error.acceptInvitation) {
      logger.error('Error accepting invitation.', { error: error.acceptInvitation.error });
      updateState({ status: 'error', error: error.acceptInvitation.error });
      return;
    }

    if (status.acceptInvitation === Status.complete) {
      logger.debug('Invitation accepted successfully.');
      updateState({ status: 'success' });
    }
  }, [status.acceptInvitation, error.acceptInvitation]);

  const acceptInvitation = ({ invitation }) => {
    updateState({ invitation });
  };

  return {
    status: state.status,
    error: state.error,
    acceptInvitation,
  };
};

export default useInvitationAcceptProcess;
