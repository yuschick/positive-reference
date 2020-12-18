import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import {
  useGroupState,
  useGoalState,
  useGoalActions,
  useMomentActions,
  Goal,
  Strength,
  useTranslation,
  ActTemplate,
} from 'positive-store';

import { breakpoint, spacing } from 'theme';

import { GroupedGoal } from './SeeTheGoodGoals';
import GoalCard from './GoalCard';
import EditGoalsView from './EditGoals';
import AchievedGoals from './AchievedGoals';

import Heading from 'components/Heading';
import Text from 'components/Text';
import IconButton from 'components/buttons/IconButton';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useToast } from 'context/ToastContext';

interface Props {
  activeGoals: GroupedGoal[];
  achievedGoals: GroupedGoal[];
  addGoal: () => void;
  editGoal: (goal: Goal) => void;
  setCompletedGoalId: (goalId: string) => void;
}

const CurrentGoals: React.FunctionComponent<Props> = ({
  activeGoals,
  achievedGoals,
  addGoal,
  editGoal,
  setCompletedGoalId,
}) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showAchieved] = useState<boolean>(false);

  const { selectedGroup } = useGroupState();
  const { firstGoalFlag } = useGoalState();
  const { setFirstGoalFlag } = useGoalActions();
  const { createMoment } = useMomentActions();
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  const { addToast } = useToast();

  const getGoalCompleteStatus = (goal: GroupedGoal) =>
    goal.currentActCount === goal.actTargetCount - 1;

  const createActMoment = ({
    goal,
    act,
    strength,
  }: {
    goal: GroupedGoal;
    act: string;
    strength: Strength;
  }) => {
    const isGoalComplete = getGoalCompleteStatus(goal);
    const goalCompleteDuration = differenceInCalendarDays(new Date(goal.createdAt), new Date());
    const goalActsAsString = goal.actTemplates.map((t: ActTemplate) => t.text).join('\n');

    const completedDescription = `${t('route.see_the_good.goals.completed_goal_description', {
      groupName: selectedGroup.name,
      strengthName: strength.name,
      num: goal.actTargetCount,
    })}
${goalActsAsString}

${t('route.see_the_good.goals.completed_goal_duration.days', {
  num: goalCompleteDuration > 1 ? goalCompleteDuration : 1,
})}
      `;

    createMoment({
      description: isGoalComplete ? completedDescription : act,
      groupId: goal.groupId,
      strengthSlug: strength.slug,
      goalId: goal.id,
    });

    showCelebration({
      goal,
      color: strength.color,
      description: isGoalComplete ? completedDescription : act,
    });

    trackEvent({
      category: 'Goals',
      action: 'Create a moment from an act',
    });
  };

  const getCelebrationContent = ({
    oneToGo,
    description,
  }: {
    oneToGo: boolean;
    description: string;
  }) => {
    const totalCelebrations = 5;
    const selectedCelebration = oneToGo
      ? 'one_to_go'
      : (Math.floor(Math.random() * totalCelebrations) + 1).toString();
    const celebrationsWithGroupName = ['2', '3', '5'];
    const requireGroupName = !oneToGo && celebrationsWithGroupName.includes(selectedCelebration);

    return (
      <Text as="p">
        {t(
          `route.see_the_good.goals.celebrations.${selectedCelebration}`,
          requireGroupName ? { groupName: selectedGroup.name } : undefined
        )}
        {!oneToGo && <Text bold> {description}</Text>}
      </Text>
    );
  };

  const showCelebration = ({
    goal,
    color,
    description,
  }: {
    goal: GroupedGoal;
    color: string;
    description: string;
  }) => {
    const isGoalComplete = getGoalCompleteStatus(goal);

    if (isGoalComplete) {
      setCompletedGoalId(goal.id);
    } else {
      const celebrationContent = getCelebrationContent({
        oneToGo: goal.currentActCount === goal.actTargetCount - 2,
        description,
      });
      addToast(celebrationContent, false, true, color);
    }
  };

  useEffect(() => {
    if (!firstGoalFlag) return;
    setShowEdit(true);
  }, [firstGoalFlag]);

  return (
    <Fragment>
      <GridContainer>
        {!!activeGoals.length && (
          <EditButton
            data-test-id="edit-goals-button"
            aria-label={t('route.see_the_good.goals.actions.edit.goals')}
            iconName="edit"
            onClick={() => {
              trackEvent({
                category: 'Goals',
                action: 'Open edit edit goals view',
              });

              setShowEdit(true);
            }}
          />
        )}
        <Heading as="h1" appearAs="h1-jumbo" align="center">
          {t('route.see_the_good.goals.current_goals')}
        </Heading>

        <GoalGrid>
          {activeGoals.map((goal: GroupedGoal) => (
            <GoalCard key={goal.id} goal={goal} createActMoment={createActMoment} />
          ))}
        </GoalGrid>

        {!!achievedGoals?.length && (
          <AchievedGoals
            achievedGoals={achievedGoals}
            isOpen={showAchieved}
            setCompletedGoalId={setCompletedGoalId}
          />
        )}
      </GridContainer>

      {(showEdit || firstGoalFlag) && (
        <EditGoalsView
          goals={activeGoals}
          close={() => {
            setShowEdit(false);
            if (firstGoalFlag) setFirstGoalFlag(false);
          }}
          addGoal={addGoal}
          editGoal={editGoal}
        />
      )}
    </Fragment>
  );
};

const GridContainer = styled.section`
  display: grid;
  grid-gap: ${spacing('xl')};
  padding: 0 ${spacing('md')};
  margin-top: ${spacing('md')};
  position: relative;

  @media (min-width: ${breakpoint('sm')}) {
    padding: 0;
  }
`;

const GoalGrid = styled.section`
  align-items: start;
  display: grid;
  grid-gap: ${spacing('xxl')};
  grid-template-columns: repeat(auto-fit, minmax(264px, 300px));
  justify-content: center;
`;

const EditButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 0;
`;

export default CurrentGoals;
