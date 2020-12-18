import * as Sentry from '@sentry/browser';

const useSentry = () => {
  const capture = ({ error, message, event, level, tags, extras }) => {
    let eventId = undefined;

    const submit = () => {
      if (error) return Sentry.captureException(error);
      if (message) return Sentry.captureMessage(message);
      if (event) return Sentry.captureEvent(event);
    };

    if (level || tags || extras) {
      Sentry.withScope(scope => {
        level && scope.setLevel(level);
        tags && scope.setTags(tags);
        extras && scope.setExtras(extras);
        eventId = submit();
      });
    } else {
      eventId = submit();
    }

    return eventId;
  };

  return { capture };
};

export default useSentry;
