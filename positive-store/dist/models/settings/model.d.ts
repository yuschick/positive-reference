import { PersistConfig } from 'easy-peasy';
import { ISettingsModelState } from './state';
import { ISettingsModelActions } from './actions';
import { ISettingsModelListeners } from './listeners';
import { Language } from 'types/settings';
export declare const Locales: {
    [lang in Language]: Locale;
};
export declare const persistConfig: PersistConfig<ISettingsModel>;
export interface ISettingsModel extends ISettingsModelState, ISettingsModelActions, ISettingsModelListeners {
}
declare const settingsModel: ISettingsModel;
export default settingsModel;
