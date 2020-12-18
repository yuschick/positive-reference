import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import styled from 'styled-components';

import Heading from 'components/Heading';
import Text from 'components/Text';
import ErrorImage from 'assets/pictures/error.png';
import { environment } from 'config';
import { getLogger } from 'utils/logger';

const logger = getLogger('ErrorBoundary');

const ErrorBoundaryFallbackComponent = ({ sentryExceptionEventId }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: '2rem 15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <img src={ErrorImage} width="256px" alt="Something went wrong" />
      <Heading as="h1">Sorry, something went wrong.</Heading>

      <StyledText forwardedAs="p">
        We're working on getting this fixed as soon as we can. If you'd like to help us by
        describing what exactly just happened, we would be very grateful!
      </StyledText>

      <StyledText forwardedAs="p">Thank you for your understanding.</StyledText>

      {environment !== 'development' && (
        <button
          className="a"
          style={{
            marginTop: '1rem',
            padding: '0.4rem 0.7rem',
            border: '1px rgb(51, 51, 51) solid',
          }}
          onClick={() =>
            Sentry.showReportDialog({
              eventId: sentryExceptionEventId,
              title: 'Crash report',
              subtitle: 'Please describe what you were doing when the error happened',
              subtitle2: '',
              labelSubmit: 'Submit',
            })
          }
        >
          Submit crash report
        </button>
      )}
    </div>
  );
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null, sentryExceptionEventId: null };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });

    Sentry.withScope(scope => {
      scope.setExtras(info);
      const sentryExceptionEventId = Sentry.captureException(error);
      this.setState({ sentryExceptionEventId });
    });

    logger.error('caught an error', { error });
  }

  render() {
    return this.state.error ? (
      <ErrorBoundaryFallbackComponent {...this.state} />
    ) : (
      this.props.children
    );
  }
}

const StyledText = styled(Text)`
  margin-top: 1rem;
`;

export default ErrorBoundary;
