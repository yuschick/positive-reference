import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  useGroupState,
  GroupType,
  useInvitationState,
  Status,
  useInvitationActions,
  useMembershipActions,
  useMembershipState,
  useTranslation,
} from 'positive-store';

import Spinner from 'components/Spinner';
import Card from 'components/Card';
import CrowTip from 'components/CrowTip/CrowTip';
import CrowTipBanner from 'components/CrowTip/CrowTipBanner';
import Flex from 'components/Flex';
import Grid from 'components/Grid';
import GroupInviteForm from 'routes/SeeTheGood/Group/GroupInviteForm';
import GroupMemberModal from 'routes/SeeTheGood/Group/GroupMemberModal';
import Heading from 'components/Heading';
import IconButton from 'components/buttons/IconButton';
import ModalDialog from 'components/ModalDialog';
import Text from 'components/Text';
import Page from 'components/Page';
import PillButton from 'components/buttons/PillButton';
import Require from 'routes/SeeTheGood/Require';
import useGroupMemberEdit from 'routes/SeeTheGood/Group/GroupMemberModal/useGroupMemberEdit';
import useInvitationStatuses from 'utils/useInvitationStatuses';
import useSelectedGroupRoles from 'utils/useSelectedGroupRoles';
import MenuLabel from 'components/Dropdown/MenuLabel';
import { breakpoint, spacing } from 'theme';
import { useGroupModal } from 'context/GroupModalContext/GroupModalContext';
import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { useSession } from 'context/SessionContext/SessionContext';
import useEffectOnMountOnly from 'utils/useEffectOnMountOnly';
import MenuBar from '../MenuBar';

const Member = ({
  bottomBorder,
  name,
  role,
  invitationStatus,
  bold = false,
  enableDropdown = false,
  onRoleDropdownClick,
}) => {
  const { roleNames } = useSelectedGroupRoles();
  const { statusNames } = useInvitationStatuses();

  const rowHeight = '72px';

  return (
    <Fragment>
      <Flex height={rowHeight} column justifyCenter bottomBorder={bottomBorder}>
        <Text as="p" bold={bold}>
          {name}
        </Text>

        {invitationStatus && (
          <Text as="p" size="sm" color="grey">
            {statusNames[invitationStatus]}
          </Text>
        )}
      </Flex>

      <Flex
        height={rowHeight}
        paddingRight="sm"
        alignCenter
        justifyContent="flex-end"
        bottomBorder={bottomBorder}
      >
        {enableDropdown ? (
          <MenuLabel label={roleNames[role]} color="green" onClick={onRoleDropdownClick} />
        ) : (
          <Text as="p">{roleNames[role]}</Text>
        )}
      </Flex>
    </Fragment>
  );
};

const DeleteModalDialog = ({ membership, onConfirm, ...props }) => {
  const { user } = useSession();

  const { t } = useTranslation();

  let message = t('route.see_the_good.confirmations.invitation');
  let confirmLabel = t('route.see_the_good.actions.cancel_invitation');

  if (membership) {
    const memberIsUser = membership.user.id === user.id;
    message = t(
      memberIsUser
        ? 'route.see_the_good.confirmations.leave_group'
        : 'route.see_the_good.confirmations.memberships'
    );
    confirmLabel = t(
      memberIsUser ? 'route.see_the_good.actions.leave' : 'route.see_the_good.actions.remove'
    );
  }

  return (
    <ModalDialog footer={<PillButton danger label={confirmLabel} onClick={onConfirm} />} {...props}>
      <Text as="p">{message}</Text>
    </ModalDialog>
  );
};

