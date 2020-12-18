import React, { useEffect, useState } from 'react';
import { useGroupState } from 'positive-store';

import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';
import useSummaryApi from 'api/useSummaryApi';

const SummaryContext = React.createContext({});

const SummaryProvider = props => {
  const [strengthCounts, setStrengthCounts] = useState(undefined);
  const [latestCumulativeCounts, setLatestCumulativeCounts] = useState(undefined);

  const { selectedGroup } = useGroupState();

  const summaryApi = useSummaryApi();

  const selectedGroupId = selectedGroup && selectedGroup.id;

  useEffect(() => {
    if (!!selectedGroupId) {
      summaryApi.fetchSummary({ groupId: selectedGroupId });
    }
  }, [selectedGroupId]);

  useEffectExceptOnMount(() => {
    if (summaryApi.isComplete) {
      setStrengthCounts(summaryApi.strengthCounts);
      setLatestCumulativeCounts(
        summaryApi.strengthCounts && summaryApi.strengthCounts.length
          ? summaryApi.strengthCounts.slice(-1)[0].cumulative
          : undefined
      );
    }
  }, [summaryApi.isComplete]);

  const fetchSummary = () => {
    summaryApi.fetchSummary({ groupId: selectedGroupId });
  };

  return (
    <SummaryContext.Provider
      value={{
        loading: summaryApi.isLoading,
        strengthCounts,
        latestCumulativeCounts,
        fetchSummary,
      }}
    >
      {props.children}
    </SummaryContext.Provider>
  );
};

export { SummaryContext, SummaryProvider };
