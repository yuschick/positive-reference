import React from 'react';
import styled, { keyframes } from 'styled-components';
import { UseFormMethods } from 'react-hook-form';

import Icon from 'components/Icon';

import { color, fontSize, spacing } from 'theme';

interface Props extends Partial<Pick<UseFormMethods, 'register' | 'errors'>> {
  name?: string;
  label: string;
  value?: string | number;
  disabled?: boolean;
  type: 'checkbox' | 'radio';
  checked?: boolean;
  onChange?: () => void;
}

const SelectBlock: React.FC<Props> = ({
  name,
  label,
  value = label,
  disabled = false,
  type,
  checked = false,
  register,
  onChange,
  children,
}) => {
  return (
    <LabelWrapper>
      <StyledInput
        checked={checked}
        type={type}
        name={name}
        value={value}
        ref={register}
        disabled={disabled}
        onChange={onChange}
      />
      <SelectBlockContainer disabled={disabled}>
        {label}
        <StyledIcon name="check" color="white" size="16px" />
        {children && <StyledChildren>{children}</StyledChildren>}
      </SelectBlockContainer>
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

const SelectBlockContainer = styled.div<{ disabled: boolean }>`
  align-items: center;
  background: ${color('white')};
  border: 1px solid transparent;
  color: ${color('black')};
  display: grid;
  grid-template-columns: auto 16px;
  padding: ${spacing('md')};
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: ${({ disabled }) => !disabled && color('lightGreen')};
  }
`;

const StyledIcon = styled(Icon)`
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const StyledChildren = styled.div`
  color: ${color('grey')};
  font-size: ${fontSize('sm')};
  grid-column: 1 / -1;
  line-height: 1.5;
  margin-top: ${spacing('xs')};
  transition: color 0.3s ease;
`;

const LabelWrapper = styled.label`
  cursor: pointer;
  display: block;
  font-size: ${fontSize('body')};
  width: 100%;

  input:checked + ${SelectBlockContainer} {
    animation: ${OnSelect} 0.3s ease;
    background: ${color('green')};
    color: ${color('white')};

    ${StyledIcon} {
      opacity: 1;
    }

    ${StyledChildren} {
      color: ${color('white')};
    }

    @media (prefers-reduced-motion) {
      animation: none;
    }
  }

  input:focus + ${SelectBlockContainer} {
    border: 1px solid ${color('green')};
  }

  input:disabled + ${SelectBlockContainer} {
    cursor: not-allowed;
    opacity: 0.56;
  }

  + label {
    border-top: 1px solid ${color('lightGrey')};
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

export default SelectBlock;
