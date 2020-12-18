import React from 'react';
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import { analytics, auth0 } from 'config';
import { globalHistory, Location } from '@reach/router';
import { QueryParamProvider } from 'use-query-params';
import { ThemeProvider } from 'styled-components';
// not "used" since it's a polyfill, so stop IntelliJ IDEs from complaining
// noinspection ES6UnusedImports
import fullscreenPolyfill from 'fullscreen-polyfill';

import 'index.css';
import CacheBuster from 'components/CacheBuster';
import ErrorBoundary from 'components/ErrorBoundary';
import Main from 'routes/Main';
import { Auth0Consumer, Auth0Provider } from 'context/Auth0Context/Auth0Context';
import { GlobalStyle, theme } from 'theme';
import { AnalyticsProvider } from 'context/AnalyticsContext/AnalyticsContext';
import { GroupModalProvider } from 'context/GroupModalContext/GroupModalContext';
import { LessonProvider } from 'context/LessonContext/LessonContext';
import { SessionConsumer, SessionProvider } from 'context/SessionContext/SessionContext';
import { SpinnerView } from 'components/Spinner';
import { SummaryProvider } from 'context/SummaryContext/SummaryContext';
import { ToastProvider } from 'context/ToastContext';

const matomoInstance = createInstance(analytics.matomo);

const AuthenticatedProviders = () => (
  <LessonProvider>
    <SummaryProvider>
      <GroupModalProvider>
        <Main />
      </GroupModalProvider>
    </SummaryProvider>
  </LessonProvider>
);

const Positive = () => {
  return (
    <MatomoProvider value={matomoInstance}>
      <CacheBuster>
        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ErrorBoundary>
              <QueryParamProvider reachHistory={globalHistory}>
                <Location>
                  <AnalyticsProvider>
                    <ToastProvider>
                      <Auth0Provider
                        scope={auth0.scope}
                        domain={auth0.domain}
                        client_id={auth0.clientId}
                      >
                        <Auth0Consumer>
                          {({ isInitialized }) =>
                            isInitialized ? (
                              <SessionProvider>
                                <SessionConsumer>
                                  {({ user, logoutProcess }) =>
                                    user ? (
                                      <AuthenticatedProviders />
                                    ) : logoutProcess.isTriggered ? (
                                      <SpinnerView />
                                    ) : (
                                      <Main />
                                    )
                                  }
                                </SessionConsumer>
                              </SessionProvider>
                            ) : (
                              <SpinnerView />
                            )
                          }
                        </Auth0Consumer>
                      </Auth0Provider>
                    </ToastProvider>
                  </AnalyticsProvider>
                </Location>
              </QueryParamProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </ErrorBoundary>
      </CacheBuster>
    </MatomoProvider>
  );
};

export default Positive;
