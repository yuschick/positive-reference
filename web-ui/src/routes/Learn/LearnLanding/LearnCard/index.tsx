import React from 'react';
import styled from 'styled-components/macro';

import Div from 'components/Div';
import Card from 'components/Card';
import Flex from 'components/Flex';
import Heading from 'components/Heading';
import Text from 'components/Text';
import Icon from 'components/Icon';
import CardHeader from './CardHeader';

import { color, fontSize, spacing } from 'theme';

interface Props {
  illustration: {
    backgroundColor: string;
    circleColor: string;
    slug: string;
    width?: string;
    right?: string;
    bottom?: string;
  };
  header: string;
  description: string;
  footnote?: string;
  iconName?: string;
  fullHeight?: boolean;
  clickable?: boolean;
}

const LearnCard: React.FC<Props> = ({
  illustration,
  header,
  description,
  footnote,
  iconName,
  fullHeight,
  clickable,
}) => {
  return (
    <StyledCard
      alignCenter={false}
      fullWidthOnMobile={false}
      clickable={clickable}
      fullHeight={fullHeight}
    >
      <CardHeader illustration={illustration} name={header} />

      <Div padding="xl lg lg">
        <StyledTitle forwardedAs="h2" appearAs="h3">
          {header}
        </StyledTitle>

        <Text as="p">{description}</Text>

        {(footnote || iconName) && (
          <Flex marginTop="lg" fullWidth alignCenter justifyContent="space-between">
            {footnote && <Text appearAs="h5">{footnote}</Text>}

            {iconName && <StyledIcon name={iconName} color="grey" />}
          </Flex>
        )}
      </Div>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  padding: 0;

  &:hover {
    header {
      img {
        transform: scale(1.02);
      }
      .circle {
        transform: scale(0.98);
        opacity: 0.9;
      }
    }
  }

  @media (prefers-reduced-motion) {
    &:hover {
      header {
        img,
        .circle {
          transform: none;
          opacity: 1;
        }
      }
    }
  }
`;

const StyledIcon = styled(Icon)`
  &:hover {
    color: ${color('hoverGreen')};
  }
`;

const StyledTitle = styled(Heading)<{ appearAs: string }>`
  flex: 1;
  font-size: ${fontSize('lg')};
  margin-bottom: ${spacing('lg')};
`;

export default LearnCard;
