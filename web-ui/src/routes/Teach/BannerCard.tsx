import React from 'react';
import styled from 'styled-components';

import Card from 'components/Card';
import Icon from 'components/Icon';
import Link from 'components/Link';
import Heading from 'components/Heading';
import Text from 'components/Text';

import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

import { breakpoint, color, fontSize, spacing } from 'theme';
import { COLOR_NAME } from 'types/theme';
import { ICONS_LIGHT } from 'types/icon';

interface Props {
  desc: string;
  iconColor: COLOR_NAME;
  iconName: ICONS_LIGHT;
  href: string;
  title?: string;
}

const BannerCard: React.FC<Props> = ({ title, desc, iconColor, iconName, href }) => {
  const { trackEvent } = useAnalytics();

  return (
    <Link
      key={href}
      to={href}
      onClick={() => trackEvent({ category: 'Teach', action: `Select ${title}` })}
    >
      <Container>
        <Icon large light color={iconColor} name={iconName} />
        <Content>
          {title && <Title forwardedAs="h4">{title}</Title>}
          <Text as="p">{desc}</Text>
        </Content>
      </Container>
    </Link>
  );
};

const Container = styled(Card)`
  align-items: start;
  cursor: pointer;
  display: grid;
  grid-gap: ${spacing('lg')};
  grid-template-columns: auto;
  margin-top: ${spacing('lg')};
  text-align: center;

  @media screen and (min-width: ${breakpoint('xs')}) {
    grid-template-columns: ${spacing('xxxl')} auto;
    text-align: left;
  }
`;

const Content = styled.article`
  display: grid;
  grid-gap: ${spacing('sm')};
  grid-auto-rows: max-content;
`;

const Title = styled(Heading)`
  color: ${color('green')};
  font-size: ${fontSize('body')};
  text-transform: none;
`;

export default BannerCard;
