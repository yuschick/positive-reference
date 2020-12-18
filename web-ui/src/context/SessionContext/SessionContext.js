import React, { useContext, useEffect } from 'react';
import { navigate, useLocation } from '@reach/router';

import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';
import useLoginProcess from 'context/SessionContext/useLoginProcess';
import useLogoutProcess from 'context/SessionContext/useLogoutProcess';
import useSessionRefresher from 'context/SessionContext/useSessionRefresher';
import useUser from 'context/SessionContext/useUser';
import { Auth0Context } from 'context/Auth0Context/Auth0Context';
import { host } from 'config';
import { getLogger, levels } from 'utils/logger';
import { scrubPII } from 'api/User';

const logger = getLogger('SessionProvider', { development: levels.DEBUG });

const AUTH0_LOGIN_REDIRECT_URI = `${host}/auth/callback`;

const SessionContext = React.createContext({});

const SessionProvider = ({ children }) => {
  const auth0 = useContext(Auth0Context);

  const { user, setUser } = useUser();

  const loginProcess = useLoginProcess({ auth0LoginRedirectUri: AUTH0_LOGIN_REDIRECT_URI });
  const logoutProcess = useLogoutProcess();

  const { href } = useLocation();

  useSessionRefresher({ loginProcess, user });

  // When mounting, we want to either
  // a) login to backend to get user data (if we're already authenticated on Auth0)
  // b) handle the Auth0 authentication callback (if we're in login redirect uri)
  // c) do nothing to show unauthenticated login page
  useEffect(() => {
    const loggerProps = {
      inAuth0LoginRedirectUri: href.indexOf(AUTH0_LOGIN_REDIRECT_URI) === 0,
      href,
    };

    if (loggerProps.inAuth0LoginRedirectUri) {
      logger.info('Location matches Auth0 redirect URI, handle Auth0 callback.', loggerProps);
      loginProcess.handleAuth0Callback();
    } else if (auth0.isAuthenticated) {
      logger.info('Auth0 is authenticated, log in to backend.', loggerProps);
      loginProcess.loginToBackend();
    } else {
      logger.info(
        "Auth0 is not authenticated and we're not in Auth0 redirect URI, do nothing.",
        loggerProps
      );
    }
  }, []);

  // When receiving user data from backend,
  // a) navigate to target url provided by Auth0 login (if we're in process of Auth0 login)
  // b) only set the user data
  useEffectExceptOnMount(() => {
    if (loginProcess.user) {
      logger.debug('Received user data from login process, set user.', {
        user: scrubPII(loginProcess.user),
        targetUrl: loginProcess.targetUrl,
      });

      setUser(loginProcess.user);

      if (loginProcess.targetUrl) {
        logger.info('Redirect to targetUrl', { targetUrl: loginProcess.targetUrl });
        navigate(loginProcess.targetUrl);
      }
    }
  }, [loginProcess.user]);

  // When receiving an error from login process,
  // trigger the logout process immediately to clear any "half-open" session
  useEffectExceptOnMount(() => {
    if (loginProcess.error) {
      logger.info('Trigger forced logout due to login error.', { loginError: loginProcess.error });

      logoutProcess.logout({ redirectQueryParams: { loginError: loginProcess.error } });
    }
  }, [loginProcess.error]);

  // When triggering the logout process,
  // wipe user data to show unauthenticated content
  useEffectExceptOnMount(() => {
    if (logoutProcess.isTriggered) {
      logger.debug('Logout triggered, clear user');
      setUser(null);
    }
  }, [logoutProcess.isTriggered]);

  return (
    <SessionContext.Provider value={{ user, setUser, loginProcess, logoutProcess }}>
      {children}
    </SessionContext.Provider>
  );
};

const SessionConsumer = SessionContext.Consumer;

const useSession = () => useContext(SessionContext);

export { SessionContext, SessionProvider, SessionConsumer, useSession };
