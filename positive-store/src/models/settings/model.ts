import { PersistConfig } from 'easy-peasy';
import { enUS, fi } from 'date-fns/locale';

import state, { ISettingsModelState } from './state';
import actions, { ISettingsModelActions } from './actions';
import listeners, { ISettingsModelListeners } from './listeners';

import { Language } from 'types/settings';

export const Locales: { [lang in Language]: Locale } = {
  [Language.en]: enUS,
  [Language.fi]: fi,
};

export const persistConfig: PersistConfig<ISettingsModel> = {
  storage: 'localStorage',
  allow: ['theme', 'language'],
};

export interface ISettingsModel
  extends ISettingsModelState,
    ISettingsModelActions,
    ISettingsModelListeners {}

const settingsModel: ISettingsModel = {
  ...state,
  ...actions,
  ...listeners,
};

export default settingsModel;
