import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import Heading from 'components/Heading';
import Text from 'components/Text';
import Panel from 'components/Panel';
import PillButton from 'components/buttons/PillButton';
import Input from 'components/Input';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { useSession } from 'context/SessionContext/SessionContext';

import { spacing } from 'theme';

const userNameMinLength = 1;
const userNameMaxLength = 32;

const AccountSettingsModal = ({ fullscreen = false, isOpen, updateState, form, submit }) => {
  const { trackEvent } = useAnalytics();
  const { user } = useSession();
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = form;

  const onSubmitTrigger = () => {
    submit();
    trackEvent({
      category: 'Account Settings',
      action: 'Submit Changes',
    });
  };

  return (
    <Panel.Container
      fullscreen={fullscreen}
      id="account-settings-modal"
      isOpen={isOpen}
      close={() => updateState({ isOpen: false })}
    >
      {!fullscreen && <Panel.Header title={t('app.menus.account_settings')} />}

      <StyledContent fullscreen={fullscreen}>
        {fullscreen && (
          <ContentContainer>
            <Heading as="h1" align="center">
              {t('app.menus.account_settings.your_name')}
            </Heading>

            <Text>{t('app.menus.account_settings.your_name.msg')}</Text>
          </ContentContainer>
        )}

        <Input
          refKey={register({
            required: true,
            minLength: userNameMinLength,
            maxLength: userNameMaxLength,
          })}
          id="given-name"
          label={t('app.menus.account_settings.given_name')}
          name="givenName"
          defaultValue={user.givenName === user.email ? '' : user.givenName}
          placeholder={t('app.menus.account_settings.given_name')}
          error={
            errors.givenName &&
            t('route.see_the_good.errors.invalid_input_length', {
              min: userNameMinLength,
              max: userNameMaxLength,
            })
          }
        />

        <Input
          refKey={register({
            required: true,
            minLength: userNameMinLength,
            maxLength: userNameMaxLength,
          })}
          id="family-name"
          label={t('app.menus.account_settings.family_name')}
          name="familyName"
          defaultValue={user.familyName}
          placeholder={t('app.menus.account_settings.family_name')}
          error={
            errors.familyName &&
            t('route.see_the_good.errors.invalid_input_length', {
              min: userNameMinLength,
              max: userNameMaxLength,
            })
          }
        />

        {fullscreen && (
          <StyledPillButton label={t('app.actions.save')} onClick={handleSubmit(onSubmitTrigger)} />
        )}
      </StyledContent>

      {!fullscreen && (
        <Panel.Footer>
          <PillButton
            label={t('app.actions.save_changes')}
            onClick={handleSubmit(onSubmitTrigger)}
          />
        </Panel.Footer>
      )}
    </Panel.Container>
  );
};

const StyledContent = styled(Panel.Content)`
  display: grid;
  grid-gap: ${spacing('lg')};
  grid-auto-rows: max-content;
  width: 100%;

  ${({ fullscreen }) =>
    fullscreen &&
    `
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    input[type='text'] {
      width: 295px;
    }
  `};
`;

const StyledPillButton = styled(PillButton)`
  margin-top: ${spacing('sm')};
`;

const ContentContainer = styled.div`
  display: grid;
  grid-gap: ${spacing('lg')};
  text-align: center;
`;

export default AccountSettingsModal;
