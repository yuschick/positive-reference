import useBackendApi from 'api/useBackendApi';
import { serialize } from 'api/GroupMembership';
import { url } from 'config';

const useGroupMembershipApi = () => {
  const [{ isLoading, isComplete, error }, doFetch] = useBackendApi();

  // TODO(murdho): ideally, the membership would include the groupId. consider making it a reality.
  const putMembership = ({ groupId, membership }) => {
    doFetch({
      method: 'put',
      url: url.group.memberships.makePut({ groupId, memberId: membership.user.id }),
      body: JSON.stringify(serialize(membership)),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      redirect: 'follow',
    });
  };

  // TODO(murdho): ideally, the membership would include the groupId. consider making it a reality.
  const deleteMembership = ({ groupId, membership }) => {
    doFetch({
      method: 'delete',
      url: url.group.memberships.makeDelete({ groupId, memberId: membership.user.id }),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      redirect: 'follow',
    });
  };

  return {
    isLoading,
    isComplete,
    error,
    putMembership,
    deleteMembership,
  };
};

export default useGroupMembershipApi;
