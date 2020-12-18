import { useContext, useEffect, useState } from 'react';
import * as Sentry from '@sentry/browser';
import { useSettingsState } from 'positive-store';

import useBackendLoginApi from 'api/useBackendLoginApi';
import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';
import { Auth0Context } from 'context/Auth0Context/Auth0Context';
import { getLogger } from 'utils/logger';
import { envIsProd } from 'utils/environment';

const logger = getLogger('useLoginProcess');
const sentryTags = { auth0: 'true', useLoginProcess: 'true' };

const useLoginProcess = ({ auth0LoginRedirectUri }) => {
  const [isResolved, setIsResolved] = useState(undefined);
  const [targetUrl, setTargetUrl] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { language } = useSettingsState();
  const auth0 = useContext(Auth0Context);
  const backendLoginApi = useBackendLoginApi();

  const auth0Error =
    error &&
    (error.status === 401 || error.error === 'unauthorized' ? 'user_not_found' : 'unknown');
  const backendError = backendLoginApi.error && 'unknown';

  useEffect(() => {
    if (!auth0.isAuthenticated) {
      logger.debug('No Auth0 session, login status resolved.');

      setIsResolved(true);
    }
  }, []);

  useEffectExceptOnMount(() => {
    if (backendLoginApi.isComplete) {
      logger.debug('Backend login complete, login status resolved.');

      setIsResolved(true);
    }
  }, [backendLoginApi.isComplete]);

  const login = ({ targetUrl = '/', withEmail, signUpFlag }) => {
    if (targetUrl === '/') {
      targetUrl = '/see-the-good';
    }

    setIsResolved(false);

    logger.debug('Begin login process by logging into Auth0.');

    auth0.loginWithRedirect({
      redirectUri: auth0LoginRedirectUri,
      targetUrl: targetUrl,
      ui_locales: language,
      login_hint: withEmail,
      screen_hint: signUpFlag ? 'signup' : undefined,
    });
  };

  const loginToBackend = async ({ targetUrl } = {}) => {
    // Target url is where we want to redirect after a successful login,
    // sometimes we don't want to redirect at all, like when refreshing the session
    setTargetUrl(targetUrl);
    setIsResolved(false);

    logger.info('Log in to backend.', { targetUrl });

    try {
      const claims = await auth0.getIdTokenClaims();
      backendLoginApi.postIDToken({ idToken: claims.__raw });
    } catch (error) {
      logger.error('Error getting ID token claims.', { error });

      Sentry.withScope(scope => {
        scope.setTags(sentryTags);
        Sentry.captureException(error);
      });

      setError('unknown');
      setIsResolved(true);
    }
  };

  const handleAuth0Callback = async () => {
    setIsResolved(false);

    logger.debug('Handle Auth0 callback.');

    try {
      await auth0.handleRedirectCallback({
        onAuthenticated: async ({ targetUrl = '/' } = {}) => {
          loginToBackend({ targetUrl });
        },
      });
    } catch (error) {
      logger.error('Error handling Auth0 callback.', { error });

      // Sentry only needs to know about errors that aren't about authn failure.
      // Temporarily enabled to report all errors in production to help identify issues with login.
      if (envIsProd || error.error !== 'unauthorized') {
        Sentry.withScope(scope => {
          scope.setTags(sentryTags);
          Sentry.captureException(error);
        });
      }

      setError(error);
      setIsResolved(true);
    }
  };

  const refreshSession = async () => {
    try {
      await auth0.getTokenSilently();
    } catch (error) {
      logger.error('Refreshing Auth0 ID token failed.', { error });

      Sentry.withScope(scope => {
        scope.setTags(sentryTags);
        Sentry.captureException(error);
      });
    }

    loginToBackend();
  };

  return {
    isResolved,
    error: auth0Error || backendError,
    user: backendLoginApi.user,
    targetUrl,
    login,
    loginToBackend,
    handleAuth0Callback,
    refreshSession,
  };
};

export default useLoginProcess;
