import React, { useEffect, useState } from 'react';
import flatten from 'flat';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import LanguageContent from './content';
import { Language } from 'types/settings';
import { createLanguageContent } from './createLanguageContent';
import { useSettingsState } from '../../';

interface Props {
  translations?: object;
}

const LanguageProvider: React.FC<Props> = ({ children, translations }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const { language } = useSettingsState();

  const flatTranslations: Record<string, string> = flatten(translations || LanguageContent);
  const resources = {
    en: {
      translation: {
        ...createLanguageContent(flatTranslations, Language.en),
      },
    },
    fi: {
      translation: {
        ...createLanguageContent(flatTranslations, Language.fi),
      },
    },
  };

  useEffect(() => {
    if (isInitialized) return;

    setIsInitialized(true);

    i18n.use(initReactI18next).init({
      lng: language,
      fallbackLng: Language.fi,
      keySeparator: false,
      resources,
    });
  }, [isInitialized, setIsInitialized, i18n, initReactI18next, language, resources]);

  useEffect(() => {
    if (!language) return;
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default LanguageProvider;
