import { useContext, useEffect, useState } from 'react';
import queryString from 'query-string';

import useBackendLogoutApi from 'api/useBackendLogoutApi';
import { Auth0Context } from 'context/Auth0Context/Auth0Context';
import { host } from 'config';

import { getLogger } from 'utils/logger';

const logger = getLogger('useLogoutProcess');

const useLogoutProcess = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [redirectQueryParams, setRedirectQueryParams] = useState('');

  const auth0 = useContext(Auth0Context);

  const backendLogoutApi = useBackendLogoutApi();

  useEffect(() => {
    if (backendLogoutApi.success || backendLogoutApi.error) {
      logger.debug('Logout done.', {
        success: backendLogoutApi.success,
        error: backendLogoutApi.error,
      });

      auth0.logout({ returnTo: `${host}/${redirectQueryParams}` });
    }
  }, [backendLogoutApi.success, backendLogoutApi.error]);

  const logout = ({ redirectQueryParams } = {}) => {
    logger.info('Log out.', { redirectQueryParams });

    setRedirectQueryParams(
      redirectQueryParams ? `?${queryString.stringify(redirectQueryParams)}` : ''
    );
    setIsTriggered(true);

    backendLogoutApi.logout();
  };

  return { isTriggered, logout };
};

export default useLogoutProcess;
