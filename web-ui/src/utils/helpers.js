import {
  differenceInDays,
  // differenceInWeeks,
  differenceInYears,
  endOfDay,
  // endOfWeek,
  endOfYear,
  format,
} from 'date-fns';

const baseUrl = 'https://s3.eu-central-1.amazonaws.com/varis-materials/public/images/crow/';
const getThumbnailUrls = (id, size) => `${baseUrl}${id}@${size}.png`;

const toggleBodyElementClass = (className, force) => {
  document.querySelector('body').classList.toggle(className, force);
};

const hexToRgb = hex =>
  hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16));

const hexToRgbaString = (hex, alpha) =>
  `rgba(${hexToRgb(hex)
    .map(component => `${component},`)
    .concat(alpha)
    .join('')})`;

const formatRelativeDate = ({ date, language, locale, localize, includeTime = true }) => {
  const isFromToday = differenceInDays(endOfDay(new Date()), endOfDay(date)) < 1;

  const isFromYesterday =
    differenceInDays(endOfDay(new Date()), endOfDay(date)) < 2 && !isFromToday;

  // const isFromOtherDayThisWeek =
  //   differenceInWeeks(
  //     endOfWeek(new Date(), { weekStartsOn: 1 }),
  //     endOfWeek(date, { weekStartsOn: 1 })
  //   ) < 1 &&
  //   !isFromToday &&
  //   !isFromYesterday;

  const isFromThisYear = differenceInYears(endOfYear(new Date()), endOfYear(date)) < 1;

  const prefix = {
    fi: isFromToday ? localize('app.today') : isFromYesterday ? localize('app.yesterday') : '',
    en: isFromToday ? localize('app.today') : isFromYesterday ? localize('app.yesterday') : '',
  }[language];

  // const dayFormat = {
  //   fi:
  //     isFromToday || isFromYesterday || !isFromThisYear
  //       ? ''
  //       : isFromOtherDayThisWeek
  //       ? 'EEEE '
  //       : 'EEEEEE ',
  //   en:
  //     isFromToday || isFromYesterday || !isFromThisYear
  //       ? ''
  //       : isFromOtherDayThisWeek
  //       ? 'EEEE '
  //       : 'EEE ',
  // }[language];
  //
  // const dateFormat = {
  //   fi: isFromToday || isFromYesterday || isFromOtherDayThisWeek ? '' : 'd.M.',
  //   en: isFromToday || isFromYesterday || isFromOtherDayThisWeek ? '' : 'MMM d',
  // }[language];

  const dayFormat = {
    fi: isFromToday || isFromYesterday || !isFromThisYear ? '' : 'EEEEEE ',
    en: isFromToday || isFromYesterday || !isFromThisYear ? '' : 'EEE ',
  }[language];

  const dateFormat = {
    fi: isFromToday || isFromYesterday ? '' : 'd.M.',
    en: isFromToday || isFromYesterday ? '' : 'MMM d',
  }[language];

  const yearFormat = {
    fi: isFromThisYear ? '' : 'y',
    en: isFromThisYear ? '' : ' y',
  }[language];

  const timeFormat = includeTime ? ' p' : ' ';

  return `${prefix}${format(date, `${dayFormat}${dateFormat}${yearFormat}${timeFormat}`, {
    locale,
  })}`;
};

const formatDayOfTheMonth = ({ date, language, locale }) => {
  const isFromThisYear = differenceInYears(endOfYear(new Date()), endOfYear(date)) < 1;

  const dateFormat = {
    fi: 'd. MMM',
    en: 'MMM d',
  }[language];

  const yearFormat = {
    fi: isFromThisYear ? '' : ' y',
    en: isFromThisYear ? '' : ' y',
  }[language];

  return `${format(date, `${dateFormat}${yearFormat}`, { locale })}`;
};

const isSeeTheGoodPath = pathname => pathname.indexOf('/see-the-good') === 0;
const isSeeTheGoodGroupPath = pathname => pathname.indexOf('/see-the-good/group') === 0;

const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export {
  getThumbnailUrls,
  toggleBodyElementClass,
  hexToRgb,
  hexToRgbaString,
  formatRelativeDate,
  formatDayOfTheMonth,
  isSeeTheGoodPath,
  isSeeTheGoodGroupPath,
  chunkArray,
};
