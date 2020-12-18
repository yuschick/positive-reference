import React from 'react';
import styled from 'styled-components';
import { UseFormMethods } from 'react-hook-form';

interface Props extends Partial<Pick<UseFormMethods, 'register' | 'errors'>> {
  name: string;
}

const StrengthButtonGroup: React.FC<Props> = ({ name, register, children }) => {
  return (
    <StyledGroup>
      {React.Children.map(children as React.ReactElement[], function(child: React.ReactElement) {
        return React.cloneElement(child, { name, register: register ? register(name) : undefined });
      })}
    </StyledGroup>
  );
};

const StyledGroup = styled.fieldset`
  margin: 0;
  overflow: hidden;
  padding: 0;
`;

export default StrengthButtonGroup;
