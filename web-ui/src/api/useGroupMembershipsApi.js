import GroupMembership from 'api/GroupMembership';
import useBackendApi from 'api/useBackendApi';
import { url } from 'config';

const useGroupMembershipsApi = () => {
  const [{ isLoading, isComplete, data, error }, doFetch] = useBackendApi();

  const fetchMemberships = ({ groupId }) => {
    doFetch({ url: url.group.memberships.makeGet({ groupId }) });
  };

  const dataIsValid = data => Array.isArray(data);
  const formatData = data => data.map(GroupMembership);

  return {
    isLoading,
    isComplete,
    memberships: isComplete && dataIsValid(data) ? formatData(data) : undefined,
    error: isComplete
      ? error || (!dataIsValid(data) ? 'Invalid group memberships data' : undefined)
      : undefined,
    fetchMemberships,
  };
};

export default useGroupMembershipsApi;
