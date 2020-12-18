import useBackendApi from 'api/useBackendApi';
import { url } from 'config';
import GroupInvitation from 'api/GroupInvitation';

const useGroupInvitationsApi = () => {
  const [{ isLoading, isComplete, data, error }, doFetch] = useBackendApi();

  const fetchInvitations = ({ groupId }) => {
    doFetch({ url: url.group.invitations.makeGet({ groupId }) });
  };

  const dataIsValid = data => Array.isArray(data);
  const formatData = data => data.map(GroupInvitation);

  return {
    isLoading,
    isComplete,
    invitations: isComplete && dataIsValid(data) ? formatData(data) : undefined,
    error: isComplete
      ? error || (!dataIsValid(data) ? 'Invalid group invitations data' : undefined)
      : undefined,
    fetchInvitations,
  };
};

export default useGroupInvitationsApi;
