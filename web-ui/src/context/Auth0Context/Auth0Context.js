import React, { useEffect, useState } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import { getLogger, rootLogger, levels } from 'utils/logger';

const logger = getLogger('Auth0Provider', { development: levels.DEBUG });

const Auth0Context = React.createContext({});

const auth0ContextKey = 'auth0Auth';

class AuthenticationError extends Error {
  constructor(error, error_description) {
    super(error_description);
    this.name = 'AuthenticationError';
    this.error = error;
  }
}

const Auth0Provider = ({ children, ...initOptions }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0Client, setAuth0Client] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      logger.debug('Create Auth0 client.');

      const auth0Client = await createAuth0Client(initOptions);

      logger.debug('Client creation done.');

      setAuth0Client(auth0Client);

      const isAuthenticated = await auth0Client.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      rootLogger.with({ [auth0ContextKey]: isAuthenticated });
      logger.debug('Authentication status checked.');

      setIsInitialized(true);
    };

    initialize();
  }, []);

  const loginWithRedirect = async ({ redirectUri, targetUrl, ...loginParams }) => {
    logger.info('Initiate login with redirect.', { redirectUri, targetUrl, ...loginParams });

    return auth0Client.loginWithRedirect({
      appState: { targetUrl },
      redirect_uri: redirectUri,
      ...loginParams,
    });
  };

  const handleRedirectCallback = async ({ onAuthenticated }) => {
    logger.info('Handle redirect callback.');

    const { appState } = await auth0Client.handleRedirectCallback();

    setIsAuthenticated(true);

    rootLogger.with({ [auth0ContextKey]: true });
    logger.info('Redirect callback handled.', { appState });

    onAuthenticated(appState);
  };

  const getTokenSilently = async () => {
    // Force refresh of the token. They only live for at most 10h, so this needs to be done periodically.
    // see https://sentry.io/organizations/positive-learning-ltd/issues/1550896768.

    try {
      logger.info('Trying to silently refresh the ID token.');

      const token = await auth0Client.getTokenSilently({
        scope: initOptions.scope,
        ignoreCache: true,
        timeoutInSeconds: 20,
      });

      logger.info('Silent ID token refresh done.', { token });

      return token;
    } catch (e) {
      // getTokenSilently has an annoying habit of sometimes throwing errors that don't inherit
      // Error, which then makes Sentry barf when capturing it. See eg.
      // https://sentry.io/organizations/positive-learning-ltd/issues/1578898434

      // If e isn't an error, turn it into one and rethrow
      if (!(e instanceof Error)) {
        const { error, error_description } = e;
        throw new AuthenticationError(error, error_description);
      }

      // Otherwise just rethrow
      throw e;
    }
  };

  const getIdTokenClaims = async () => {
    logger.debug('Getting ID token claims.');

    return auth0Client.getIdTokenClaims();
  };

  const logout = (...props) => {
    logger.info('Initiate logout.');

    return auth0Client.logout(...props);
  };

  return (
    <Auth0Context.Provider
      value={{
        isInitialized,
        isAuthenticated,
        loginWithRedirect,
        handleRedirectCallback,
        getTokenSilently,
        getIdTokenClaims,
        logout,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

const Auth0Consumer = Auth0Context.Consumer;

export { Auth0Context, Auth0Provider, Auth0Consumer };
