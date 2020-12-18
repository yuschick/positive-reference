import { Action } from 'easy-peasy';
import { ISettingsModel } from './model';
import { Language, Theme } from 'types/settings';
export interface ISettingsModelActions {
    setLanguage: Action<ISettingsModel, Language>;
    setTheme: Action<ISettingsModel, Theme>;
}
declare const actions: ISettingsModelActions;
export default actions;