const Group = () => {
  const { selectedGroup, restrictedAccount } = useGroupState();
  const { status: invitationStatus } = useInvitationState();
  const { fetchInvitations } = useInvitationActions();
  const { fetchMemberships } = useMembershipActions();
  const { status: membershipStatus } = useMembershipState();

  const [downgradeRole, setDowngradeRole] = useState(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { editGroup } = useGroupModal();
  const { user } = useSession();
  const { t } = useTranslation();
  const { roleValues } = useSelectedGroupRoles();

  const isMobileBreakpoint = useMobileBreakpoint();
  const groupMemberEdit = useGroupMemberEdit();

  useEffectOnMountOnly(() => {
    if (!selectedGroup) return;
    fetchMemberships({ groupId: selectedGroup.id });
    fetchInvitations({ groupId: selectedGroup.id });
  }, [selectedGroup, fetchMemberships, fetchInvitations]);

  const userIsManager = selectedGroup && selectedGroup.userRole === roleValues.manager;
  const tipGroupType =
    selectedGroup && selectedGroup.type === GroupType.organization ? 'organization' : 'group';

  const onRoleDropdownClick = ({ membership, invitation }) => {
    if (membership) {
      groupMemberEdit.setInvitation(null);
      groupMemberEdit.setMembership(membership);
    } else if (invitation) {
      groupMemberEdit.setMembership(null);
      groupMemberEdit.setInvitation(invitation);
    }
    groupMemberEdit.setIsOpen(true);
  };

  const onSelectRole = role => {
    if (groupMemberEdit.memberIsUser) {
      setDowngradeRole(role);
    } else {
      onSelectRoleConfirm(role);
    }
  };

  const onDowngradeConfirm = () => {
    setDowngradeRole(undefined);
    onSelectRoleConfirm(downgradeRole);
  };

  const onSelectRoleConfirm = role => {
    groupMemberEdit.updateMembership({ ...groupMemberEdit.membership, role });
    groupMemberEdit.setIsOpen(false);
  };

  const onDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const onDeleteConfirm = () => {
    if (groupMemberEdit.membership && groupMemberEdit.memberIsUser) {
      groupMemberEdit.leaveGroup(groupMemberEdit.membership);
    } else if (groupMemberEdit.membership) {
      groupMemberEdit.removeMember(groupMemberEdit.membership);
    } else if (groupMemberEdit.invitation) {
      groupMemberEdit.cancelInvitation(groupMemberEdit.invitation);
    }

    setIsDeleteModalOpen(false);
    groupMemberEdit.setIsOpen(false);
  };

  return (
    <Fragment>
      <Helmet>
        <title>{`${t('route.see_the_good')} | Positive`}</title>
      </Helmet>

      <MenuBar />

      <Require requireGroup>
        <StyledPage>
          {selectedGroup && (
            <Fragment>
              {userIsManager && isMobileBreakpoint && (
                <CrowTipBanner
                  tipId={`see-the-good.${tipGroupType}.tip`}
                  tips={[
                    t(`route.see_the_good.${tipGroupType}.tip_1`),
                    t(`route.see_the_good.${tipGroupType}.tip_2`),
                  ]}
                />
              )}

              <Flex
                padding={isMobileBreakpoint ? 'lg lg none' : undefined}
                row
                alignCenter
                justifyContent="space-between"
              >
                <div>
                  {selectedGroup.parentGroup && (
                    <Text color="grey">{selectedGroup.parentGroup.name}</Text>
                  )}
                  <Heading as="h1">{selectedGroup.name}</Heading>
                </div>

                {userIsManager && (
                  <IconButton
                    iconName="edit"
                    ariaLabel={t('route.see_the_good.actions.edit.group')}
                    onClick={() => editGroup(selectedGroup)}
                  />
                )}
              </Flex>

              <Card marginTop="md" padding="lg" alignItems="flex-start">
                <Heading as="h2" appearAs="h4">
                  {t('route.see_the_good.members')}
                </Heading>

                <Grid marginTop="md" fullWidth columns="1fr auto" position="relative">
                  {membershipStatus.deleteMembership === Status.loading ||
                    membershipStatus.editMembership === Status.loading ||
                    (membershipStatus.fetchMemberships === Status.loading && (
                      <SectionOverlay>
                        <Spinner />
                      </SectionOverlay>
                    ))}
                  {selectedGroup.memberships.map((membership, index) => {
                    const memberIsUser = membership.user.id === user.id;
                    const bottomBorder = index < selectedGroup.memberships.length - 1;

                    return (
                      <Member
                        key={membership.user.id}
                        name={membership.user.name}
                        role={membership.role}
                        bold={memberIsUser}
                        bottomBorder={bottomBorder}
                        enableDropdown={userIsManager || (memberIsUser && !restrictedAccount)}
                        onRoleDropdownClick={() => onRoleDropdownClick({ membership })}
                      />
                    );
                  })}
                </Grid>

                {userIsManager && selectedGroup.invitations && selectedGroup.invitations.length ? (
                  <Fragment>
                    <StyledInvitationsHeading forwardAs="h2" appearAs="h4">
                      {t('route.invitation.invitations')}
                    </StyledInvitationsHeading>

                    <Grid
                      id="invitations"
                      marginTop="md"
                      fullWidth
                      columns="1fr auto"
                      position="relative"
                    >
                      {invitationStatus.sendInvitation === Status.loading ||
                        (invitationStatus.deleteInvitation === Status.loading && (
                          <SectionOverlay>
                            <Spinner />
                          </SectionOverlay>
                        ))}
                      {selectedGroup.invitations.map((invitation, index) => {
                        const bottomBorder = index < selectedGroup.invitations.length - 1;

                        return (
                          <Member
                            key={invitation.id}
                            name={invitation.email}
                            role={invitation.role}
                            invitationStatus={invitation.status}
                            bottomBorder={bottomBorder}
                            enableDropdown={userIsManager}
                            onRoleDropdownClick={() => onRoleDropdownClick({ invitation })}
                          />
                        );
                      })}
                    </Grid>
                  </Fragment>
                ) : null}
              </Card>

              {userIsManager && (
                <Card marginTop="md" padding="none lg" alignItems="flex-start">
                  <GroupInviteForm />
                </Card>
              )}

              {userIsManager && !isMobileBreakpoint && (
                <StyledCrowTip
                  tipId={`see-the-good.${tipGroupType}.tip`}
                  tips={[
                    t(`route.see_the_good.${tipGroupType}.tip_1`),
                    t(`route.see_the_good.${tipGroupType}.tip_2`),
                  ]}
                />
              )}
            </Fragment>
          )}
        </StyledPage>
      </Require>

      <GroupMemberModal
        isOpen={groupMemberEdit.isOpen}
        setIsOpen={groupMemberEdit.setIsOpen}
        membership={groupMemberEdit.membership}
        invitation={groupMemberEdit.invitation}
        onSelectRole={onSelectRole}
        onDelete={onDelete}
      />

      <ModalDialog
        id="downgrade-modal"
        isOpen={!!downgradeRole}
        title={t('app.actions.confirm')}
        footer={
          <PillButton
            danger
            label={t('route.see_the_good.actions.change_role')}
            onClick={onDowngradeConfirm}
          />
        }
        onCloseTrigger={() => setDowngradeRole(undefined)}
      >
        <Text as="p">{t('route.see_the_good.confirmations.downgrade_role')}</Text>
      </ModalDialog>

      {isDeleteModalOpen && (
        <DeleteModalDialog
          id="delete-modal"
          isOpen={isDeleteModalOpen}
          title={t('app.actions.confirm')}
          membership={groupMemberEdit.membership}
          onCloseTrigger={() => setIsDeleteModalOpen(false)}
          onConfirm={onDeleteConfirm}
        />
      )}
    </Fragment>
  );
};

const StyledPage = styled(Page)`
  max-width: 100%;
  padding: 0;
  width: 100%;

  @media (min-width: ${breakpoint('sm')}) {
    max-width: 640px;
    padding: ${spacing('lg')} ${spacing('lg')} ${spacing('xxxl')};
  }
`;

const StyledInvitationsHeading = styled(Heading)`
  margin-top: ${spacing('lg')};
`;

const StyledCrowTip = styled(CrowTip)`
  margin-top: ${spacing('xxl')};
  max-width: 600px;
`;

const SectionOverlay = styled.div`
  background: rgba(255, 255, 255, 0.6);
  align-items: center;
  bottom: 0;
  display: flex;
  filter: blur(0.5);
  left: 0;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`;

export default Group;
