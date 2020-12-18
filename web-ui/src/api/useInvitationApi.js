import { url } from 'config';

import useBackendApi from 'api/useBackendApi';
import Invitation from 'api/Invitation';

const useInvitationApi = () => {
  const [{ isLoading, isComplete, data, error }, doFetch] = useBackendApi();

  const fetchInvitation = ({ token }) => {
    doFetch({
      url: url.invitations.makeGet({ token }),
    });
  };

  const acceptInvitation = invitation => {
    doFetch({
      method: 'post',
      url: url.invitations.makeAccept({ invitationId: invitation.id }),
    });
  };

  const deleteInvitation = invitation => {
    doFetch({
      method: 'delete',
      url: url.invitations.makeDelete({ invitationId: invitation.id }),
    });
  };

  const resendInvitation = invitation => {
    doFetch({
      method: 'post',
      url: url.invitations.makeResend({ invitationId: invitation.id }),
    });
  };

  const formatData = data => (data === 'NO_CONTENT' ? data : Invitation(data));

  return {
    isLoading,
    isComplete,
    invitation: isComplete && !error ? formatData(data) : undefined,
    error,
    fetchInvitation,
    acceptInvitation,
    deleteInvitation,
    resendInvitation,
  };
};

export default useInvitationApi;
