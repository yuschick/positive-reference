import useBackendApi from 'api/useBackendApi';
import { url } from 'config';

const useBackendLogoutApi = () => {
  const [{ isLoading, data, error }, doFetch] = useBackendApi();

  const success = !isLoading && !error && data === 'NO_CONTENT';

  const logout = () => {
    doFetch({
      method: 'delete',
      url: url.session.makeDelete(),
      cache: 'no-cache',
      redirect: 'follow',
    });
  };

  return { isLoading, success, error, logout };
};

export default useBackendLogoutApi;
