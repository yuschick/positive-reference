import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import Label from './Label';

import { color, font, fontSize, spacing } from 'theme';
import mergeRefs from 'utils/mergeRefs';

interface Props {
  className?: string;
  id: string;
  label: string;
  hideLabel?: boolean;
  name: string;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  type?: 'text' | 'email' | 'number' | 'tel' | 'search' | 'url' | 'hidden';
  error?: string;
  large?: boolean;
  disabled?: boolean;
  dataTestId?: string;
  classnames?: string;
  refKey?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (value?: string) => void;
}

const Input: React.FunctionComponent<Props> = ({
  className,
  id,
  label,
  hideLabel,
  name,
  placeholder,
  defaultValue,
  value,
  type = 'text',
  error,
  large = false,
  disabled = false,
  dataTestId,
  refKey,
  onChange,
  onEnter,
}) => {
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!inputRef?.current || !onEnter) return;
    const input = inputRef.current;

    input.addEventListener(
      'keypress',
      (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          onEnter(inputRef.current?.value);
        }
      },
      {
        passive: true,
      }
    );

    return () =>
      input.removeEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          onEnter(input.value);
        }
      });
  });

  return (
    <div>
      {label && (
        <Label htmlFor={id} large={large} hidden={hideLabel}>
          {label}
        </Label>
      )}
      <StyledInput
        data-test-id={dataTestId}
        ref={mergeRefs(refKey, inputRef)}
        className={className}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        error={error}
        aria-invalid={!!error}
        large={large}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

const StyledInput = styled.input<{ error?: string; large?: boolean; ref: any }>`
  background: ${color('white')};
  border-bottom: 1px solid ${({ error }) => color(error ? 'red' : 'lightGrey')};
  border-radius: ${spacing('xs')};
  color: ${color('black')};
  font-family: ${({ large }) => font(large ? 'bold' : 'body')};
  font-size: ${({ large }) => fontSize(large ? 'lg' : 'body')};
  padding: ${spacing('sm')} ${({ large }) => large && spacing('lg')};
  transition: border-bottom 0.3s ease;
  width: 100%;

  &::placeholder {
    color: ${({ large }) => color(large ? 'grey' : 'black')};
  }

  &:focus {
    border-color: ${({ error }) => color(error ? 'activeRed' : 'green')};
  }

  &:disabled {
    background: ${color('lightGrey')};
    border-color: ${color('grey')};
    cursor: not-allowed;
  }
`;

export default Input;
