import { Severity } from '@sentry/types';
import * as Sentry from '@sentry/browser';
import * as log from 'loglevel';
import * as ColorHash from 'color-hash';
import { environment } from 'config';
import { entries } from 'lodash';

import { consoleSandbox } from '@sentry/utils';
import { onlyInDev } from 'utils/environment';

export const levels = log.levels;
export const defaultLevels = { development: levels.DEBUG, production: levels.WARN };

const colorHash = new ColorHash();
const localStoreKeyPrefix = 'loglevel';

onlyInDev(() => {
  window.loggers = window.loggers || {};
  window.levels = levels;
});

log.setDefaultLevel(log.levels.TRACE);

const originalFactory = log.methodFactory;

// use console.debug in loglevel if available. Ugly hack but meh
log.methodFactory = function(methodName, logLevel, loggerName) {
  if (methodName === 'debug' && console.debug) {
    return console.debug;
  }
  return originalFactory(methodName, logLevel, loggerName);
};
log.setLevel(log.getLevel(), false); // "activate" plugins by calling setLevel

/**
 * Map of level numbers to strings
 */
export const levelNumberToStr = entries(log.levels).reduce((acc, [name, number]) => {
  acc[number] = name;
  return acc;
}, new Array(5));

onlyInDev(() => {
  window.loggers.levelNumberToStr = levelNumberToStr;
});

const inheritFromLoglevel = ['setLevel', 'getLevel', 'setDefaultLevel', 'enableAll', 'disableAll'];

const logLevels = ['trace', 'debug', 'info', 'warn', 'error'];

export const allLoggerNames = new Set();

export const currLevels = () =>
  [...allLoggerNames].reduce((acc, name) => {
    acc[name] = getLogger(name).getLevel();
    return acc;
  }, {});

onlyInDev(() => {
  window.loggers.currLevels = currLevels;
});

class Logger {
  constructor(name, context = {}, parent = {}, defaultLevel = levels.WARN) {
    onlyInDev(() => {
      window.loggers[name] = this;
    });
    allLoggerNames.add(name);
    this.parent = parent;
    this.context = context;
    this.name = name;
    this._log = log.getLogger(name);
    this._log.setDefaultLevel(defaultLevel);
    // bind some methods from the loglevel logger into ourselves that we want to use as-is
    inheritFromLoglevel.forEach(
      methodName => (this[methodName] = this._log[methodName].bind(this._log))
    );

    this.styledName = [`%c[${this.name}]`, styleForLoggerName(this.name)];
  }

  /**
   * With merges this logger's current context with `context`, meaning that `context` will then be
   * present in every log event from this logger
   * @param {Object} context Context object
   * @example
   * rootLogger.with({rootAttr: true})
   * // ...
   * // in another module
   * const logger = getLogger("myLogger");
   * logger.info('whee', {another: true});
   * // whee {rootAttr: true, another: true}
   *
   * @returns {Logger}
   */
  with(context) {
    Object.assign(this.context, context);
    return this;
  }

  /**
   * Creates a new logger that has the same name and parent as this one, but with extra `context`
   * added. Does not change this logger's context
   * @example
   * rootLogger.scoped({rootAttr: true}, logger => {
   *   logger.info('whee', {another: "flerb"});
   *   // [root] whee {rootAttr: true, another: "flerb"}
   * })
   * rootLogger.info('no extra context here');
   * // [root] no extra context here {}
   *
   * @example
   * const _logger = rootLogger.scoped({rootAttr: true})
   * _logger.info('whee', {another: "flerb"});
   * // whee {rootAttr: true, another: "flerb"}
   * rootLogger.info('no extra attrs here');
   * // [root] no extra attrs here {}
   * @param context
   * @param {function(Logger)} [callback] If present, is called with the new logger
   * @returns {Logger}
   */
  scoped(context = {}, callback = undefined) {
    const newLogger = new Logger(
      this.name,
      { ...this.context, ...context },
      this.parent,
      this.getLevel()
    );

    if (callback) callback(newLogger);
    else return newLogger;
  }

  /**
   * Delete key from log context
   * @param ctxKey
   */
  delete(ctxKey) {
    delete this.context[ctxKey];
  }

  /**
   * Create a child logger with the given name and initial context
   * @param name
   * @param context
   * @param defaultLevel
   * @returns {Logger}
   *
   * @example
   * const logger = rootLogger.with({rootAttr: true}).child("another", {topWhee: "eh"})
   * logger.info("whee", {moreCtx: 123})
   * // [another] whee {rootAttr: true, topWhee: "eh", moreCtx: 123}
   */
  child(name, context = {}, defaultLevel = levels.WARN) {
    return new Logger(name, context, this, defaultLevel);
  }

  /**
   * Same as {@link debug}
   */
  log(...args) {
    this.debug(...args);
  }

  // these are here just to make autocompletion "work" until we start using TypeScript
  setLevel(level, persist) {}

  getLevel() {}

  setDefaultLevel(level) {}

  enableAll() {}

  disableAll() {}

  trace(...args) {}

  debug(...args) {}

  info(...args) {}

  warn(...args) {}

  error(...args) {}
}

/**
 * Formats `data` so that it displays better in Sentry. Modifies `data`.
 * @param data
 * @returns {object}
 */
function formatBreadcrumbData(data) {
  const out = {};

  for (const key in data) {
    const value = data[key];
    if (value === undefined || value === null) {
      continue;
    }

    if (value instanceof Error) {
      const { message, name, stack } = value;
      out[key] = { message, name, stack };
      continue;
    }

    switch (typeof value) {
      case 'object':
        out[key] = JSON.stringify(value);
        continue;
      case 'boolean':
        out[key] = value.toString();
        continue;
      default:
        out[key] = value;
    }
  }
  return out;
}

