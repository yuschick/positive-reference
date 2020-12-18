import React, { Fragment } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { v4 as uuidv4 } from 'uuid';
import {
  useMomentState,
  useStrengthState,
  ActTemplate,
  Status,
  Goal,
  Strength,
  useTranslation,
} from 'positive-store';

import { GroupedGoal } from './SeeTheGoodGoals';
import { borderRadius, boxShadow, color, font, spacing } from 'theme';

import InputSlider from 'components/InputSlider';
import Heading from 'components/Heading';
import Text from 'components/Text';
import RevealingProgressIndicator from 'components/RevealingProgressIndicator';
import StrengthImage from 'components/StrengthImage';

import IconButton from 'components/buttons/IconButton';
import TextButton from 'components/buttons/TextButton';

interface Props {
  goal: GroupedGoal;
  isAchieved?: boolean;
  editGoal?: (goal: Goal) => void;
  onDelete?: ({ goal }: { goal: Goal }) => void;
  createActMoment?: ({
    goal,
    act,
    strength,
  }: {
    goal: GroupedGoal;
    act: string;
    strength: Strength;
  }) => void;
  onUpdateTargetCount?: ({ goal, value }: { goal: Goal; value: number }) => void;
  setCompletedGoalId?: (goalId: string) => void;
}

const GoalCard: React.FunctionComponent<Props> = ({
  goal,
  isAchieved = false,
  editGoal,
  onDelete,
  createActMoment,
  onUpdateTargetCount,
  setCompletedGoalId,
}) => {
  const { status } = useMomentState();
  const { strengths } = useStrengthState();
  const { t } = useTranslation();

  const isEdit = !!editGoal;
  const goalStrength = strengths.find(
    strength => strength.slug === goal.actTemplates[0].strengthSlug
  );

  return goalStrength ? (
    <Card data-test-id={`${isAchieved ? 'achieved-' : ''}goal-card`}>
      <StyledHeading forwardedAs="h2" appearAs="h4" align="center">
        {goalStrength?.name}
      </StyledHeading>

      <GoalProgressContainer
        color={goalStrength.color}
        isEdit={isEdit}
        data-test-id="goal-card-progress"
      >
        {isEdit || isAchieved ? (
          <ProgressImageWrapper color={goalStrength.color}>
            <StrengthImage slug={goalStrength.slug} alt={goalStrength.name} sizes="144px" />
          </ProgressImageWrapper>
        ) : (
          <RevealingProgressIndicator
            label={t('route.see_the_good.goals.progress')}
            color={goalStrength.color}
            progress={{ current: goal.currentActCount, total: goal.actTargetCount }}
          >
            <ProgressImageWrapper color={goalStrength.color}>
              <StrengthImage slug={goalStrength.slug} alt={goalStrength.name} sizes="144px" />
            </ProgressImageWrapper>
          </RevealingProgressIndicator>
        )}
      </GoalProgressContainer>

      {isAchieved && (
        <AchievedCount color={goalStrength.color}>
          <Text bold>{goal.actTargetCount}</Text>
        </AchievedCount>
      )}

      {goal.actTemplates.map((act: ActTemplate) =>
        isEdit || isAchieved ? (
          <ActText forwardedAs="p" key={uuidv4()} align="center" bold={isEdit && !isAchieved}>
            {act.text}
          </ActText>
        ) : (
          <ActButton
            key={uuidv4()}
            color={goalStrength.color}
            disabled={status.createMoment === Status.loading}
            onClick={() =>
              createActMoment && createActMoment({ goal, act: act.text, strength: goalStrength })
            }
          >
            {act.text}
          </ActButton>
        )
      )}

      {isEdit && (
        <Fragment>
          {editGoal && (
            <EditIconButton
              data-test-id="edit-acts-button"
              aria-label={t('route.see_the_good.goals.actions.edit.acts')}
              iconName="edit"
              onClick={() => editGoal(goal)}
            />
          )}
          <TargetText forwardedAs="p" color="grey" align="center" size="xxs" bold>
            {t('route.see_the_good.goals.target')}
          </TargetText>

          {onUpdateTargetCount && (
            <InputSliderWrapper>
              <InputSlider
                name={`${goal.id}-target-count`}
                color={goalStrength.color}
                min={goal.currentActCount + 1}
                label={t('route.see_the_good.goals.actions.adjust_target_count')}
                onChange={(_, value: number | number[]) =>
                  onUpdateTargetCount({ goal, value: value as number })
                }
                value={goal.actTargetCount}
              />
            </InputSliderWrapper>
          )}

          <Text as="p" align="center">
            {t('route.see_the_good.goals.given')}: {goal.currentActCount || 0}
          </Text>

          {onDelete && (
            <DeleteIcon
              ariaLabel={t('route.see_the_good.goals.actions.delete.goal')}
              iconName="bin"
              onClick={() => onDelete({ goal })}
              size="18px"
              danger
            />
          )}
        </Fragment>
      )}

      {isAchieved && (
        <SeeMomentWrapper>
          <TextButton onClick={() => setCompletedGoalId && setCompletedGoalId(goal.id)}>
            <Text size="sm">{t('route.see_the_good.goals.actions.see_moment')}</Text>
          </TextButton>
        </SeeMomentWrapper>
      )}
    </Card>
  ) : null;
};

