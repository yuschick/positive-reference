import React from 'react';
import { Redirect, Router } from '@reach/router';
import Billing from 'routes/Settings/Billing';
import { routes } from 'config';
import withErrorBoundary from 'utils/withErrorBoundary';

const SettingsRoute = () => {
  return (
    <Router
      primary={false}
      style={{ width: '100%', flexGrow: '1', display: 'flex', flexDirection: 'column' }}
    >
      <Billing path={routes.settings.billing()} />
      <Redirect default from="/" to="billing" noThrow />
    </Router>
  );
};

export default withErrorBoundary(SettingsRoute);
