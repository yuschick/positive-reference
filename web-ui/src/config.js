import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import { prop } from 'env';
import { onlyInDev } from 'utils/environment';

const release = prop('RELEASE_SHA', 'unknown-sha');
const environment = prop('ENVIRONMENT', 'development');
const apiBaseUrl = prop('API_BASE_URL');
const sessionBaseUrl = `${apiBaseUrl}/session`;
const groupsBaseUrl = `${apiBaseUrl}/groups`;
const mediasBaseUrl = `${apiBaseUrl}/medias`;
const invitationsBaseUrl = `${apiBaseUrl}/invitations`;
const usersBaseUrl = `${apiBaseUrl}/users`;
const webUiBasepath = '/';

/**
 * Host is set to `proto://hostname[:port]`
 * @type {string}
 */
const host = `${window.location.protocol}//${window.location.host}`;

const auth0 = {
  domain: prop('AUTH0_DOMAIN', 'positive-dev.eu.auth0.com'),
  clientId: prop('AUTH0_CLIENT_ID', 'SzKUdZa9aCMJhBKwr76K89BijMHkOQU6'),
  scope: 'openid profile email',
};

const sanity = {
  apiToken: prop('SANITY_API_TOKEN', ''),
  dataset: prop('SANITY_DATASET', 'production'),
  projectId: prop('SANITY_PROJECT_ID', 'uxuhnfll'),
  getVerboseContent: () => JSON.parse(window.localStorage.getItem('verboseSanityContent')) || false, // Use this switch to show/hide [DRAFT] and [NOT LIVE] labels in development (in production they're never shown)
  setVerboseContent: value =>
    window.localStorage.setItem('verboseSanityContent', JSON.stringify(value)),
};

const filterUrl = /fullstory|sanity/i;

// const sentryDebug = getLogger('sentryDebug');

const sentry = {
  environment,
  dsn: 'https://2d322a37601b4700a28f728b62a0d5f2@sentry.io/1785871',
  release,

  integrations: integrations => {
    integrations = integrations.map(integration => {
      if (integration.name === 'Breadcrumbs') {
        integration = new Sentry.Integrations.Breadcrumbs({
          console: true,
          dom: false,
          fetch: true,
          history: true,
          sentry: true,
          xhr: true,
        });
      }
      return integration;
    });
    onlyInDev(() => {
      integrations = integrations.concat([new Integrations.Debug()]);
    });

    return integrations;
  },

  beforeBreadcrumb: (crumb, hint) => {
    // filter out all breadcrumbs for HTTP requests that we don't care about
    if (crumb.type === 'http' && crumb.data.url && crumb.data.url.match(filterUrl)) {
      return null;
    }

    if (crumb.category === 'fetch') {
      if (hint.response.headers.has('X-Request-ID')) {
        crumb.data['requestID'] = hint.response.headers.get('X-Request-ID');
      }
    }

    // even though the logger uses Sentry's consoleSandbox utility to try and make sure that its
    // console logs aren't also handled by Sentry's console integration, sometimes it just doesn't
    // work and we get duplicate log messages. If the message starts with a %c[ we know that it's
    // _probably_ a log message that "leaked" out of our logger, so we'll just throw it away
    // completely
    if (crumb.category === 'console' && (crumb.message || '').slice(0, 3) === '%c[') {
      return null;
    }

    // onlyInDev(() => {
    //   console.log('sentry breadcrumb', { crumb, hint });
    // });

    return crumb;
  },
};

onlyInDev(() => {
  window.Sentry = Sentry;
});

const analytics = {
  matomo: {
    urlBase: 'https://positive.matomo.cloud/',
    /*
    1: go.dev.positive.fi
    2: go.staging.positive.fi
    3: go.positive.fi
     */
    siteId: prop('MATOMO_SITE_ID', 1),
    enableLinkTracking: false,
    configurations: {
      disableCookies: true,
    },
  },
};

const stripe = {
  publicKey: prop('STRIPE_PUBLIC_KEY', 'pk_test_JbyDHEOsarkTo9LRboBnFXWU003Dw63vON'),
};

