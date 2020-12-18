import React from 'react';
import styled from 'styled-components';

import Card from 'components/Card';
import Flex from 'components/Flex';
import Heading from 'components/Heading';
import { useMobileBreakpoint } from 'utils/useBreakpoint';
import { spacing } from 'theme';

const SummaryCard = ({ title, children, ...props }) => {
  const isMobileBreakpoint = useMobileBreakpoint();

  return (
    <Flex column fullWidth>
      {isMobileBreakpoint ? (
        <StyledH1 forwardedAs="h1">{title}</StyledH1>
      ) : (
        <Flex height="xxxl" alignCenter>
          <Heading as="h1">{title}</Heading>
        </Flex>
      )}

      <Card {...props}>
        <Flex column fullWidth>
          {children}
        </Flex>
      </Card>
    </Flex>
  );
};

const StyledH1 = styled(Heading)`
  margin: 0 0 ${spacing('md')} ${spacing('lg')};
`;

export default SummaryCard;
