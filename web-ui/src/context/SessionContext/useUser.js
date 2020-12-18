import { useState } from 'react';
import * as Sentry from '@sentry/browser';

import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';

function setSentryUser(user) {
  if (!user) {
    return;
  }

  Sentry.setUser({ id: user.id });
}

const useUser = () => {
  const [user, setUser] = useState(undefined);

  useEffectExceptOnMount(() => {
    setSentryUser(user);
  }, [user]);

  return { user, setUser };
};

export default useUser;
