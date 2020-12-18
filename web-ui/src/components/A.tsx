import React from 'react';
import styled from 'styled-components';

import { color as clr, fontSize } from 'theme';

interface Props {
  href: string;
  color?: string;
  target?: string;
  rel?: string;
  className?: string;
}

const A: React.FC<Props> = ({ href, color = 'green', target, rel, className, children }) => (
  <StyledA href={href} color={color} target={target} rel={rel} className={className}>
    {children}
  </StyledA>
);

const StyledA = styled.a<{ color: string }>`
  color: ${({ color }) => clr(color)};
  font-size: ${fontSize('body')};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover,
  :focus,
  :active {
    color: ${clr('hoverGreen')};
  }
`;

export default A;
