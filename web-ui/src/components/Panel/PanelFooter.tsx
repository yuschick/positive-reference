import React from 'react';
import styled from 'styled-components';

import { color, spacing } from 'theme';

const PanelFooter: React.FC = ({ children }) => <StyledFooter>{children}</StyledFooter>;

const StyledFooter = styled.footer`
  background: ${color('white')};
  border-top: 1px solid ${color('lightGrey')};
  grid-area: footer;
  min-height: ${spacing('navbar')};
  padding: ${spacing('md')};
  text-align: center;
`;

export default PanelFooter;
