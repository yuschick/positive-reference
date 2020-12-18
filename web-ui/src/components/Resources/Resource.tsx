import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import A from 'components/A';
import Text from 'components/Text';
import Heading from 'components/Heading';
import SanityIllustration from 'components/SanityIllustration';

import { font, fontSize, color, spacing } from 'theme';

interface Props {
  type: string;
  title: string;
  desc: string;
  imageSlug: string;
  href: string;
}

const Resource: React.FC<Props> = ({ type, title, desc, imageSlug, href }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <header>
        <Type color="grey" size="xs" bold>
          {type}
        </Type>
        <Title forwardedAs="h1" appearAs="h5">
          {title}
        </Title>
      </header>
      <Text as="p">{desc}</Text>
      <A href={href} target="_blank" rel="noopener noreferrer">
        <StyledSanityIllustration slug={imageSlug} alt={title} sizes="150px" />
      </A>
      <footer>
        <A href={href} target="_blank" rel="noopener noreferrer">
          {t('resources.actions.download_pdf')}
        </A>
      </footer>
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  flex-direction: column;

  p {
    flex: 1;
  }
`;

const Type = styled(Text)`
  letter-spacing: 0.075em;
  text-transform: uppercase;
`;

const Title = styled(Heading)<{ appearAs: string }>`
  color: ${color('black')};
  font-family: ${font('bold')};
  font-size: ${fontSize('body')};
  letter-spacing: 0;
  margin: ${spacing('sm')} 0;
  text-transform: none;
`;

const StyledSanityIllustration = styled(SanityIllustration)`
  height: 192px;
  margin: ${spacing('md')} 0;
`;

export default Resource;
