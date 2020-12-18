import React from 'react';
import styled from 'styled-components';

import Text from 'components/Text';
import { spacing } from 'theme';

const MenuGroupLabel: React.FC = ({ children }) => (
  <Container>
    <Text as="p" appearAs="h5" align="left">
      {children}
    </Text>
  </Container>
);

const Container = styled.li`
  padding: ${spacing('sm')} 0 ${spacing('sm')} ${spacing('md')};
`;

export default MenuGroupLabel;
