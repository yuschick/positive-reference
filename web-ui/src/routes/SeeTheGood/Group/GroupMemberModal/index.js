import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useGroupState, useTranslation } from 'positive-store';

import Text from 'components/Text';
import SanityIllustration from 'components/SanityIllustration';
import Flex from 'components/Flex';
import MenuItem from 'components/MenuItem';
import Panel from 'components/Panel';
import useSelectedGroupRoles from 'utils/useSelectedGroupRoles';
import { useSession } from 'context/SessionContext/SessionContext';
import { groupType } from 'api/Group';
import { spacing } from 'theme';

function GroupMemberModal({
  isOpen,
  setIsOpen,
  membership,
  invitation,
  selectedRole,
  onSelectRole,
  onDelete,
}) {
  const { selectedGroup } = useGroupState();

  const { user } = useSession();
  const { t } = useTranslation();
  const { roles, roleValues } = useSelectedGroupRoles();

  selectedRole = (membership && membership.role) || (invitation && invitation.role) || selectedRole;

  // selectedGroup needs to be checked because it's null when removing a group
  const userIsManager = selectedGroup && selectedGroup.userRole === roleValues.manager;
  const memberIsUser = membership && membership.user.id === user.id;

  let isOnlyManager = false;
  let title = t('route.see_the_good.member_role');
  let deleteTitle;

  if (membership) {
    isOnlyManager =
      selectedRole === roleValues.manager &&
      selectedGroup &&
      selectedGroup.memberships.filter(({ role }) => role === roleValues.manager).length === 1;
    title = membership.user.name;

    // Disable deleting of organization members for now
    if (selectedGroup && selectedGroup.type === groupType.class) {
      deleteTitle = t(
        memberIsUser
          ? 'route.see_the_good.actions.leave.group'
          : 'route.see_the_good.actions.remove.from_group'
      );
    }
  } else if (invitation) {
    title = invitation.email;
    deleteTitle = t('route.see_the_good.actions.cancel_invitation');
  }

  return (
    <Fragment>
      <Panel.Container id="group-member-modal" isOpen={isOpen} close={() => setIsOpen(false)}>
        <Panel.Header title={title} />
        <StyledContent>
          {isOnlyManager ? (
            <Flex full padding="lg" column center>
              <SanityIllustration slug="situation-group-work" sizes={'320px'} />

              <StyledText forwardedAs="p" align="center">
                {t('route.see_the_good.only_group_manager')}
              </StyledText>
            </Flex>
          ) : (
            <Fragment>
              {!invitation &&
                userIsManager &&
                roles.map(({ value, name, description }, index) => (
                  <MenuItem
                    key={value}
                    marginTop={index === 0 ? 'md' : undefined}
                    title={name}
                    description={description}
                    isSelected={value === selectedRole}
                    topBorder={index === 0}
                    bottomBorder
                    onClick={() => onSelectRole(value)}
                  />
                ))}

              {!invitation && userIsManager && roles.length === 1 && (
                <StyledText forwardedAs="p" align="center">
                  {t('route.see_the_good.roles.more_coming_soon')}
                </StyledText>
              )}

              {deleteTitle && (
                <MenuItem
                  marginTop="md"
                  title={deleteTitle}
                  isAlert
                  topBorder
                  bottomBorder
                  onClick={onDelete}
                />
              )}
            </Fragment>
          )}
        </StyledContent>
      </Panel.Container>
    </Fragment>
  );
}

const StyledContent = styled(Panel.Content)`
  padding: 0;
`;

const StyledText = styled(Text)`
  margin-top: ${spacing('xl')};
`;

export default GroupMemberModal;
