import React from 'react';
import styled from 'styled-components';

import { fontSize, spacing } from 'theme';

import ScreenReaderText from './ScreenReaderText';
import Text from './Text';

interface Props {
  htmlFor: string;
  large?: boolean;
  align?: 'left' | 'center' | 'right';
  hidden?: boolean;
}

const Label: React.FunctionComponent<Props> = ({
  htmlFor,
  large,
  align = large ? 'center' : 'left',
  hidden = false,
  children,
}) =>
  hidden ? (
    <ScreenReaderText as="label">{children}</ScreenReaderText>
  ) : (
    <StyledLabel htmlFor={htmlFor} large={large} align={align}>
      {children}
    </StyledLabel>
  );

const StyledLabel = styled(Text).attrs(() => ({
  as: 'label',
}))<Props>`
  display: block;
  font-size: ${({ large }) => fontSize(large ? 'body' : 'sm')};
  margin-bottom: ${({ large }) => spacing(large ? 'md' : 'sm')};
  text-align: ${({ align }) => align};
`;

export default Label;
