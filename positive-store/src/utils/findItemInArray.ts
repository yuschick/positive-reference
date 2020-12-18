export const findItemInArray = (data: any[], key: string, value: string) =>
  data.find((item: any) => item[key] === value);
