export const getActionName = (t: string): string => {
  const elems = t.split('.');
  const last = elems[elems.length - 1];
  return last.split('(')[0];
};
