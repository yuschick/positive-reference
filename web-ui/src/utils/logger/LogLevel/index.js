import React from 'react';

import { BooleanParam, StringParam, useQueryParams } from 'use-query-params';

import {
  currLevels,
  deletePersisted,
  getLogger,
  lvlToString,
  setLevel,
  levels,
} from 'utils/logger';
import { entries } from 'lodash';

const logger = getLogger('LogLevel', { development: levels.INFO });

function levelsToJSX() {
  return entries(currLevels()).map(([name, level]) => (
    <code key={name}>
      {name}: {lvlToString(level)}
    </code>
  ));
}

export default ({ name }) => {
  const [params] = useQueryParams({
    level: StringParam,
    delete: BooleanParam,
    persist: BooleanParam,
    crash: BooleanParam,
  });

  const { level, delete: del, persist = false, crash = false } = params;

  if (!name) {
    name = 'root';
  }

  const _logger = logger.scoped({ name, level, delete: del, persist });

  _logger.debug('current log levels', { currLevels: currLevels() });

  let elems = (
    <>
      Previous levels:
      <br />
      {levelsToJSX()}
    </>
  );

  if (del) {
    deletePersisted(name);
  }

  if (crash) {
    setTimeout(() => {
      throw new Error('chaos monkeying');
    }, 0);
  }

  if (level) {
    setLevel(level, name, persist);
    _logger.info('set new log level', { currLevels: currLevels() });
    elems = (
      <>
        {elems}
        <br />
        <br />
        Current levels:
        <br />
        {levelsToJSX()}
      </>
    );
  }

  return elems;
};