const Card = styled.article`
  background: ${color('white')};
  border-radius: ${borderRadius('sm')};
  box-shadow: ${boxShadow('subtle')};
  padding: ${spacing('lg')};
`;

const StyledHeading = styled(Heading)<{ appearAs: string; align: string }>`
  text-transform: uppercase;
`;

const GoalProgressContainer = styled.div.attrs(({ isEdit }: { isEdit: boolean }) => ({
  tabIndex: isEdit ? -1 : 0,
}))<{ isEdit: boolean }>`
  border: 3px solid transparent;
  border-radius: 50%;
  height: 144px;
  margin: ${spacing('md')} auto;
  padding: ${spacing('xs')};
  width: 144px;

  &:focus {
    border-color: ${({ color }) => color};
    outline: 1px solid ${color('white')};
  }
`;

const ActButton = styled.button<{ color: string }>`
  background: ${color('white')};
  border: 1px solid ${({ color }) => color};
  border-radius: ${borderRadius('xl')};
  color: ${color('black')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-family: ${font('semibold')};
  font-weight: 500;
  min-height: 40px;
  padding: ${spacing('xs')} ${spacing('md')};
  text-align: center;
  transition: background 0.3s ease;
  width: 100%;

  &:hover,
  :focus,
  :active {
    background: ${({ color }) => lighten(0.1, color)};
    border: 1px solid ${({ color }) => color};
  }

  + button {
    margin-top: ${spacing('md')};
  }
`;

const ProgressImageWrapper = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  border-radius: 50%;
  height: 100%;
`;

const AchievedCount = styled(ProgressImageWrapper)`
  display: grid;
  height: 56px;
  margin: 0 auto ${spacing('md')} auto;
  place-items: center;
  width: 56px;
`;

const ActText = styled(Text)<{ align: string; bold: boolean }>`
  & + p {
    margin-top: ${spacing('lg')};
  }
`;

const EditIconButton = styled(IconButton)`
  margin: ${spacing('lg')} auto ${spacing('xl')} auto;
`;

const DeleteIcon = styled(IconButton)`
  height: 28px;
  margin: ${spacing('lg')} auto 0 auto;
  width: 28px;

  svg {
    height: auto;
    width: 13px;
  }
`;

const TargetText = styled(Text)<{
  forwardedAs: string;
  size: string;
  bold: boolean;
  color: string;
  align: string;
}>`
  text-transform: uppercase;
`;

const InputSliderWrapper = styled.div`
  margin: ${spacing('xxl')} auto ${spacing('md')} auto;
`;

const SeeMomentWrapper = styled.div`
  margin: ${spacing('md')} auto 0 auto;
  width: max-content;
`;

export default GoalCard;
