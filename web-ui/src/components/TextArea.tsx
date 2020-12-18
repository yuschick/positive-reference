import React, { useState, useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';

import { borderRadius, color, fontSize, spacing } from 'theme';

interface Props {
  id: string;
  value: string;
  placeholder: string;
  rows?: number;
  resize?: boolean;
  disabled?: boolean;
  onChange: (event?: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FunctionComponent<Props> = ({
  id,
  value,
  placeholder,
  rows = 1,
  resize = true,
  disabled = false,
  onChange,
}) => {
  const [areaRows, setAreaRows] = useState<number>(rows);
  const { spacingValue } = useTheme() as { spacingValue: Record<string, number> };
  const textareaRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (!textareaRef?.current) return;
    const lineHeight = spacingValue.xl;
    const padding = spacingValue.sm;

    const scrollHeight = textareaRef.current.scrollHeight - padding * 2;
    setAreaRows(value === '' ? 1 : Math.max(1, Math.round(scrollHeight / lineHeight)));
  }, [value, textareaRef, setAreaRows, spacingValue]);

  return (
    <StyledTextArea
      ref={textareaRef}
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      rows={areaRows}
      disabled={disabled}
      resize={resize}
      onChange={onChange}
    />
  );
};

const StyledTextArea = styled.textarea<{ resize: boolean; ref: any }>`
  border-bottom: 1px solid ${color('lightGrey')};
  border-radius: ${borderRadius('xs')} ${borderRadius('xs')} 0 0;
  font-size: ${fontSize('body')};
  line-height: ${spacing('xl')};
  padding: ${spacing('sm')};
  resize: ${({ resize }) => (resize ? '' : 'none')};
  width: 100%;

  &:focus {
    border-color: ${color('green')};
  }

  &::placeholder {
    color: ${color('black')};
  }
`;

export default TextArea;
