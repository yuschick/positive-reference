import React from 'react';
import styled from 'styled-components';
import { UseFormMethods } from 'react-hook-form';

import { color, borderRadius, boxShadow } from 'theme';

interface Props extends Partial<Pick<UseFormMethods, 'register' | 'errors'>> {
  name: string;
}

const SelectGroup: React.FC<Props> = ({ name, register, children }) => {
  return (
    <StyledGroup>
      {React.Children.map(children as React.ReactElement[], function(child: React.ReactElement) {
        return React.cloneElement(child, { name, register: register ? register(name) : undefined });
      })}
    </StyledGroup>
  );
};

const StyledGroup = styled.fieldset`
  border: 1px solid ${color('lightGrey')};
  border-radius: ${borderRadius('sm')};
  box-shadow: ${boxShadow('light')};
  margin: 0;
  overflow: hidden;
  padding: 0;
  transition: border 0.3s ease;
  width: 100%;

  &:focus-within {
    border: 1px solid ${color('hoverGreen')};
  }
`;

export default SelectGroup;
