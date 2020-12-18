import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import { spacing } from 'theme';

import { GroupedGoal } from './SeeTheGoodGoals';
import GoalCard from './GoalCard';

import ShowHideSection from 'components/ShowHideSection';

interface Props {
  isOpen: boolean;
  achievedGoals: GroupedGoal[];
  setCompletedGoalId: (goalId: string) => void;
}

const AchievedGoals: React.FunctionComponent<Props> = ({
  isOpen,
  achievedGoals,
  setCompletedGoalId,
}) => {
  const { t } = useTranslation();

  return (
    <StyledShowHideSection
      isOpen={isOpen}
      showLabel={t('route.see_the_good.goals.achieved_goals.show')}
      hideLabel={t('route.see_the_good.goals.achieved_goals.hide')}
      trackingCategory="Goals"
      trackingName="Achieved goals"
    >
      <GoalGrid>
        {achievedGoals.map((goal: GroupedGoal) => (
          <GoalCard key={goal.id} goal={goal} setCompletedGoalId={setCompletedGoalId} isAchieved />
        ))}
      </GoalGrid>
    </StyledShowHideSection>
  );
};

const GoalGrid = styled.section`
  align-items: start;
  display: grid;
  grid-gap: ${spacing('xxl')};
  grid-template-columns: repeat(auto-fit, minmax(264px, 300px));
  justify-content: center;
`;

const StyledShowHideSection = styled(ShowHideSection)`
  margin-top: ${spacing('xxl')};
`;

export default AchievedGoals;
