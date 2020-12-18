import { computed, Computed } from 'easy-peasy';

import { Locales } from './model';
import { Environment, Language, Theme } from 'types/settings';

export interface ISettingsModelState {
  language: Language;
  locale: Computed<ISettingsModelState, Locale>;
  theme: Theme;
  env: Environment;
}

const state: ISettingsModelState = {
  language: Language.fi,
  locale: computed(({ language }) => Locales[language]),
  theme: Theme.light,
  env: Environment.development,
};

export default state;
