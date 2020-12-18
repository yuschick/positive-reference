import React from 'react';

import ErrorBoundary from 'components/ErrorBoundary';

const withErrorBoundary = BaseComponent => props => (
  <ErrorBoundary>
    <BaseComponent {...props} />
  </ErrorBoundary>
);

export default withErrorBoundary;
