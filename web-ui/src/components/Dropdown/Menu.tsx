import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import MenuLabel from './MenuLabel';
import { COLOR_NAME } from 'types/theme';
import { borderRadius, boxShadow, color, spacing } from 'theme';

interface Props {
  name: string;
  label: string;
  color?: COLOR_NAME;
  isOpen?: boolean;
  dataTestId?: string;
  onClick?: () => void;
}

const DropdownMenu: React.FC<Props> = ({
  name,
  label,
  color,
  isOpen,
  dataTestId,
  onClick,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(isOpen || false);

  useEffect(() => {
    if (isOpen === undefined) return;

    setOpen(isOpen);
  }, [isOpen]);

  return (
    <StyledNav aria-label={name}>
      <ul>
        <MenuLabel
          dataTestId={dataTestId}
          label={label}
          color={color}
          onClick={onClick ? onClick : () => setOpen(!open)}
          isOpen={open}
        >
          <MenuContainer>
            {React.Children.map(children as React.ReactElement[], function(
              child: React.ReactElement
            ) {
              return child && React.cloneElement(child, { closeMenu: () => setOpen(false) });
            })}
          </MenuContainer>
        </MenuLabel>
      </ul>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-content: center;
  display: flex;
  height: 100%;
`;

const MenuContainer = styled.ul`
  background: ${color('white')};
  border-radius: ${borderRadius('sm')};
  box-shadow: ${boxShadow('deep')};
  max-height: 500px;
  min-width: 240px;
  overflow: auto;
  padding: ${spacing('md')} 0;
  pointer-events: auto;
  position: absolute;
  right: 0;
  top: 40px;
  width: 100%;
`;

export default DropdownMenu;
