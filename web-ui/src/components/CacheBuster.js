/* eslint-disable */

import { useEffect, useState } from 'react';
import { release } from 'config';
import useVersionApi from 'api/useVersionApi';
import * as Sentry from '@sentry/browser';
import { getLogger } from 'utils/logger';

const logger = getLogger('CacheBuster');

const localStorageKey = 'cacheBusterLoadTime';

const isReload = () => {
  const [doesReload, setDoesReload] = useState(null);
  if (doesReload !== null) {
    return doesReload;
  }

  const reloadThreshold = 10 * 60 * 1000;

  const now = Date.now();

  const storedLoadTime = Math.min(now, parseInt(localStorage.getItem(localStorageKey)));

  if (isNaN(storedLoadTime) || now > storedLoadTime + reloadThreshold) {
    setDoesReload(false);
    return false;
  }

  setDoesReload(true);
  return true;
};

// CacheBuster hard-reloads the page when it gets differing versions from the backend and the
// frontend
const CacheBuster = props => {
  try {
    if (isReload()) {
      return props.children;
    }
  } catch (error) {
    logger.error('exception in cache buster while checking if page is being reloaded', { error });
    return props.children;
  }

  const versionApi = useVersionApi();
  useEffect(() => {
    versionApi.getVersion();
  }, []);

  useEffect(() => {
    const reloader = async () => {
      const uiVersion = release;
      const apiVersion = String(versionApi.version || '');

      if (apiVersion && uiVersion && uiVersion !== apiVersion) {
        Sentry.withScope(function(scope) {
          scope.setTag('uiVersion', uiVersion);
          Sentry.captureMessage('Forced reload', Sentry.Severity.Warning);
        });
        Sentry.flush(1000).then(() => {
          logger.warn(`Cache buster forcing a reload`, { uiVersion, apiVersion });
          localStorage.setItem(localStorageKey, String(Date.now()));
          window.location.reload(true);
        });
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    reloader();
  }, [versionApi.version]);

  return props.children;
};

export default CacheBuster;
