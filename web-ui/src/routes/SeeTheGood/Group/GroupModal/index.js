import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useGroupState, useTranslation } from 'positive-store';

import Text from 'components/Text';
import Panel from 'components/Panel';
import SelectBlock from 'components/SelectBlock';
import ModalDialog from 'components/ModalDialog';
import PillButton from 'components/buttons/PillButton';
import Input from 'components/Input';
import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';
import { nameMaxLength, nameMinLength } from 'api/Group';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useGroupModal } from 'context/GroupModalContext/GroupModalContext';
import { spacing } from 'theme';

function GroupModal() {
  const {
    isOpen,
    setIsOpen,
    isDiscardChangesModalOpen,
    setIsDiscardChangesModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isInEditMode,
    form,
    defaultGroupName,
    isOrganization,
    hasChanges,
    submitGroup,
    deleteGroup,
  } = useGroupModal();

  const { organizations } = useGroupState();

  const { trackEvent } = useAnalytics();
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = form;

  const modalTitle = isOrganization
    ? t('app.actions.edit')
    : t(isInEditMode ? 'app.actions.edit' : 'route.see_the_good.actions.create.group');

  const nameLabel = t(
    isOrganization ? 'route.see_the_good.organization.name' : 'route.see_the_good.group.name'
  );

  useEffectExceptOnMount(() => {
    if (isOpen) {
      trackEvent({
        category: 'Group',
        action: `Open ${isInEditMode ? 'Edit' : 'Create'} Group Modal`,
      });
    }
  }, [isOpen]);

  const onSubmitTrigger = () => {
    submitGroup();
    trackEvent({
      category: 'Group',
      action: isInEditMode ? 'Submit Group Changes' : 'Submit New Group',
    });
  };

  const onDismissTrigger = () => {
    hasChanges() ? setIsDiscardChangesModalOpen(true) : setIsOpen(false);
  };

  const onDiscardChangesConfirm = () => {
    setIsDiscardChangesModalOpen(false);
    setIsOpen(false);
    trackEvent({ category: 'Group', action: 'Discard Group Changes' });
  };

  const onDeleteConfirm = () => {
    deleteGroup();
    setIsDeleteModalOpen(false);
    trackEvent({ category: 'Group', action: 'Remove Group' });
  };

  const sortedOrganizations = organizations.sort(({ aName }, { bName }) =>
    aName < bName ? -1 : 1
  );

  return (
    <Fragment>
      <Panel.Container id="group-slider" isOpen={isOpen} close={onDismissTrigger}>
        <Panel.Header title={modalTitle} />
        <ContentContainer>
          <Input
            refKey={register({
              required: true,
              minLength: nameMinLength,
              maxLength: nameMaxLength,
            })}
            id="group-name"
            label={nameLabel}
            name="name"
            defaultValue={defaultGroupName}
            placeholder={nameLabel}
            error={
              errors.name
                ? t('route.see_the_good.errors.invalid_input_length', {
                    min: nameMinLength,
                    max: nameMaxLength,
                  })
                : false
            }
          />

          {organizations.length > 1 && (
            <div>
              <StyledText forwardedAs="p" size="sm">
                {t('route.see_the_good.organization')}
              </StyledText>
              <SelectBlock.Group name="organization" register={register}>
                {sortedOrganizations.map(({ id, name }) => (
                  <SelectBlock.Button
                    key={id}
                    type="radio"
                    label={name}
                    value={id}
                    disabled={organizations.length === 1 || isInEditMode}
                  />
                ))}
              </SelectBlock.Group>
            </div>
          )}

          {!isOrganization && isInEditMode && (
            <StyledPillButton
              secondary
              danger
              label={t('route.see_the_good.actions.delete.group')}
              type="submit"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          )}
        </ContentContainer>
        <Panel.Footer>
          <PillButton
            label={
              isInEditMode
                ? t('app.actions.save_changes')
                : t('route.see_the_good.actions.create.group')
            }
            onClick={handleSubmit(onSubmitTrigger)}
          />
        </Panel.Footer>
      </Panel.Container>

      <ModalDialog
        id="discard-changes-modal"
        isOpen={isDiscardChangesModalOpen}
        title={t('app.confirmations.ask_discard_changes')}
        footer={
          <PillButton
            danger
            label={t('app.confirmations.discard_changes')}
            onClick={onDiscardChangesConfirm}
          />
        }
        onCloseTrigger={() => setIsDiscardChangesModalOpen(false)}
      >
        <Text as="p">{t('app.confirmations.discard_msg')}</Text>
      </ModalDialog>

      <ModalDialog
        id="delete-group-modal"
        isOpen={isDeleteModalOpen}
        title={t('app.actions.confirm')}
        footer={
          <PillButton
            danger
            label={t('route.see_the_good.actions.delete.group')}
            onClick={onDeleteConfirm}
          />
        }
        onCloseTrigger={() => setIsDeleteModalOpen(false)}
      >
        <Text as="p">{t('route.see_the_good.confirmations.delete.group.msg_1')}</Text>

        <Text as="p" className="confirm-delete-message">
          {t('route.see_the_good.confirmations.delete.group.msg_2')}
        </Text>
      </ModalDialog>
    </Fragment>
  );
}

const ContentContainer = styled(Panel.Content)`
  align-content: start;
  display: grid;
  grid-gap: ${spacing('xl')};
  grid-template-rows: max-content;
  position: relative;
`;

const StyledText = styled(Text)`
  margin-bottom: ${spacing('sm')};
`;

const StyledPillButton = styled(PillButton)`
  bottom: ${spacing('md')};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export default GroupModal;
