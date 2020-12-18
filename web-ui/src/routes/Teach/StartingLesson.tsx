import React from 'react';
import styled from 'styled-components';
import { Strength, useTranslation } from 'positive-store';

import StrengthSection from './StrengthSection';
import Strengths from 'routes/Teach/StrengthCards';

import { spacing } from 'theme';

interface Props {
  lesson: Strength;
}

const StartingLesson: React.FunctionComponent<Props> = ({ lesson }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <StrengthSection title={t('route.teach.start')} description={t('route.teach.start.desc')}>
        <Strengths.Wrapper>
          <Strengths.Card
            backgroundColor={lesson.color}
            title={t('route.teach.start.title')}
            image={lesson.slug}
            description={lesson.description}
            href={lesson.slug}
          />
        </Strengths.Wrapper>
      </StrengthSection>
    </Container>
  );
};

const Container = styled.section`
  padding: ${spacing('xl')} 0;
`;

export default StartingLesson;
