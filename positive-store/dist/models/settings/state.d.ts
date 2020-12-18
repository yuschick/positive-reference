import { Computed } from 'easy-peasy';
import { Environment, Language, Theme } from 'types/settings';
export interface ISettingsModelState {
    language: Language;
    locale: Computed<ISettingsModelState, Locale>;
    theme: Theme;
    env: Environment;
}
declare const state: ISettingsModelState;
export default state;
