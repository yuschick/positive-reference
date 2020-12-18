import { values } from 'lodash';

import { isDraftID } from './isDraftId';

export const onlyKeepDrafts = (data: any[]): any[] =>
  values(
    data.reduce((foundSlugs, obj) => {
      const { slug } = obj;

      if (foundSlugs[slug]) {
        foundSlugs[slug] = keepDraft(foundSlugs[slug], obj);
      } else {
        foundSlugs[slug] = obj;
      }
      return foundSlugs;
    }, {})
  );

const hasDraftID = ({ id }: { id?: string }): boolean => isDraftID(id);
const keepDraft = (obj1: object, obj2: object): object => (hasDraftID(obj1) ? obj1 : obj2);
