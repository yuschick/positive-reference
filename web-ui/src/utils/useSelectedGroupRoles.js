import { useGroupState, GroupType, useTranslation } from 'positive-store';

import { classRoles, organizationRoles } from 'config';

const useSelectedGroupRoles = () => {
  const { t } = useTranslation();
  const { selectedGroup } = useGroupState();
  const selectedGroupType = selectedGroup ? selectedGroup.type : GroupType.class;

  const roleValues = selectedGroupType === GroupType.organization ? organizationRoles : classRoles;

  const roleNames = {};

  const roles = Object.entries(roleValues).map(([key, value]) => {
    const name = t(`route.see_the_good.roles.${selectedGroupType}.${key}`);
    const description = t(`route.see_the_good.roles.${selectedGroupType}.${key}.desc`);
    roleNames[value] = name;
    return { value, name, description };
  });

  return { roles, roleNames, roleValues };
};

export default useSelectedGroupRoles;
