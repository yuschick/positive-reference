import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGroupActions } from 'positive-store';

import Group from 'api/Group';

const getEmptyGroup = () => new Group({ Name: '' });

const useCreateGroupForm = () => {
  const [group, setGroup] = useState(getEmptyGroup());
  const { createGroup } = useGroupActions();
  const form = useForm();

  const reset = () => {
    setGroup(getEmptyGroup());
    form.reset({ name: '' });
  };

  const submitGroup = () => {
    const { name } = form.getValues();
    createGroup({ ...group, name });
  };

  return { form, reset, submitGroup };
};

export default useCreateGroupForm;
