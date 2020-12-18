import React from 'react';
import styled from 'styled-components';
import { UseFormMethods } from 'react-hook-form';
import { darken } from 'polished';
import { Strength } from 'positive-store';

import { color, fontSize, spacing } from 'theme';

import StrengthImage from 'components/StrengthImage';
import Text from 'components/Text';
import { useMobileBreakpoint } from 'utils/useBreakpoint';

interface Props extends Partial<Pick<UseFormMethods, 'register' | 'errors'>> {
  strength: Strength;
  label?: string;
  value?: string;
  disabled?: boolean;
  selected?: boolean;
  small?: boolean;
  onClick: () => void;
}

const StrengthRadioButton: React.FC<Props> = ({
  strength,
  label = strength.name,
  value = strength.slug,
  disabled = false,
  selected = false,
  small = false,
  register,
  onClick,
}) => {
  const isMobileBreakpoint = useMobileBreakpoint();

  return (
    <LabelWrapper
      data-test-id={`strength-button-${strength.slug}`}
      backgroundColor={strength.color}
    >
      <StyledInput
        type="radio"
        checked={selected}
        value={value}
        ref={register}
        disabled={disabled}
        onChange={onClick}
        onClick={onClick}
      />
      <div>
        <StyledStrengthImage
          sizes={small ? (isMobileBreakpoint ? '100px' : '112px') : '128px'}
          slug={strength.slug}
          alt={strength.slug}
          backgroundColor={strength.color}
        />
        <StrengthText
          forwardedAs="p"
          small={small}
          align="center"
          color={disabled ? 'grey' : 'black'}
        >
          {label}
        </StrengthText>
      </div>
    </LabelWrapper>
  );
};

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

const StyledStrengthImage = styled(StrengthImage)<{ backgroundColor: string }>`
  background: ${({ backgroundColor }) => color(backgroundColor)};
  border: 3px solid transparent;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
`;

const StrengthText = styled(Text)<{ small: boolean; align: string }>`
  font-size: ${({ small }) => (small ? fontSize('sm') : fontSize('body'))};
  margin-top: ${spacing('sm')};
`;

const LabelWrapper = styled.label<{ backgroundColor: string }>`
  cursor: pointer;
  font-size: ${fontSize('body')};
  width: 100%;

  &:hover ${StyledStrengthImage} {
    border-color: ${({ backgroundColor }) => darken(0.3, backgroundColor)};
  }

  input:checked + div ${StyledStrengthImage} {
    border-color: ${({ backgroundColor }) => darken(0.3, backgroundColor)};
  }

  input:focus + div ${StyledStrengthImage} {
    border-color: ${({ backgroundColor }) => darken(0.3, backgroundColor)};
  }

  input:disabled + div {
    cursor: not-allowed;
    filter: grayscale(0.5);
  }
`;

export default StrengthRadioButton;
