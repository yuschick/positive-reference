import React, { useContext, useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from '@reach/router';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const AnalyticsContext = React.createContext();

const scrubPII = searchParams => ({
  ...searchParams,
  ...(searchParams.email && { email: 'redacted' }),
  ...(searchParams.token && { token: 'redacted' }),
  ...(searchParams.uid && { uid: 'redacted' }),
});

const AnalyticsProvider = ({ children }) => {
  const [pathname, setPathname] = useState(null);
  const { trackPageView, trackEvent, enableLinkTracking } = useMatomo();

  const location = useLocation();

  useEffect(() => {
    pathname !== location.pathname && setPathname(location.pathname);
  }, [location]);

  useEffect(() => {
    if (pathname) {
      let scrubbedSearch = queryString.stringify(scrubPII(queryString.parse(location.search)));
      scrubbedSearch = `${scrubbedSearch.length ? '?' : ''}${scrubbedSearch}`;

      trackPageView({
        documentTitle: document.title,
        href: `${location.origin}${location.pathname}${scrubbedSearch}`,
      });
    }
  }, [pathname]);

  enableLinkTracking();

  return <AnalyticsContext.Provider value={{ trackEvent }}>{children}</AnalyticsContext.Provider>;
};

const useAnalytics = () => useContext(AnalyticsContext);

export { AnalyticsProvider, useAnalytics };