// create logger methods for Logger
// each log method calls the corresponding loglevel method with:
// - the styled logger name
// - the arguments passed to the method (with any objects merged together, see mergeObjectsIn)
// - this logger's context merged with the parent logger's context, which is also

logLevels.forEach(level => {
  Logger.prototype[level] = function(...args) {
    const logArgs = mergeObjectsIn(...args, {
      ...this.parent.context,
      ...this.context,
    });

    Sentry.addBreadcrumb({
      category: 'console',
      message: typeof args[0] === 'string' ? args[0] : '<no message>',
      level: Severity.fromString(level),
      // last element in logArgs is _always_ the context object
      data: formatBreadcrumbData({ ...logArgs[logArgs.length - 1], logger: this.name }),
      logger: this.name,
    });
    consoleSandbox(() => {
      this._log[level](...this.styledName, ...logArgs);
    });
  };
});

export const rootLogger = new Logger('root', {}, null, defaultLevels[environment] || levels.WARN);
const logger = rootLogger.child('logger');

export function getLevel(name) {
  if (allLoggerNames.has(name)) {
    const level = getLogger(name).getLevel();
    // console.log('gettng name', { name, level, log: getLogger(name) });
    return lvlToString(level);
  }
  logger.info('getLevel for nonexistend logger name', { name });
  return lvlToString(rootLogger.getLevel());
}

onlyInDev(() => {
  window.loggers.getLevel = getLevel;
});

/**
 * Convenience function for `rootLogger.child(name)` that allows specifying which log level to use
 * in which environment. Defaults to `WARN`
 * @param name
 * @param defaults Default levels per environment for this logger
 * @returns {Logger}
 *
 * @example
 * // logs at ERROR in prod, WARN in dev
 * let log1 = getLogger("quiet", {production: levels.ERROR})
 * // logs at INFO in prod, TRACE in dev
 * let log2 = getLogger("chatterbox", {production: levels.INFO, development: levels.TRACE})
 */
export function getLogger(name, defaults = defaultLevels) {
  return rootLogger.child(name, {}, { defaultLevels, ...defaults }[environment] || levels.WARN);
}

export function lvlToString(level) {
  if (typeof level === 'string') return level;
  const name = levelNumberToStr[level];
  if (name) {
    return name;
  }
  return '<not set>';
}

/**
 * Sets the log level of a logger. The level will be persisted to the local store and used instead
 * of any defaults set when calling {@link getLogger} or {@link Logger.child}
 *
 * @param level Log level
 * @param name Name of logger
 *
 * @param persist, root level
 * @example set level of all loggers to info
 * setLevel('info')
 *
 * @example set level of `someLogger` to info
 * setLevel('info', 'someLogger')
 *
 * @example override defaults
 * let log1 = getLogger("chatterbox", {production: levels.ERROR, development: levels.WARN})
 * setLevel(levels.ERROR, "quietType")
 * // chatterbox level is now ERROR until someone calls deletePersisted
 */
export function setLevel(level, name = 'root', persist = true) {
  logger.scoped({ name, level: lvlToString(level), persist }, logger => {
    logger.info('setting log level');
    getLogger(name).setLevel(level, persist);
    if (name === rootLogger.name) {
      logger.info('setting global log level');
      [...allLoggerNames].forEach(name => getLogger(name).setLevel(level, persist));
    }
  });
}

onlyInDev(() => {
  window.loggers.setLevel = setLevel;
});

/**
 * Delete all persisted log levels from local storage
 */
export function deleteAllPersisted() {
  logger.info('deleting all persisted log levels');
  Object.keys(window.localStorage)
    .filter(key => key.startsWith(localStoreKeyPrefix))
    .forEach(key => {
      logger.info('deleting persisted level', { key });
      window.localStorage.removeItem(key);
    });
}

onlyInDev(() => {
  window.loggers.deletePersistedAll = deleteAllPersisted;
});

export function deletePersisted(name) {
  if (name === rootLogger.name) {
    return deleteAllPersisted();
  }

  const key = `${localStoreKeyPrefix}:${name}`;
  logger.info('deleting persisted log level', { key });
  window.localStorage.removeItem(key);
}

onlyInDev(() => {
  window.loggers.deletePersisted = deletePersisted;
});

/**
 * Returns `args` with all objects merged into one that is appended at the end.
 * @example
 * mergeObjectsIn('aaa', {zot: 1}, {bleb: 2}, 'bbb')
 * // [ 'aaa', 'bbb', { zot: 1, bleb: 2 } ]
 *
 * @param args
 * @returns {*[]}
 */
function mergeObjectsIn(...args) {
  let resObj = {};
  return args
    .filter(item => {
      const itemIsObj = typeof item === 'object';

      if (itemIsObj) {
        resObj = { ...resObj, ...item };
      }
      return !itemIsObj;
    })
    .concat([resObj]);
}

/**
 * Returns a foreground color that has enough contrast for the given background color
 *
 * Based on
 * https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
 * @param backgroundColor
 */
function foregndColorFor(backgroundColor) {
  const hex = backgroundColor.replace(/#/, '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (luminance > 0.5) {
    // bright colors - black font
    return '#000000';
  }

  // dark colors - white font
  return '#FFFFFF';
}

/**
 * Returns a CSS style with foreground and background colors for the given logger name
 * @param {string} name
 * @returns {string} CSS
 */
function styleForLoggerName(name) {
  const strColor = colorHash.hex(name);
  return `color:${foregndColorFor(strColor)};background-color:${strColor}`;
}
