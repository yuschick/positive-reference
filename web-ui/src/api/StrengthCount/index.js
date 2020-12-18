import { formatDayOfTheMonth, formatRelativeDate } from 'utils/helpers';

function StrengthCount({ Date: _Date, StrengthSlug, Count }) {
  if (!(this instanceof StrengthCount)) {
    return new StrengthCount({ Date: _Date, StrengthSlug, Count });
  }

  this.date = new Date(_Date);
  this.absolute = {};
  this.absolute[StrengthSlug] = Count;
  this.cumulative = {};
}

const formatDate = ({ date, language, locale, localize, useAsTick = true }) => {
  return useAsTick
    ? formatDayOfTheMonth({ date, language, locale })
    : formatRelativeDate({ date, language, locale, localize, includeTime: false });
};

export { formatDate };
export default StrengthCount;
