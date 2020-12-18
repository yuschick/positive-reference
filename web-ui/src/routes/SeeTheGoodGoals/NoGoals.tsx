import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import { breakpoint, spacing } from 'theme';

import Heading from 'components/Heading';
import Text from 'components/Text';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

import PillButton from 'components/buttons/PillButton';
import CrowTip from 'components/CrowTip/CrowTip';
import CrowTipBanner from 'components/CrowTip/CrowTipBanner';

import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

interface Props {
  noActiveGoals?: boolean;
  noGoals?: boolean;
  addGoal: () => void;
}

const NoGoals: React.FunctionComponent<Props> = ({ noActiveGoals, noGoals, addGoal }) => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  const isMobileBreakpoint = useMobileBreakpoint();

  return (
    <Fragment>
      {isMobileBreakpoint && <CrowTipBanner tips={[t('route.see_the_good.goals.crow_tip_1')]} />}

      <GridContainer>
        <Heading as="h1" appearAs="h1-jumbo" align="center">
          {t('route.see_the_good.goals.current_goals')}
        </Heading>

        <Text as="p" align="center" bold>
          {t('route.see_the_good.goals.ongoing_goals')}
        </Text>

        <StyledButton
          data-test-id="add-goal-button"
          label={t('route.see_the_good.goals.actions.add.goal')}
          onClick={() => {
            trackEvent({
              category: 'Goals',
              action: 'Open goal panel to add first goal',
            });

            addGoal();
          }}
        />

        {!isMobileBreakpoint && (
          <StyledCrowTip
            tips={[t(`route.see_the_good.goals.crow_tip_${noGoals ? '1' : '2'}`)]}
            flip={noActiveGoals}
          />
        )}
      </GridContainer>
    </Fragment>
  );
};

const GridContainer = styled.section`
  display: grid;
  grid-gap: ${spacing('xl')};
  padding: 0 ${spacing('md')};
  margin-top: ${spacing('md')};

  @media (min-width: ${breakpoint('sm')}) {
    padding: 0;
  }
`;

const StyledButton = styled(PillButton)`
  margin: 0 auto;
  max-width: 295px;
`;

const StyledCrowTip = styled(CrowTip)`
  margin: 0 auto;
`;

export default NoGoals;
