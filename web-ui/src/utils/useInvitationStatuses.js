import { useTranslation } from 'positive-store';

import { invitationStatuses } from 'config';

const useInvitationStatuses = () => {
  const { t } = useTranslation();

  const statusNames = {};

  const statuses = Object.entries(invitationStatuses).map(([key, value]) => {
    const name = t(`route.invitation.status.${value}`);
    statusNames[value] = name;
    return { value, name };
  });

  return { statuses, statusNames };
};

export default useInvitationStatuses;
