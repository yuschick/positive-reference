import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'positive-store';

import Resource from './Resource';
import Heading from 'components/Heading';
import { fontSize, spacing, breakpointModify } from 'theme';

interface Props {
  alignHeadline: string;
}

const Resources: React.FC<Props> = ({ alignHeadline }) => {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <StyledH2 forwardedAs="h2" align={alignHeadline}>
        {t('resources')}
      </StyledH2>

      <ResourcesGrid>
        <Resource
          type={t('resources.cards')}
          title={t('resources.see_the_good_activity_cards')}
          desc={t('resources.see_the_good_activity_cards.desc')}
          href={t('resources.see_the_good_activity_cards.url')}
          imageSlug="stg-activity-cards"
        />
        <Resource
          type={t('resources.cards')}
          title={t('resources.see_the_good_student_cards')}
          desc={t('resources.see_the_good_student_cards.desc')}
          href={t('resources.see_the_good_student_cards.url')}
          imageSlug="stg-student-cards"
        />
      </ResourcesGrid>
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledH2 = styled(Heading)<{ align: string }>`
  align-self: ${({ align }) => align || 'start'};
  font-size: ${fontSize('body')};
  margin-top: ${spacing('sm')};
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${spacing('lg')};
  margin-top: ${spacing('lg')};

  @media (max-width: ${breakpointModify('md', -1)}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpointModify('xs', -1)}) {
    grid-template-columns: 1fr;
  }
`;

export default Resources;
