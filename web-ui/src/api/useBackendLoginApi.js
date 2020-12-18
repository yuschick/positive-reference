import { useEffect } from 'react';
import { useSettingsState } from 'positive-store';

import User from 'api/User';
import useBackendApi from 'api/useBackendApi';
import { url } from 'config';
import { getLogger, levels, rootLogger } from 'utils/logger';

const logger = getLogger('useBackendLoginApi', { development: levels.INFO });

const useBackendLoginApi = () => {
  const { language } = useSettingsState();

  const [{ isComplete, data, error }, doFetch] = useBackendApi();

  const postIDToken = ({ idToken } = {}) => {
    doFetch({
      method: 'post',
      url: url.session.makePostTokenLogin({ language }),
      cache: 'no-cache',
      headers: { Authorization: 'Bearer ' + idToken },
      redirect: 'follow',
    });
  };

  const formatData = data => User(data);

  useEffect(() => {
    if (isComplete && data) {
      rootLogger.with({ backendAuth: true });
      logger.info('Backend login done.');
    }
  }, [isComplete, data]);

  useEffect(() => {
    if (isComplete && error) {
      rootLogger.with({ backendAuth: false });
      logger.error('Backend login error.', { error });
    }
  }, [isComplete, error]);

  return {
    isComplete,
    user: isComplete && data ? formatData(data) : undefined,
    error: isComplete ? error || (!data ? 'Invalid user data' : undefined) : undefined,
    postIDToken,
  };
};

export default useBackendLoginApi;
