import React from 'react';
import styled from 'styled-components';

import MenuGroupLabel from './MenuGroupLabel';
import { color } from 'theme';

interface Props {
  label?: string;
  closeMenu: () => void;
}

const MenuItemGroup: React.FC<Props> = ({ label, closeMenu, children }) => {
  return (
    <Group>
      {label && <MenuGroupLabel>{label}</MenuGroupLabel>}
      {React.Children.map(children as React.ReactElement[], function(child: React.ReactElement) {
        return child && React.cloneElement(child, { closeMenu });
      })}
    </Group>
  );
};

const Group = styled.ul`
  border-bottom: 1px solid ${color('lightGrey')};
`;

export default MenuItemGroup;
