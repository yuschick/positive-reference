import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { PositiveProvider, LanguageProvider } from 'positive-store';

import I18NContent from './i18n';
import { sentry, apiBaseUrl, environment, sanity } from 'config';
import Positive from 'routes/Positive';

Sentry.init(sentry);

ReactDOM.render(
  <React.StrictMode>
    <PositiveProvider
      baseUrl={apiBaseUrl}
      env={environment}
      sanityConfig={{ dataset: sanity.dataset, project: sanity.projectId, token: sanity.apiToken }}
    >
      <LanguageProvider translations={I18NContent}>
        <Positive />
      </LanguageProvider>
    </PositiveProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