const url = {
  session: {
    makeGet: () => `${sessionBaseUrl}`,
    makePostTokenLogin: ({ language }) => `${sessionBaseUrl}?lang=${language}`,
    makePostLoginEmailRequest: ({ language }) => `${sessionBaseUrl}/email?lang=${language}`,
    makeDelete: () => `${sessionBaseUrl}`,
  },
  groups: {
    make: () => `${groupsBaseUrl}`,
  },
  group: {
    make: ({ groupId }) => `${groupsBaseUrl}/${groupId}`,
    makePostInviteMember: ({ groupId }) => `${groupsBaseUrl}/${groupId}/members`,
    memberships: {
      makeGet: ({ groupId }) => `${groupsBaseUrl}/${groupId}/members`,
      makePut: ({ groupId, memberId }) => `${groupsBaseUrl}/${groupId}/members/${memberId}`,
      makeDelete: ({ groupId, memberId }) => `${groupsBaseUrl}/${groupId}/members/${memberId}`,
    },
    invitations: {
      makeGet: ({ groupId }) => `${groupsBaseUrl}/${groupId}/invitations`,
    },
    subgroups: {
      makePost: ({ groupId }) => `${groupsBaseUrl}/${groupId}/subgroups`,
    },
  },
  invitations: {
    makeGet: ({ token }) => `${invitationsBaseUrl}?token=${token}`,
    makeAccept: ({ invitationId }) => `${invitationsBaseUrl}/${invitationId}/acceptance`,
    makeDelete: ({ invitationId }) => `${invitationsBaseUrl}/${invitationId}`,
    makeResend: ({ invitationId }) => `${invitationsBaseUrl}/${invitationId}/resend`,
  },
  moments: {
    makeGet: ({ groupId, cursor }) =>
      `${groupsBaseUrl}/${groupId}/moments${cursor ? `?cursor=${cursor}` : ''}`,
    makePost: ({ groupId }) => `${groupsBaseUrl}/${groupId}/moments`,
  },
  moment: {
    make: ({ groupId, momentId }) => `${groupsBaseUrl}/${groupId}/moments/${momentId}`,
    media: {
      makeDelete: ({ mediaId }) => `${mediasBaseUrl}/${mediaId}`,
      makeGet: ({ mediaId }) => `${mediasBaseUrl}/${mediaId}`,
      makePost: ({ momentId }) => `${mediasBaseUrl}?momentID=${momentId}`,
    },
  },
  summary: {
    makeGet: ({ groupId, interval = 'day' }) =>
      `${groupsBaseUrl}/${groupId}/summary?type=${interval}`,
  },
  user: {
    make: ({ userId }) => `${usersBaseUrl}/${userId}`,
    license: {
      make: ({ userId }) => `${usersBaseUrl}/${userId}/license`,
      makePaymentMethod: ({ userId }) => `${usersBaseUrl}/${userId}/license/payment-method`,
    },
  },
  version: {
    makeGet: () => `${apiBaseUrl}/version`,
  },
};

const routes = {
  rootPath: () => `${webUiBasepath}`,
  learn: {
    rootPath: () => `${webUiBasepath}/learn/*`,
    category: ({ categoryId }) => `/${categoryId}`,
    lesson: ({ categoryId, lessonId }) => `/${categoryId}/${lessonId}`,
  },
  teach: {
    rootPath: () => `${webUiBasepath}/teach/*`,
    audience: ({ audienceSlug }) => `/${audienceSlug}`,
    strength: ({ audienceSlug, strengthSlug }) => `/${audienceSlug}/${strengthSlug}`,
    exercise: ({ audienceSlug, strengthSlug, exerciseSlug }) =>
      `/${audienceSlug}/${strengthSlug}/${exerciseSlug}`,
  },
  seeTheGood: {
    rootPath: () => `${webUiBasepath}/see-the-good/*`,
    goals: () => `/goals`,
    group: () => `/group`,
    summary: () => `/summary`,
  },
  settings: {
    rootPath: () => `${webUiBasepath}/settings/*`,
    billing: () => `/billing`,
  },
};

const classRoles = {
  manager: 'owner',
  // spotter: 'tutor',
  // viewer: 'member',
};

const organizationRoles = {
  manager: 'owner',
  member: 'tutor',
};

const invitationStatuses = {
  accepted: 'accepted',
  waiting: 'waiting',
};

const invitationTypes = {
  email: 'email',
  link: 'link',
};

export {
  apiBaseUrl,
  release,
  environment,
  host,
  auth0,
  sanity,
  sentry,
  analytics,
  stripe,
  url,
  routes,
  classRoles,
  organizationRoles,
  invitationStatuses,
  invitationTypes,
};
