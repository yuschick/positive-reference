import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import { breakpoint, color, font, spacing } from 'theme';

interface Props {
  name: string;
  isActive?: boolean;
  handleSelect: () => void;
}

const Tab: React.FC<Props> = ({ name, isActive = false, handleSelect }) => {
  return (
    <StyledTab id={`tab-${name}`} isActive={isActive} onClick={handleSelect}>
      {name}
    </StyledTab>
  );
};

const StyledTab = styled(Button).attrs(() => ({
  ariaSelected: (props: { isActive: boolean }) => props.isActive,
  role: 'tab',
  tabIndex: 0,
}))<{ id: string; isActive: boolean }>`
  --outline: ${({ isActive }) => (isActive ? 'none' : `1px solid ${color('inactiveGrey')}`)};

  color: ${props => (props.isActive ? color('green') : color('inactiveGrey'))};
  font-family: ${font('bold')};
  padding: ${spacing('sm')} ${spacing('lg')};
  text-align: center;
  text-transform: uppercase;

  &:focus {
    outline: 1px solid ${color('inactiveGrey')};
  }

  @media (max-width: ${breakpoint('lg')}) {
    border-bottom: 2px solid
      ${({ isActive }) => (isActive ? color('green') : color('inactiveGrey'))};
  }
`;

export default Tab;
