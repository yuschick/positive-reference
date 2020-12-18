import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import useBackendApi from 'api/useBackendApi';
import { url } from 'config';
import { getLogger } from 'utils/logger';

const logger = getLogger('useVersionApi');

const useVersionApi = () => {
  const [version, setVersion] = useState(null);

  const [{ isLoading, data, error }, doFetch] = useBackendApi();

  const getVersion = () => {
    doFetch({ url: url.version.makeGet() });
  };

  useEffect(() => {
    if (!isLoading) {
      data && logger.debug('got API version from server', { apiVersion: data });
      data && Sentry.setTag('apiVersion', data);

      setVersion(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (error) {
      logger.error('error getting backend version', { error });
    }
  }, [error]);

  return { version, isLoading, getVersion };
};

export default useVersionApi;
