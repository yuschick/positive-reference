import React from 'react';
import styled from 'styled-components';
import { Link as ReachRouterLink } from '@reach/router';

import { color, fontSize } from 'theme';

const StyledLink = styled(ReachRouterLink)`
  color: ${color('green')};
  text-decoration: none;
  font-size: ${fontSize('body')};
  cursor: pointer;

  &:hover {
    color: ${color('hoverGreen')};
  }

  &:active {
    color: ${color('green')};
  }

  transition: color 0.3s ease-in-out;
  will-change: color;
`;

const Link = ({ ...props }) => <StyledLink {...props} />;

export default Link;
