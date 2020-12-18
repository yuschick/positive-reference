import React, { useState, useEffect, useRef, Fragment } from 'react';
import styled from 'styled-components';
import { remove } from 'lodash';
import {
  useStrengthState,
  useGoalActions,
  useGoalState,
  useGroupState,
  Strength,
  StrengthSlug,
  Status,
  Goal,
  ActTemplate,
  useTranslation,
} from 'positive-store';

import StrengthStep from './StrengthStep';
import ActsStep from './ActsStep';

import { breakpoint, spacing } from 'theme';

import ModalDialog from 'components/ModalDialog';
import Panel from 'components/Panel';
import Text from 'components/Text';
import PillButton from 'components/buttons/PillButton';
import { cleanString } from 'utils/cleanString';

import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

interface Props {
  isOpen: boolean;
  goal?: Goal;
  close: () => void;
}

export interface Form {
  strength?: Strength;
  customActs: string[];
  customActsBase: string[];
  acts: string[];
  targetCount: number;
  isDirty: boolean;
}

const initialForm = {
  strength: undefined,
  customActs: [],
  customActsBase: [],
  acts: [],
  targetCount: 5,
  isDirty: false,
};

const GoalPanel: React.FunctionComponent<Props> = ({ isOpen, goal, close }) => {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<Form>(initialForm);
  const [discardChanges, setDiscardChanges] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const { strengths } = useStrengthState();
  const { createGoal, editGoal } = useGoalActions();
  const { status } = useGoalState();
  const { selectedGroupId } = useGroupState();
  const { trackEvent } = useAnalytics();
  const { t } = useTranslation();

  const panelContentRef = useRef<HTMLElement>();

  const onActChange = ({ act, custom = false }: { act: string; custom?: boolean }) => {
    const { customActs, customActsBase, acts } = form;
    let updatedActs = custom ? [...customActs] : [...acts];

    const found = updatedActs.includes(act);
    updatedActs = found ? updatedActs.filter((a: string) => a !== act) : updatedActs.concat(act);

    trackEvent({
      category: 'Goals',
      action: `${found ? 'Deselect' : 'Select'} ${custom ? 'a custom' : 'an'} act`,
    });

    setForm({
      ...form,
      isDirty: true,
      [custom ? 'customActs' : 'acts']: updatedActs,
      customActsBase: custom
        ? found
          ? customActsBase
          : customActsBase.includes(act)
          ? customActsBase
          : customActsBase.concat(act)
        : customActsBase,
    });
  };

  const onSubmit = () => {
    const mergedActs = [...form.customActs, ...form.acts];

    if (!mergedActs.length) {
      setError('required.acts');
      return;
    }

    const actTemplates = mergedActs.map(act => ({
      text: cleanString(act),
      strengthSlug: form.strength?.slug,
    }));

    try {
      const data = {
        groupId: selectedGroupId,
        actTargetCount: form.targetCount,
        actTemplates,
      };

      if (goal) {
        editGoal({
          ...data,
          goalId: goal.id,
        });
      } else {
        createGoal(data);
      }

      trackEvent({ category: 'Goals', action: goal ? 'Edit goal' : 'Create new goal' });
      setError(undefined);
    } catch (err) {
      console.error(err);
      trackEvent({
        category: 'Goals',
        action: goal ? 'Edit goal' : 'Create new goal',
        label: goal ? 'Error during edit goal' : 'Error with new goal',
      });
    } finally {
      mergedActs.length && resetPanel();
    }
  };

  const onClose = () => {
    form.isDirty ? setDiscardChanges(true) : resetPanel();
  };

  const resetPanel = () => {
    trackEvent({ category: 'Goals', action: 'Close goal panel' });

    setForm(initialForm);
    setDiscardChanges(false);
    setStep(1);
    close();
  };

  const separateGoalActs = () => {
    const goalActs: string[] = goal.actTemplates.map((t: ActTemplate) => t.text);
    const goalStrength: Strength = strengths.find(
      s => s.slug === goal.actTemplates[0].strengthSlug
    );
    const strengthActs: string[] = goalStrength.goalTemplates.flatMap(template =>
      template.actions.map(action => action)
    );

    const acts = remove(goalActs, act => strengthActs.indexOf(act) !== -1);

    // acts: matched acts assumed to be predefined from Sanity
    // goalActs: remaining unmatched acts that are assumed as custom
    return { acts, customActs: goalActs, customActsBase: goalActs };
  };

  useEffect(() => {
    if (!goal) return;
    setStep(2);
    setForm({
      ...form,
      ...separateGoalActs(),
      strength: strengths.find(s => s.slug === goal.actTemplates[0].strengthSlug),
      targetCount: goal.actTargetCount,
    });
  }, [goal]);

  useEffect(() => {
    if (!form.strength || goal) return;
    setForm({ ...form, acts: [] });
  }, [form.strength, initialForm]);

  useEffect(() => {
    if (!panelContentRef?.current || !error) return;

    panelContentRef.current.scrollTop = 0;
  }, [error, panelContentRef]);

  return (
    <Fragment>
      <Panel.Container id="goal-panel" dataTestId="goal-panel" isOpen={isOpen} close={onClose}>
        <Panel.Header
          title={`${t(`route.see_the_good.goals.actions.${goal ? 'edit' : 'add'}.goal`)} ${step}/2`}
          icon={step === 1 ? 'close' : 'arrowLeft'}
          action={
            step === 1
              ? onClose
              : () => {
                  trackEvent({ category: 'Goals', action: 'Go back a step in the goal modal' });
                  setStep(step - 1);
                }
          }
        ></Panel.Header>
        <StyledPanelContent forwardRef={panelContentRef}>
          {step === 1 && (
            <StrengthStep
              strength={form.strength}
              onSelect={(strengthSlug: StrengthSlug) => {
                trackEvent({ category: 'Goals', action: `Select goal strength, ${strengthSlug}` });
                setForm({
                  ...form,
                  strength: strengths.find(s => s.slug === strengthSlug),
                  isDirty: true,
                });
                setStep(2);
              }}
            />
          )}
          {step === 2 && form.strength && (
            <ActsStep form={form} onChange={onActChange} error={error} />
          )}
        </StyledPanelContent>
        {step === 2 && (
          <Panel.Footer>
            <PillButton
              data-test-id="save-goal-button"
              label={t(
                goal ? 'app.actions.save_changes' : 'route.see_the_good.goals.actions.add.goal'
              )}
              disabled={status.createGoal === Status.loading}
              spinner={status.createGoal === Status.loading}
              onClick={onSubmit}
            />
          </Panel.Footer>
        )}
      </Panel.Container>

      <ModalDialog
        id="discard-changes-modal"
        isOpen={discardChanges}
        title={t('app.confirmations.ask_discard_changes')}
        footer={
          <PillButton danger label={t('app.confirmations.discard_changes')} onClick={resetPanel} />
        }
        onCloseTrigger={() => setDiscardChanges(false)}
      >
        <Text as="p">{t('app.confirmations.discard_msg')}</Text>
      </ModalDialog>
    </Fragment>
  );
};

const StyledPanelContent = styled(Panel.Content)`
  padding: ${spacing('lg')};

  @media (min-width: ${breakpoint('sm')}) {
    padding: ${spacing('xl')};
  }
`;

export default GoalPanel;
