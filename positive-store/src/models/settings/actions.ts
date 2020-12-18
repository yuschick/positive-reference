import { Action, action } from 'easy-peasy';

import { ISettingsModel } from './model';

import { Language, Theme } from 'types/settings';

export interface ISettingsModelActions {
  setLanguage: Action<ISettingsModel, Language>;
  setTheme: Action<ISettingsModel, Theme>;
}

const actions: ISettingsModelActions = {
  setLanguage: action((state, payload) => {
    state.language = payload;
  }),

  setTheme: action((state, payload) => {
    state.theme = payload;
  }),
};

export default actions;
