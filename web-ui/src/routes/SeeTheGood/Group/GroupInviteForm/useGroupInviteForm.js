import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGroupState,
  useInvitationActions,
  useInvitationState,
  Status,
  useTranslation,
} from 'positive-store';

import useSelectedGroupRoles from 'utils/useSelectedGroupRoles';
import useSentry from 'utils/useSentry';
import { invitationTypes } from 'config';
import { useToast } from 'context/ToastContext';
import { errIsBadRequest, errIsConflict } from 'utils/errorHelpers';

const useGroupInviteForm = () => {
  const [memberEmail, setMemberEmail] = useState();

  const { selectedGroup } = useGroupState();
  const { sendInvitation } = useInvitationActions();
  const { error, status } = useInvitationState();

  const { roles } = useSelectedGroupRoles();
  const roleValues = roles.map(r => r.value);

  const [isExpanded, setIsExpanded] = useState(false);
  const [role, setRole] = useState(roleValues[roleValues.length - 1]);
  const [roleModalIsOpen, setRoleModalIsOpen] = useState(false);

  const { t } = useTranslation();
  const { addToast } = useToast();

  const form = useForm();
  const sentry = useSentry();

  useEffect(() => {
    // If selected role is not in the roles list, select the last one in the list.
    if (roleValues && !roleValues.includes(role)) {
      setRole(roleValues[roleValues.length - 1]);
    }
  }, [roles]);

  useEffect(() => {
    if (status.sendInvitation !== Status.complete) return;

    if (error.sendInvitation) {
      if (errIsConflict(error.sendInvitation.error)) {
        addToast(t('route.invitation.errors.already_invited'), true);
      } else if (errIsBadRequest(error.sendInvitation.error)) {
        addToast(t('route.see_the_good.errors.member_already_exists'), true);
      } else {
        addToast(t('route.invitation.errors.failed_to_send'), true);
        sentry.capture({ error: error.sendInvitation.error });
      }

      return;
    }

    addToast(t('route.invitation.status.success', { email: memberEmail }));
  }, [status.sendInvitation]);

  const submit = () => {
    const { email } = form.getValues();
    setMemberEmail(email);

    sendInvitation({
      groupId: selectedGroup.id,
      email,
      role,
      invitationType: invitationTypes.email,
    });
  };

  return {
    isExpanded,
    setIsExpanded,
    form,
    role,
    setRole,
    roleModalIsOpen,
    setRoleModalIsOpen,
    submit,
  };
};

export default useGroupInviteForm;
