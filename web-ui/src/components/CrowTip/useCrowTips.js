import { createLocalStorageStateHook } from 'use-local-storage-state';
import { useTranslation } from 'positive-store';

import { useToast } from 'context/ToastContext';

const useDismissedCrowTips = createLocalStorageStateHook('dismissedCrowTips', []);

const useCrowTips = () => {
  const [dismissedTips, setDismissedTips] = useDismissedCrowTips();
  const { addToast } = useToast();
  const { t } = useTranslation();

  const dismiss = tipId => {
    if (dismissedTips.length === 0) {
      addToast(t('app.tips.dismiss_toast'));
    }

    setDismissedTips([...dismissedTips, tipId]);
  };

  const reset = () => {
    addToast(t('app.tips.reset_toast'));

    setDismissedTips([]);
  };

  return {
    isDismissed: tipId => dismissedTips.indexOf(tipId) > -1,
    dismiss,
    reset,
  };
};

export default useCrowTips;
