import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGroupActions, useGroupState } from 'positive-store';

import Group, { groupType } from 'api/Group';

const GroupModalContext = React.createContext({});

const GroupModalProvider = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDiscardChangesModalOpen, setIsDiscardChangesModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [group, setGroup] = useState(undefined);
  const [initialGroup, setInitialGroup] = useState(undefined);

  const { createGroup, editGroup, deleteGroup } = useGroupActions();
  const { error, organizations, selectedGroup } = useGroupState();

  const sortedOrganizations = organizations.sort(({ aName }, { bName }) =>
    aName < bName ? -1 : 1
  );
  const parentGroupId =
    selectedGroup && selectedGroup.parentGroup
      ? selectedGroup.parentGroup.id
      : organizations.length
      ? sortedOrganizations[0].id
      : '';

  const form = useForm({
    defaultValues: {
      organization: parentGroupId,
    },
  });

  useEffect(() => {
    if (!parentGroupId) return;

    form.reset({
      organization: parentGroupId,
    });
  }, [parentGroupId]);

  const onKeyDown = event => {
    if (event.keyCode === 27) {
      hasChanges() ? setIsDiscardChangesModalOpen(true) : setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && !isDiscardChangesModalOpen && !isDeleteModalOpen) {
      document.addEventListener('keydown', onKeyDown, false);
      return () => document.removeEventListener('keydown', onKeyDown, false);
    }
  }, [group, isOpen, isDiscardChangesModalOpen, isDeleteModalOpen]);

  const createNewGroup = () => {
    const group = new Group({ Name: '' });
    setInitialGroup(group);
    setGroup(group);
    setIsInEditMode(false);
    setIsOpen(true);
  };

  const editGroupSetup = group => {
    setInitialGroup(group);
    setGroup(group);
    setIsInEditMode(true);
    setIsOpen(true);
  };

  const hasChanges = () => {
    const { name, organization } = form.getValues();

    return (
      initialGroup &&
      (initialGroup.name !== name ||
        (!isInEditMode && initialGroup.parentGroup && initialGroup.parentGroup.id !== organization))
    );
  };

  const submitGroup = () => {
    const { name, organization } = form.getValues();

    if (isInEditMode) {
      editGroup({ group: { ...group, name } }).then(() => {
        if (!error.editGroup) setIsOpen(false);
      });
    } else {
      createGroup({ ...group, name, parentGroupId: organization }).then(() => {
        if (!error.createGroup) setIsOpen(false);
      });
    }
  };

  return (
    <GroupModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isDiscardChangesModalOpen,
        setIsDiscardChangesModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isInEditMode,
        form,
        defaultGroupName: (group && group.name) || '',
        isOrganization: group && group.type === groupType.organization,
        createNewGroup,
        editGroup: editGroupSetup,
        hasChanges,
        submitGroup,
        deleteGroup: () => {
          deleteGroup({ groupId: group.id });
          setIsOpen(false);
        },
      }}
    >
      {props.children}
    </GroupModalContext.Provider>
  );
};

const useGroupModal = () => useContext(GroupModalContext);

export { GroupModalProvider, useGroupModal };
