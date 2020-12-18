import useLocalStorageState from 'use-local-storage-state';
import { useEffect } from 'react';

import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';
import { getLogger, rootLogger } from 'utils/logger';
import { envIsProd } from 'utils/environment';

const REFRESH_TIMEOUT = 15 * 60 * 1000;

const logger = getLogger('useSessionRefresher');

const useSessionRefresher = ({ loginProcess, user }) => {
  const [sessionRefreshedAt, setSessionRefreshedAt] = useLocalStorageState('sessionRefreshedAt');

  useEffect(() => {
    if (sessionRefreshedAt) {
      rootLogger.with({ sessRefreshAt: new Date(sessionRefreshedAt).toISOString() });
    }
  }, [sessionRefreshedAt]);

  // When backend login process resolves with a valid user,
  // set a timeout to refresh session to keep it alive (both on Auth0 and backend side)
  useEffectExceptOnMount(() => {
    if (user) {
      const date = new Date();
      setSessionRefreshedAt(date.getTime());
      rootLogger.with({ sessRefreshAt: date.toISOString() });

      logger.debug('Set session refresh timeout.', {
        timeoutMinutes: REFRESH_TIMEOUT / 60 / 1000,
      });

      const intervalID = setInterval(() => {
        if (Date.now() - date.getTime() > REFRESH_TIMEOUT) {
          clearInterval(intervalID);

          logger.debug('Refresh session due to session refresh timeout.');

          // Auth0 ID token refresh is done only in production because Safari can't do silent reauthentication
          // when the auth server domain isn't a subdomain of the frontend domain (in prod it's auth.positive.fi,
          // in other envs it's eg. positive-dev.eu.auth0.com)
          if (envIsProd) {
            loginProcess.refreshSession();
          } else {
            loginProcess.loginToBackend();
          }
        }
      }, 1000);

      return () => clearInterval(intervalID);
    }
  }, [user]);
};

export default useSessionRefresher;
