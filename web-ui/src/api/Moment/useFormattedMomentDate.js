import { useSettingsState, useTranslation } from 'positive-store';
import { formatDate } from 'api/Moment';

const useFormattedMomentDate = ({ moment }) => {
  const { language, locale } = useSettingsState();
  const { t } = useTranslation();

  return formatDate({
    date: moment.createdAt,
    language,
    locale,
    localize: t,
  });
};

export default useFormattedMomentDate;
