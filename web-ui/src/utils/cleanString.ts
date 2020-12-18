// Regex from: https://www.regexpal.com/3319
export const cleanString = (text: string): string =>
  text.replace(
    /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\>|\?|\/|\""|\;|\:/g,
    ''
  );
