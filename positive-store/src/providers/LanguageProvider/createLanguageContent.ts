import { Language } from 'types/settings';

export const createLanguageContent = (data: Record<string, string>, lang: Language): {} => {
  const langLength: number = lang.length * -1;

  return Object.keys(data)
    .filter((key: string) => key.slice(langLength) === lang)
    .reduce((obj: Record<string, string>, key: string) => {
      obj[key.slice(0, key.length - (lang.length + 1))] = data[key];
      return obj;
    }, {});
};
