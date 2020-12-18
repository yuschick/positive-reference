import { ActionCreator } from 'easy-peasy';
import { Language, Theme } from 'types/settings';
export declare const useSettingsState: () => import("easy-peasy").StateMapper<{
    language: Language;
    locale: import("easy-peasy").Computed<import("./state").ISettingsModelState, Locale, {}>;
    theme: Theme;
    env: import("../../types/settings").Environment;
}>;
export declare const useSettingsActions: () => {
    setLanguage: ActionCreator<Language>;
    setTheme: ActionCreator<Theme>;
};
