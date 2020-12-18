import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'positive-store';

import useSentry from 'utils/useSentry';
import useUserApi from 'api/useUserApi';
import { useSession } from 'context/SessionContext/SessionContext';
import { useToast } from 'context/ToastContext';

const useAccountSettingsModal = () => {
  const [state, setState] = useState({
    isOpen: false,
  });

  const form = useForm();
  const userApi = useUserApi();
  const { user, setUser } = useSession();
  const { t } = useTranslation();
  const { addToast } = useToast();

  const sentry = useSentry();
  useEffect(() => {
    if (userApi.isComplete) {
      if (userApi.error) {
        addToast(t('route.see_the_good.errors.updating_user'), true);
        sentry.capture({ error: userApi.error });
      } else {
        setUser(userApi.user);
        updateState({ isOpen: false });
      }
    }
  }, [userApi.isComplete]);

  const updateState = props => setState({ ...state, ...props });

  const submit = () => {
    const { givenName, familyName } = form.getValues();

    userApi.putUser({
      ...user,
      givenName,
      familyName,
    });
  };

  return { ...state, form, updateState, submit };
};

export default useAccountSettingsModal;
