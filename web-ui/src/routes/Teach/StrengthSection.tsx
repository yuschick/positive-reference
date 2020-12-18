import React from 'react';
import styled from 'styled-components';

import Heading from 'components/Heading';
import Text from 'components/Text';

import { color, font, fontSize, spacing } from 'theme';

interface Props {
  title: string;
  description?: string;
  secondary?: boolean;
}

const StrengthSection: React.FunctionComponent<Props> = ({ title, description, children }) => {
  return (
    <ContentGrid>
      <Title forwardedAs="h3" appearAs="h4">
        {title}
      </Title>
      {description && <Desc forwardedAs="p">{description}</Desc>}
      {children}
    </ContentGrid>
  );
};

const ContentGrid = styled.section`
  display: grid;
  grid-gap: ${spacing('lg')};
  grid-template-columns: 1fr;
  text-align: center;
`;

const Desc = styled(Text)<{ forwardedAs: string }>`
  margin: 0 auto;
  max-width: 750px;
  width: 100%;
`;

const Title = styled(Heading)<{ appearAs: string }>`
  color: ${color('grey')};
  font-family: ${font('bold')};
  font-size: ${fontSize('xs')};
  text-transform: uppercase;
`;

export default StrengthSection;
