export const formatName = (givenName: string, familyName: string): string =>
  [givenName, familyName].filter(Boolean).join(' ');
