import { ActionCreator } from 'easy-peasy';

import { usePositiveActions, usePositiveState } from 'store';
import { Language, Theme } from 'types/settings';

export const useSettingsState = () => usePositiveState((state) => state.settings);

export const useSettingsActions: () => {
  setLanguage: ActionCreator<Language>;
  setTheme: ActionCreator<Theme>;
} = () => {
  const { setLanguage, setTheme } = usePositiveActions((actions) => actions.settings);
  return {
    setLanguage,
    setTheme,
  };
};
