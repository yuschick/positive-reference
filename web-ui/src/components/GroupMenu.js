import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useGroupState, useGroupActions, useTranslation } from 'positive-store';

import Panel from 'components/Panel';
import Dropdown from 'components/Dropdown';
import MenuLabel from 'components/Dropdown/MenuLabel';
import Text from 'components/Text';
import MenuItem from 'components/MenuItem';
import useEffectExceptOnMount from 'utils/useEffectExceptOnMount';
import { DesktopBreakpoint, MobileBreakpoint } from 'components/MediaQueries';
import { organizationRoles } from 'config';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';
import { spacing } from 'theme';

const MobileGroupGroup = ({
  name,
  groups,
  manageOrganizationLabel,
  selectedGroupId,
  onGroupClick,
  onOrganizationClick,
}) => (
  <Fragment>
    {name && (
      <StyledText forwardedAs="p" appearAs="h4">
        {name}
      </StyledText>
    )}

    {manageOrganizationLabel && (
      <MenuItem
        title={manageOrganizationLabel}
        isAction
        isLarge
        topBorder
        bottomBorder={!groups.length}
        onClick={onOrganizationClick}
      />
    )}

    {groups.map((group, index) => (
      <MenuItem
        key={group.id}
        title={group.name}
        isSelected={selectedGroupId === group.id}
        isLarge
        horizontalBorders={!index}
        bottomBorder={index}
        onClick={() => onGroupClick({ groupId: group.id })}
      />
    ))}
  </Fragment>
);

const GroupMenu = ({ onCreateGroup }) => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const { organizations, orphanGroups, selectedGroup, restrictedAccount } = useGroupState();
  const { setSelectedGroupId } = useGroupActions();

  const { trackEvent } = useAnalytics();
  const { t } = useTranslation();

  const selectedGroupId = selectedGroup ? selectedGroup.id : 'non-id';
  const selectedGroupName = selectedGroup ? selectedGroup.name : t('route.see_the_good.no_groups');

  const groupMenuTreeLength = organizations ? organizations.length : 0;
  const orphanGroupsLength = orphanGroups ? orphanGroups.length : 0;

  useEffectExceptOnMount(() => {
    onMenuToggle(isMenuModalOpen);
  }, [isMenuModalOpen]);

  const onMenuToggle = isOpen => {
    if (isOpen) {
      trackEvent({ category: 'Group', action: 'Open Group Menu' });
    }
  };

  const onGroupClick = ({ groupId }) => {
    if (!selectedGroup || groupId !== selectedGroup.id) setSelectedGroupId(groupId);
    trackEvent({ category: 'Group', action: 'Select Group' });

    setIsMenuModalOpen(false);
  };

  const onCreateGroupClick = () => {
    onCreateGroup();
    setIsMenuModalOpen(false);
  };

  return (
    <Fragment>
      <MobileBreakpoint>
        <MenuLabel
          label={selectedGroupName}
          color="white"
          isOpen={isMenuModalOpen}
          onClick={() => setIsMenuModalOpen(true)}
        />

        <Panel.Container
          id="group-menu-modal"
          isOpen={isMenuModalOpen}
          close={() => setIsMenuModalOpen(false)}
        >
          <Panel.Header title={t('route.see_the_good.your_groups')} />
          <StyledContent>
            {organizations.map(organization => (
              <MobileGroupGroup
                key={organization.id}
                name={organization.name}
                groups={organization.childGroups}
                manageOrganizationLabel={
                  organization.userRole === organizationRoles.manager
                    ? t('route.see_the_good.manage_organization')
                    : undefined
                }
                selectedGroupId={selectedGroupId}
                onGroupClick={onGroupClick}
                onOrganizationClick={() => onGroupClick({ groupId: organization.id })}
              />
            ))}

            {orphanGroupsLength && (
              <MobileGroupGroup
                name={groupMenuTreeLength > 0 ? t('route.see_the_good.other_groups') : undefined}
                groups={orphanGroups}
                selectedGroupId={selectedGroupId}
                onGroupClick={onGroupClick}
              />
            )}

            {!restrictedAccount && (
              <MenuItem
                marginTop="md"
                title={t('route.see_the_good.actions.create.group')}
                isAction
                isLarge
                horizontalBorders
                onClick={onCreateGroupClick}
              />
            )}
          </StyledContent>
        </Panel.Container>
      </MobileBreakpoint>

      <DesktopBreakpoint>
        <Dropdown.Menu
          dataTestId="select-group-button"
          name={t('route.see_the_good.actions.select_group')}
          label={selectedGroupName}
          color="green"
        >
          {organizations.map(organization => (
            <Dropdown.MenuItemGroup key={organization.id} label={organization.name}>
              {organization.userRole === organizationRoles.manager && (
                <Dropdown.MenuItem
                  key={uuidv4()}
                  title={t('route.see_the_good.manage_organization')}
                  onClick={() => setSelectedGroupId(organization.id)}
                />
              )}
              {organization.childGroups.map(group => (
                <Dropdown.MenuItem
                  key={group.id}
                  title={group.name}
                  isSelected={group.id === selectedGroupId}
                  onClick={() => onGroupClick({ groupId: group.id })}
                />
              ))}
            </Dropdown.MenuItemGroup>
          ))}

          {orphanGroupsLength > 0 && (
            <Dropdown.MenuItemGroup
              label={t(
                groupMenuTreeLength > 0
                  ? 'route.see_the_good.other_groups'
                  : 'route.see_the_good.your_groups'
              )}
            >
              {orphanGroups.map(group => (
                <Dropdown.MenuItem
                  dataTestId="group-menu-item"
                  key={group.id}
                  title={group.name}
                  isSelected={group.id === selectedGroupId}
                  onClick={() => onGroupClick({ groupId: group.id })}
                />
              ))}
            </Dropdown.MenuItemGroup>
          )}

          {!restrictedAccount && (
            <Dropdown.MenuItem
              dataTestId="create-group-button"
              title={t('route.see_the_good.actions.create.group')}
              onClick={onCreateGroupClick}
              isAction
            />
          )}
        </Dropdown.Menu>
      </DesktopBreakpoint>
    </Fragment>
  );
};

const StyledContent = styled(Panel.Content)`
  padding: 0;
`;

const StyledText = styled(Text)`
  margin: ${spacing('lg')} 0 ${spacing('md')} ${spacing('lg')};
`;

export default GroupMenu;
