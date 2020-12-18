import React, { useRef } from 'react';
import styled from 'styled-components';
import { FocusOn } from 'react-focus-on';

import Text from 'components/Text';
import Icon from 'components/Icon';

import { borderRadius, color, spacing } from 'theme';
import { COLOR_NAME } from 'types/theme';

interface Props {
  label: string;
  color?: COLOR_NAME;
  isOpen?: boolean;
  dataTestId?: string;
  onClick?: () => void;
}

const MenuLabel: React.FC<Props> = ({
  label,
  color,
  onClick,
  isOpen = false,
  dataTestId,
  children,
}) => {
  const labelBtn = useRef<HTMLButtonElement | null>(null);

  return (
    <LabelWrapper>
      <LabelButton
        data-test-id={dataTestId}
        ref={labelBtn}
        isOpen={isOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={onClick}
      >
        <Text color={color}>{label}</Text>
        <StyledIcon name="chevronDown" color={color} isOpen={isOpen} />
      </LabelButton>
      {children && isOpen && (
        <FocusOn
          onClickOutside={onClick}
          onEscapeKey={onClick}
          autoFocus={false}
          shards={[labelBtn]}
        >
          {children}
        </FocusOn>
      )}
    </LabelWrapper>
  );
};

const LabelWrapper = styled.li`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  max-width: 320px;
  position: relative;
  transition: background 0.3s ease;
`;

const LabelButton = styled.button<{ isOpen: boolean }>`
  align-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${borderRadius('xs')};
  cursor: ${({ isOpen }) => (isOpen ? 'default' : 'pointer')};
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0 ${spacing('sm')};
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${color('activeGreen')};
    outline: none;
  }
`;

const StyledIcon = styled(Icon)<{ isOpen: boolean }>`
  margin-left: ${spacing('md')};
  transform: ${({ isOpen }) => `rotate(${isOpen ? 180 : 0}deg)`};
  transition: transform 0.3s ease;
`;

export default MenuLabel;
