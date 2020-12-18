import { addDays, differenceInDays, isAfter, isEqual } from 'date-fns';

import StrengthCount from 'api/StrengthCount';
import useBackendApi from 'api/useBackendApi';
import { url } from 'config';

const useSummaryApi = () => {
  const [{ isLoading, isComplete, data, error }, doFetch] = useBackendApi();

  const fetchSummary = ({ groupId }) => {
    doFetch({ url: url.summary.makeGet({ groupId }) });
  };

  const isValidData = data => Array.isArray(data);

  const formatData = data =>
    data
      .map(StrengthCount)
      // Sort entries by date
      .sort((a, b) => (isEqual(a.date, b.date) ? 0 : isAfter(a.date, b.date) ? 1 : -1))
      // Join same date entries into one entry
      .reduce((counts, count) => {
        const previousCount = counts.length > 0 ? counts[counts.length - 1] : undefined;

        if (!previousCount) {
          return [count];
        } else if (isEqual(previousCount.date, count.date)) {
          return [
            ...counts.slice(0, counts.length - 1),
            {
              date: previousCount.date,
              absolute: { ...previousCount.absolute, ...count.absolute },
            },
          ];
        }

        return [...counts, count];
      }, [])
      // Add today's date if no counts for today exist
      .reduce((counts, count, index, originalArray) => {
        const daysInBetween = differenceInDays(new Date(), count.date);
        const newCount =
          index === originalArray.length - 1 && daysInBetween > 0
            ? [{ date: addDays(count.date, daysInBetween), absolute: {} }]
            : [];

        return [...counts, count, ...newCount];
      }, [])
      // Fill in the missing in-between dates with empty counts
      .reduce((counts, count) => {
        const previousCount = counts[counts.length - 1];

        if (!previousCount) {
          const firstCount = { date: addDays(count.date, -1), absolute: {} };
          return [firstCount, count];
        }

        const daysInBetween = differenceInDays(count.date, previousCount.date);

        const newCounts = Array.from({ length: daysInBetween - 1 }, (value, index) => ({
          date: addDays(previousCount.date, index + 1),
          absolute: {},
        }));

        return [...counts, ...newCounts, count];
      }, [])
      // Calculate the cumulative counts
      .reduce((counts, count, index) => {
        if (!index) return [{ ...count, cumulative: { ...count.absolute } }];

        const previousCount = counts[counts.length - 1];

        const cumulative = { ...previousCount.cumulative };

        Object.entries(count.absolute).map(
          ([key, value]) => (cumulative[key] = (cumulative[key] || 0) + value)
        );

        return [...counts, { ...count, cumulative }];
      }, []);

  return {
    isLoading,
    isComplete,
    strengthCounts: isComplete && !error && isValidData(data) ? formatData(data) : undefined,
    error: isComplete
      ? error || (!isValidData(data) ? 'Invalid summary data' : undefined)
      : undefined,
    fetchSummary,
  };
};

export default useSummaryApi;
