import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import A from 'components/A';
import Text from 'components/Text';
import { breakpoint, color, spacing } from 'theme';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <A href="https://positive.fi/">
        <Text as="p" color="white">
          positive.fi
        </Text>
        <StyledText appearAs="h3">{t('app.happy_kids_learn_best')}</StyledText>
      </A>
    </StyledFooter>
  );
};

const StyledText = styled(Text)`
  color: ${color('white')};
  margin-top: ${spacing('xs')};

  @media (min-width: ${breakpoint('sm')}) {
    margin-top: ${spacing('sm')};
  }
`;

const StyledFooter = styled.footer`
  background: ${color('activeGreen')};
  display: none;
  padding: ${spacing('sm')};
  text-align: center;

  @media (min-width: ${breakpoint('sm')}) {
    display: block;
    padding: ${spacing('md')};
  }
`;

export default Footer;
