import useBackendApi from 'api/useBackendApi';
import User, { serialize } from 'api/User';
import { url } from 'config';

const useUserApi = () => {
  const [{ isLoading, isComplete, data, error }, doFetch] = useBackendApi();

  const putUser = user => {
    doFetch({
      method: 'put',
      url: url.user.make({ userId: user.id }),
      body: JSON.stringify(serialize(user)),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      redirect: 'follow',
    });
  };

  const formatData = data => (data === 'NO_CONTENT' ? data : User(data));

  return {
    isLoading,
    isComplete,
    user: isComplete && !error ? formatData(data) : undefined,
    error,
    putUser,
  };
};

export default useUserApi;
