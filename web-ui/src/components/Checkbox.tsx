import React from 'react';
import styled, { keyframes } from 'styled-components';
import { UseFormMethods } from 'react-hook-form';

import Icon from 'components/Icon';

import { color, fontSize, spacing } from 'theme';

interface Props extends Partial<Pick<UseFormMethods, 'register' | 'errors'>> {
  className?: string;
  name: string;
  label: string;
  value?: string | number;
  disabled?: boolean;
}

const Checkbox: React.FC<Props> = ({
  className,
  name,
  label,
  value = label,
  disabled = false,
  register,
  children,
}) => {
  return (
    <LabelWrapper className={className}>
      <StyledInput type="checkbox" name={name} value={value} ref={register} disabled={disabled} />
      <CheckboxContainer disabled={disabled}>
        <StyledIcon name="check" color="white" size="16px" bold />
      </CheckboxContainer>
      {label}
      {children}
    </LabelWrapper>
  );
};

const OnSelect = keyframes`
  50% {
    filter: brightness(1.1);
    transform: scale(1.015);
  }
  100% {
    filter: brightness(1);
    transform: scale(1);
  }
`;

const CheckboxContainer = styled.div<{ disabled: boolean }>`
  align-items: center;
  background: ${color('white')};
  border: 2px solid ${color('green')};
  border-radius: 4px;
  color: ${color('black')};
  display: flex;
  margin-right: ${spacing('md')};
  padding: ${spacing('xs')};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ disabled }) => !disabled && color('lightGreen')};
  }
`;

const StyledIcon = styled(Icon)`
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const LabelWrapper = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: ${fontSize('body')};

  input:checked + ${CheckboxContainer} {
    animation: ${OnSelect} 0.3s ease;
    background: ${color('green')};
    color: ${color('white')};
    cursor: default;

    ${StyledIcon} {
      opacity: 1;
    }

    @media (prefers-reduced-motion) {
      animation: none;
    }
  }

  input:disabled + ${CheckboxContainer} {
    cursor: not-allowed;
    opacity: 0.56;
  }
`;

const StyledInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export default Checkbox;
