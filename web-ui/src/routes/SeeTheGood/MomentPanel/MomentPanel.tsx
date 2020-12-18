import React, { useState, useEffect, useRef, Fragment } from 'react';
import styled from 'styled-components';
import {
  Status,
  StrengthSlug,
  User,
  Moment,
  useMomentActions,
  useMomentState,
  useGroupState,
  useTranslation,
} from 'positive-store';

import { spacing } from 'theme';

import StrengthContainer from './MomentStrength';
import DetailsContainer from './MomentDescription';

import Panel from 'components/Panel';
import PillButton from 'components/buttons/PillButton';
import ModalDialog from 'components/ModalDialog';
import Text from 'components/Text';
import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';

import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useSession } from 'context/SessionContext/SessionContext';

export enum MomentAction {
  create = 'create',
  edit = 'edit',
}

interface MomentForm {
  strengthSlug?: StrengthSlug;
  mediaFile?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  description?: string;
  creatorName: string;
  groupId?: string;
  groupName?: string;
}

interface Props {
  isOpen: boolean;
  moment?: Moment;
  actionType: MomentAction;
  close: () => void;
  setSelectedMoment: (x: Moment | undefined) => void;
}

const MomentPanel: React.FunctionComponent<Props> = ({
  isOpen,
  moment,
  actionType,
  close,
  setSelectedMoment,
}) => {
  const { createMoment, editMoment, deleteMoment } = useMomentActions();
  const { status } = useMomentState();
  const { selectedGroup } = useGroupState();

  const { user } = useSession() as { user: User };
  const { trackEvent } = useAnalytics();
  const { t } = useTranslation();

  const defaultFormValues = {
    creatorName: user.name,
    groupId: selectedGroup?.id,
    groupName: selectedGroup?.name,
  };

  const [discardChanges, setDiscardChanges] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [form, setForm] = useState<MomentForm>(defaultFormValues);
  const [step, setStep] = useState<number>(1);
  const containerRef = useRef<HTMLElement>();

  const isCreating = actionType === MomentAction.create;
  const modalTitle = isCreating
    ? t(`route.see_the_good.modal.step_${step}`, { step })
    : t('route.see_the_good.modal.actions.edit_post');

  const actionInProgress =
    status.createMoment === Status.loading || status.editMoment === Status.loading;
  const actionCompleted =
    status.createMoment === Status.complete ||
    status.editMoment === Status.complete ||
    status.deleteMoment === Status.complete ||
    status.deleteMomentMedia === Status.complete;

  useEffect(() => {
    if (!containerRef?.current) return;
    containerRef.current.scrollTop = 0;
  }, [step, containerRef]);

  useEffectExceptOnMount(() => {
    if (!actionCompleted) return;
    close();
  }, [actionCompleted, close]);

  useEffect(() => {
    if (status.createMomentMedia !== Status.loading) return;
    close();
  }, [status, close]);

  useEffect(() => {
    if (!moment) return;
    setStep(2);
    setForm(moment);
  }, [moment, setStep, setForm]);

  const getSubmitEventLabel = ({ description, mediaType }: Moment) => {
    if (mediaType) {
      mediaType = mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
    }

    if (description && mediaType) {
      return `${mediaType} & Description`;
    } else if (mediaType) {
      return mediaType;
    } else if (description) {
      return 'Description';
    }
    return 'Plain';
  };

  const clearMomentData = () => {
    setForm(defaultFormValues);
    setSelectedMoment(undefined);
    setStep(1);
    setDiscardChanges(false);
    setConfirmDelete(false);
  };

  const onModalClose = () => {
    if (
      moment?.description !== form.description ||
      form.mediaFile ||
      moment?.strengthSlug !== form.strengthSlug
    ) {
      setDiscardChanges(true);
    } else {
      clearMomentData();
      close();
    }
  };

  const onSubmitMoment = async () => {
    const momentData = {
      media: form.mediaFile,
      groupId: selectedGroup?.id,
      description: form.description,
      strengthSlug: form.strengthSlug,
    };

    if (isCreating) {
      await createMoment(momentData);
    } else {
      await editMoment({
        ...momentData,
        momentId: moment.id,
        mediaUrl: form.mediaUrl,
      });
    }

    trackEvent({
      category: 'Moment',
      action: !isCreating ? 'Submit Moment Changes' : 'Submit New Moment',
      label: getSubmitEventLabel(form),
    });

    clearMomentData();
  };

  const onDeleteMoment = async () => {
    await deleteMoment({ groupId: selectedGroup?.id, momentId: moment?.id });

    trackEvent({
      category: 'Moment',
      action: 'Delete moment',
    });

    clearMomentData();
  };

  return (
    <Fragment>
      <Panel.Container id="moment-modal" isOpen={isOpen} close={onModalClose}>
        <Panel.Header
          title={modalTitle}
          icon={isCreating && step > 1 ? 'arrowLeft' : 'close'}
          action={isCreating && step > 1 ? () => setStep(step - 1) : onModalClose}
        />
        <StyledContent forwardRef={containerRef}>
          {step === 1 && (
            <StrengthContainer
              strengthSlug={form.strengthSlug}
              onStrengthClick={({ strengthSlug }: { strengthSlug: StrengthSlug }) => {
                setForm({ ...form, strengthSlug });
                setStep(2);
                trackEvent({ category: 'Moment', action: 'Select Strength', name: strengthSlug });
              }}
            />
          )}

          {step === 2 && <DetailsContainer moment={form} updateForm={setForm} />}
          {step === 2 && !isCreating && (
            <ButtonWrapper>
              <PillButton
                secondary
                danger
                label={t('route.see_the_good.actions.remove')}
                disabled={actionInProgress}
                spinner={actionInProgress}
                onClick={() => setConfirmDelete(true)}
              />
            </ButtonWrapper>
          )}
        </StyledContent>
        {step === 2 && (
          <Panel.Footer>
            <PillButton
              label={actionInProgress ? `${t('app.actions.submitting')}...` : t('app.actions.save')}
              disabled={actionInProgress}
              spinner={actionInProgress}
              onClick={onSubmitMoment}
            />
          </Panel.Footer>
        )}
      </Panel.Container>

      <ModalDialog
        id="discard-changes-modal"
        isOpen={discardChanges}
        title={t('app.confirmations.ask_discard_changes')}
        footer={
          <PillButton
            danger
            label={t('app.confirmations.discard_changes')}
            onClick={() => {
              close();
              clearMomentData();
            }}
          />
        }
        onCloseTrigger={() => setDiscardChanges(false)}
      >
        <Text as="p">{t('app.confirmations.discard_msg')}</Text>
      </ModalDialog>

      {confirmDelete && (
        <ModalDialog
          id="delete-moment-modal"
          isOpen={confirmDelete}
          title={t('app.actions.confirm')}
          footer={
            <PillButton
              danger
              label={t('route.see_the_good.actions.remove')}
              onClick={onDeleteMoment}
              disabled={status.deleteMoment === Status.loading}
              spinner={status.deleteMoment === Status.loading}
            />
          }
          onCloseTrigger={() => setConfirmDelete(false)}
        >
          <Text as="p" className="confirm-delete-message">
            {t('route.see_the_good.confirmations.moment')}
          </Text>
        </ModalDialog>
      )}
    </Fragment>
  );
};

const StyledContent = styled(Panel.Content)`
  padding: 0;
  padding-bottom: ${spacing('xl')};
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

export default MomentPanel;
