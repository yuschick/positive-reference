import React, { Fragment, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useInvitationState, Status, useTranslation } from 'positive-store';

import Flex from 'components/Flex';
import GroupMemberModal from 'routes/SeeTheGood/Group/GroupMemberModal';
import Icon from 'components/Icon';
import Text from 'components/Text';
import PillButton from 'components/buttons/PillButton';
import TextButton from 'components/buttons/TextButton';
import Input from 'components/Input';
import useGroupInviteForm from 'routes/SeeTheGood/Group/GroupInviteForm/useGroupInviteForm';
import useSelectedGroupRoles from 'utils/useSelectedGroupRoles';
import MenuLabel from 'components/Dropdown/MenuLabel';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { color, spacing } from 'theme';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const GroupInviteForm = () => {
  const emailInputRef = useRef();
  const { status, error } = useInvitationState();

  const { trackEvent } = useAnalytics();

  const {
    isExpanded,
    setIsExpanded,
    form,
    role,
    setRole,
    roleModalIsOpen,
    setRoleModalIsOpen,
    submit,
  } = useGroupInviteForm();

  const { register, handleSubmit, errors } = form;
  const { t } = useTranslation();

  const { roleNames } = useSelectedGroupRoles();

  useEffect(() => {
    if (isExpanded) emailInputRef.current.focus();
  }, [isExpanded]);

  useEffect(() => {
    if (status.sendInvitation === Status.complete && !error.sendInvitation) {
      emailInputRef.current.value = '';
      emailInputRef.current.focus();
    }
  }, [status.sendInvitation, error.sendInvitation]);

  const onSelectRole = role => {
    setRole(role);
    setRoleModalIsOpen(false);
  };

  const onSubmitTrigger = () => {
    submit();

    trackEvent({
      category: 'Group',
      action: 'Submit Group Member Invitation',
    });
  };

  return (
    <Fragment>
      <Flex fullWidth column paddingBottom={isExpanded ? 'lg' : undefined}>
        <Flex
          fullWidth
          alignCenter
          justifyContent="space-between"
          cursor={!isExpanded ? 'pointer' : undefined}
          onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
        >
          <InviteText forwardedAs="p" isExpanded={isExpanded} bold={isExpanded}>
            {t('route.see_the_good.actions.invite.new_member')}
          </InviteText>

          {!isExpanded ? (
            <Flex size="38px" center>
              <Icon name="add" color="green" />
            </Flex>
          ) : (
            <Flex>
              <TextButton
                onClick={() => {
                  setIsExpanded(false);
                }}
              >
                {t('app.actions.cancel')}
              </TextButton>

              <PillButton
                marginLeft="lg"
                minWidth={undefined}
                label={t('route.see_the_good.actions.invite')}
                spinner={status.sendInvitation === Status.loading}
                disabled={status.sendInvitation === Status.loading}
                onClick={handleSubmit(onSubmitTrigger)}
              />
            </Flex>
          )}
        </Flex>

        {isExpanded && (
          <Flex marginTop="lg" fullWidth justifyContent="space-between" alignCenter>
            <StyledInput
              refKey={e => {
                register(e, { required: true, pattern: emailRegex });
                emailInputRef.current = e;
              }}
              id="invitation-email"
              type="email"
              name="email"
              placeholder={t('app.email.example')}
              error={errors.email && t('route.see_the_good.errors.invalid_email')}
            />

            <MenuLabel
              label={roleNames[role]}
              color="green"
              onClick={() => setRoleModalIsOpen(true)}
            />
          </Flex>
        )}
      </Flex>

      {roleModalIsOpen && (
        <GroupMemberModal
          isOpen={roleModalIsOpen}
          setIsOpen={setRoleModalIsOpen}
          selectedRole={role}
          onSelectRole={onSelectRole}
        />
      )}
    </Fragment>
  );
};

const InviteText = styled(Text)`
  color: ${({ isExpanded }) => (isExpanded ? color('green') : color('black'))};
  margin: ${spacing('lg')} 0;
`;

const StyledInput = styled(Input)`
  max-width: 320px;
`;

export default GroupInviteForm;
