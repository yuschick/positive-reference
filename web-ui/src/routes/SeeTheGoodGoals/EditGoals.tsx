import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FocusOn } from 'react-focus-on';
import {
  useGoalState,
  useGoalActions,
  useGroupState,
  useStrengthState,
  Goal,
  Moment,
  Status,
  useTranslation,
} from 'positive-store';

import GoalCard from './GoalCard';

import { breakpoint, color, spacing } from 'theme';

import Text from 'components/Text';
import Portal from 'components/Portal';
import Flex from 'components/Flex';
import Heading from 'components/Heading';
import ModalDialog from 'components/ModalDialog';
import PillButton from 'components/buttons/PillButton';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

type EnhancedGoal = Goal & { moments: Moment[]; currentActCount: number };

interface Props {
  goals: EnhancedGoal;
  close: () => void;
  addGoal: () => void;
  editGoal: (goal: Goal) => void;
}

const EditGoals: React.FunctionComponent<Props> = ({ goals, close, addGoal, editGoal }) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const [selectedStrengthName, setSelectedStrengthName] = useState<string | undefined>();

  const { status } = useGoalState();
  const { selectedGroupId } = useGroupState();
  const { deleteGoal, editGoal: updateGoal } = useGoalActions();
  const { strengths } = useStrengthState();

  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();

  const onClose = () => {
    trackEvent({
      category: 'Goals',
      action: 'Close edit goals view',
    });

    close();
  };

  const onDelete = () => {
    if (!selectedGoal) return;

    trackEvent({
      category: 'Goals',
      action: 'Delete goal from edit goals view',
    });

    deleteGoal({ goalId: selectedGoal.id, groupId: selectedGroupId });
    reset();
  };

  const onUpdateTargetCount = ({ goal, value }: { goal: Goal; value: number }) => {
    updateGoal({
      goalId: goal.id,
      groupId: goal.groupId,
      actTemplates: goal.actTemplates,
      actTargetCount: value,
    });

    trackEvent({
      category: 'Goals',
      action: 'Update goal act target count',
    });
  };

  const reset = () => {
    setSelectedGoal(undefined);
    setSelectedStrengthName(undefined);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (!strengths.length) return;

    if (!selectedGoal) {
      setSelectedStrengthName(undefined);
    } else {
      const strengthName = strengths.find(s => s.slug === selectedGoal.actTemplates[0].strengthSlug)
        .name;
      setSelectedStrengthName(strengthName);
    }
  }, [selectedGoal, strengths]);

  return (
    <Portal id="edit-goals" targetId="root">
      <FocusOn onEscapeKey={onClose}>
        <EditOverlay>
          <Flex justifyContent="space-between" alignItems="center">
            <StyledButton
              data-test-id="edit-goals-done-button"
              label={t('app.actions.done')}
              onClick={onClose}
            />

            <Heading as="h1" align="center">
              {t('route.see_the_good.goals.actions.edit.goals')}
            </Heading>

            <StyledButton
              data-test-id="edit-goals-add-button"
              label={t('route.see_the_good.goals.actions.add.goal')}
              onClick={() => {
                trackEvent({
                  category: 'Goals',
                  action: 'Click add goal in edit goals view',
                });

                addGoal();
              }}
              secondary
            />
          </Flex>

          <GoalGrid>
            {goals.map((goal: EnhancedGoal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onDelete={({ goal }: { goal: Goal }) => {
                  setShowDeleteModal(true);
                  setSelectedGoal(goal);
                  setSelectedStrengthName(undefined);
                }}
                editGoal={editGoal}
                onUpdateTargetCount={onUpdateTargetCount}
              />
            ))}
          </GoalGrid>
        </EditOverlay>
      </FocusOn>

      <ModalDialog
        id="delete-moment-modal"
        isOpen={showDeleteModal}
        title={t('app.actions.confirm')}
        footer={
          <PillButton
            danger
            label={t('route.see_the_good.goals.actions.delete.goal')}
            onClick={onDelete}
            disabled={status.deleteGoal === Status.loading}
            spinner={status.deleteGoal === Status.loading}
          />
        }
        onCloseTrigger={() => {
          setShowDeleteModal(false);
          reset();
        }}
      >
        <Text as="p">
          {t('route.see_the_good.goals.confirmations.delete', {
            strengthName: selectedStrengthName,
          })}
        </Text>
      </ModalDialog>
    </Portal>
  );
};

const EditOverlay = styled.section`
  background: ${color('backdropGrey')};
  bottom: 0;
  display: grid;
  grid-gap: ${spacing('xl')};
  grid-template-rows: min-content auto;
  height: 100vh;
  left: 0;
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 2;

  @media (min-width: ${breakpoint('sm')}) {
    padding: ${spacing('xl')};
  }
`;

const StyledButton = styled(PillButton)`
  min-width: auto;
  width: 150px;
`;

const GoalGrid = styled.section`
  align-items: start;
  display: grid;
  grid-gap: ${spacing('xxl')};
  grid-template-columns: repeat(auto-fit, minmax(264px, 300px));
  justify-content: center;
  padding-bottom: ${spacing('xl')};
`;

export default EditGoals;
