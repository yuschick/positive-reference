import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import Link from 'components/Link';
import Button from 'components/Button';
import Icon from 'components/Icon';
import StrengthImage from 'components/StrengthImage';
import SanityIllustration from 'components/SanityIllustration';
import Text from 'components/Text';

import { borderRadius, boxShadow, color, fontSize, spacing } from 'theme';
import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

interface Props {
  backgroundColor: string;
  title: string;
  image: string;
  description?: string;
  href: string;
}

const StrengthCard: React.FunctionComponent<Props> = ({
  backgroundColor,
  title,
  image,
  description,
  href,
}) => {
  const [showDesc, setShowDesc] = useState(false);
  const cardRef = useRef<HTMLDivElement>();
  const { trackEvent } = useAnalytics();
  const { t } = useTranslation();

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;

    card.addEventListener('mouseenter', () => setShowDesc(true), { passive: true });
    card.addEventListener('mouseleave', () => setShowDesc(false), { passive: true });

    return () => {
      if (!card) return;

      card.removeEventListener('mouseenter', () => setShowDesc(true));
      card.removeEventListener('mouseleave', () => setShowDesc(false));
    };
  }, [cardRef]);

  return (
    <CardWrapper ref={cardRef}>
      <IconWrapper
        onClick={() => {
          trackEvent({
            category: 'Teach',
            action: `Click to ${showDesc ? 'hide' : 'show'} strength ${title} description`,
          });
          setShowDesc(!showDesc);
        }}
      >
        <Icon name="learn" color={showDesc ? 'green' : 'black'} transition="none" />
      </IconWrapper>
      <Card backgroundColor={backgroundColor}>
        <Link
          key={href}
          to={href}
          onClick={() => trackEvent({ category: 'Teach', action: `Click strength ${title}` })}
        >
          <DescriptionBlock backgroundColor="white" show={showDesc}>
            <Text bold>{title}</Text>
            {description && <Desc forwardedAs="p">{description}</Desc>}
          </DescriptionBlock>
          <ContentBlock show={showDesc} backgroundColor={backgroundColor}>
            {image === 'start' ? (
              <SanityIllustration slug={image} alt={t('route.teach.start.title')} sizes="135px" />
            ) : (
              <StrengthImage slug={image} alt={title} sizes="135px" />
            )}
            <Text as="p" color="black" size="body" bold>
              {title}
            </Text>
          </ContentBlock>
        </Link>
      </Card>
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ ref: any }>`
  /* TODO: bug in styled components with ref types */
  position: relative;
  width: 240px;
`;

const Card = styled.article<{ backgroundColor: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
  border: 4px solid ${({ backgroundColor }) => backgroundColor};
  border-radius: ${borderRadius('sm')};
  cursor: pointer;
  display: flex;
  width: 100%;

  a {
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  &:focus-within {
    box-shadow: ${boxShadow('shallow')};
  }
`;

const IconWrapper = styled(Button)`
  position: absolute;
  right: ${spacing('md')};
  top: ${spacing('sm')};

  &:focus {
    outline: 1px solid ${color('inactiveGrey')};
  }
`;

const ContentBlock = styled.section<{ backgroundColor: string; show: boolean }>`
  align-content: center;
  align-items: center;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${borderRadius('sm')};
  color: ${color('black')};
  display: ${({ show }) => (!show ? 'flex' : 'none')};
  flex-direction: column;
  height: 240px;
  justify-content: center;
  overflow: hidden auto;
  padding: ${spacing('md')};
  text-align: center;
  text-decoration: none;
  width: 100%;
`;

const DescriptionBlock = styled(ContentBlock)`
  display: ${({ show }) => (show ? 'flex' : 'none')};
`;

const Desc = styled(Text)`
  font-size: ${fontSize('sm')};
  line-height: 1.125em;
`;

export default StrengthCard;
