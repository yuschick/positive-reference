import React, { useState } from 'react';

import Div from 'components/Div';
import ProgressChart from 'routes/SeeTheGood/Summary/Progress/ProgressChart';
import StrengthCounts from 'routes/SeeTheGood/Summary/Progress/StrengthCounts';
import SummaryCard from 'routes/SeeTheGood/Summary/SummaryCard';
import { theme } from 'theme';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

const Progress = ({ ...props }) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const isMobileBreakpoint = useMobileBreakpoint();

  return (
    <SummaryCard padding={isMobileBreakpoint ? 'lg md' : 'lg'} {...props}>
      <Div
        margin={`0px -${theme.spacingValue[isMobileBreakpoint ? 'md' : 'lg']}px`}
        marginBottom="64px"
        padding={isMobileBreakpoint ? 'none md' : 'none lg'}
        overflow="hidden"
      >
        <StrengthCounts focusedIndex={focusedIndex} />
      </Div>

      <ProgressChart
        marginLeft={isMobileBreakpoint ? `-${theme.spacingValue.lg}px` : undefined}
        focusedIndex={focusedIndex}
        onFocusedIndexChange={focusedIndex => setFocusedIndex(focusedIndex)}
      />
    </SummaryCard>
  );
};

export default Progress;
