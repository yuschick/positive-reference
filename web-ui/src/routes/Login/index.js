import React, { Fragment } from 'react';
import queryString from 'query-string';
import { useLocation } from '@reach/router';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'positive-store';

import SanityIllustration from 'components/SanityIllustration';
import Flex from 'components/Flex';
import Heading from 'components/Heading';
import Text from 'components/Text';
import PillButton from 'components/buttons/PillButton';
import { SpinnerView } from 'components/Spinner';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { useSession } from 'context/SessionContext/SessionContext';

import { spacing } from 'theme';

const Login = () => {
  const { trackEvent } = useAnalytics();
  const { loginProcess, logoutProcess } = useSession();
  const { href } = useLocation();
  const { t } = useTranslation();
  const isMobileBreakpoint = useMobileBreakpoint();
  const loginError = queryString.parse(window.location.search).loginError;

  const login = () => {
    // Make sure we don't include loginError variable in the target url
    const url = new URL(href);
    url.searchParams.delete('loginError');

    loginProcess.login({ targetUrl: `${url.pathname}${url.search}` });
    trackEvent({ category: 'Login', action: 'Click Login' });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Positive</title>
      </Helmet>
      {!loginProcess.isResolved || logoutProcess.isTriggered ? (
        <SpinnerView />
      ) : (
        <Flex padding="xl" full column={isMobileBreakpoint} center>
          <SanityIllustration slug="joy" alt="joy" sizes={isMobileBreakpoint ? '100px' : '260px'} />

          <Flex column {...(isMobileBreakpoint ? { marginTop: 'lg' } : { marginLeft: 'xxl' })}>
            <StyledH1 forwardedAs="h1" appearAs="h1-jumbo" align="left">
              {t('route.login.welcome_message')}
            </StyledH1>

            <PillButton marginTop="xl" label={t('app.actions.log_in')} onClick={login} />

            {loginError && (
              <ErrorText forwardedAs="p" align="center" color="red" bold>
                {t(
                  loginError === 'user_not_found'
                    ? 'route.login.errors.user_not_found'
                    : 'route.login.errors.unknown'
                )}
              </ErrorText>
            )}
          </Flex>
        </Flex>
      )}
    </Fragment>
  );
};

const StyledH1 = styled(Heading)`
  text-align: ${({ isMobileBreakpoint }) => isMobileBreakpoint && 'left'};
`;

const ErrorText = styled(Text)`
  margin-top: ${spacing('xl')};
  max-width: 368px;
  padding: 0 ${spacing('lg')};
`;

export default Login;
