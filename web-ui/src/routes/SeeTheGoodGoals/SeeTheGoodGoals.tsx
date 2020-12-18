import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { remove } from 'lodash';
import {
  useStrengthState,
  useGoalState,
  useGoalActions,
  useGroupState,
  useMomentState,
  Status,
  Goal,
  Moment,
  useTranslation,
} from 'positive-store';

import AchievedGoals from './AchievedGoals';
import NoGoals from './NoGoals';
import GoalPanel from './GoalPanel';
import CurrentGoals from './CurrentGoals';

import { breakpoint, spacing } from 'theme';

import Page from 'components/Page';
import Spinner, { SpinnerView } from 'components/Spinner';
import FinalCelebration from './FinalCelebration';
// import useEffectOnMountOnly from 'utils/useEffectOnMountOnly';
// import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';

import MenuBar from 'routes/SeeTheGood/MenuBar';

export type GroupedGoal = Goal & {
  moments: Moment[];
  currentActCount: number;
};

const SeeTheGoodGoals: React.FunctionComponent = () => {
  const [showGoalPanel, setShowGoalPanel] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const [allGoals, setAllGoals] = useState<{ active: GroupedGoal[]; achieved: GroupedGoal[] }>();
  const [completedGoalId, setCompletedGoalId] = useState<string | undefined>();

  const { selectedGroupId } = useGroupState();
  const { goals, status } = useGoalState();
  const { fetchGoals } = useGoalActions();
  const { moments } = useMomentState();
  const { t } = useTranslation();
  const { strengths } = useStrengthState();

  async function formatGoals() {
    if (!goals.length) {
      setAllGoals({
        active: [],
        achieved: [],
      });
      return;
    }

    const updatedGoals = [...goals];
    const activeGoals = updatedGoals
      .map(goal => {
        const goalMoments = moments.filter(m => m.goalId === goal.id);

        return {
          ...goal,
          moments: goalMoments || [],
          currentActCount: goalMoments.length || 0,
        };
      })
      .filter(g => g);

    const achievedGoals = remove(activeGoals, goal => goal.actTargetCount <= goal.currentActCount);
    setAllGoals({ active: activeGoals, achieved: achievedGoals });
  }

  useEffect(() => {
    if (!selectedGroupId) return;
    fetchGoals({ groupId: selectedGroupId });
  }, [fetchGoals, selectedGroupId]);

  useEffect(() => {
    (async function getFormattedGoals() {
      await formatGoals();
    })();
  }, [goals, moments]);

  return status.fetchGoals === Status.loading || !allGoals ? (
    <SpinnerView />
  ) : (
    <Fragment>
      <Helmet>
        <title>{`${t('route.see_the_good.goals')} | Positive`}</title>
      </Helmet>

      <MenuBar />

      <StyledPage>
        {completedGoalId && (
          <FinalCelebration goalId={completedGoalId} close={() => setCompletedGoalId(undefined)} />
        )}

        {!strengths.length ? (
          <Spinner center />
        ) : allGoals?.active.length ? (
          <CurrentGoals
            activeGoals={allGoals?.active || []}
            achievedGoals={allGoals?.achieved || []}
            addGoal={() => setShowGoalPanel(true)}
            editGoal={(goal: Goal) => {
              setSelectedGoal(goal);
              setShowGoalPanel(true);
            }}
            setCompletedGoalId={(goalId: string) => setCompletedGoalId(goalId)}
          />
        ) : allGoals?.achieved.length ? (
          <Fragment>
            <NoGoals addGoal={() => setShowGoalPanel(true)} noActiveGoals />
            <AchievedGoals
              achievedGoals={allGoals.achieved}
              setCompletedGoalId={(goalId: string) => setCompletedGoalId(goalId)}
              isOpen
            />
          </Fragment>
        ) : (
          <NoGoals addGoal={() => setShowGoalPanel(true)} noGoals />
        )}
      </StyledPage>

      <GoalPanel
        isOpen={showGoalPanel}
        close={() => {
          setShowGoalPanel(false);
          selectedGoal && setSelectedGoal(undefined);
        }}
        goal={selectedGoal}
      />
    </Fragment>
  );
};

const StyledPage = styled(Page)`
  position: relative;

  @media (max-width: ${breakpoint('sm')}) {
    padding: 0 0 ${spacing('xxxl')} 0;
  }
`;

export default SeeTheGoodGoals;
