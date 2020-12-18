import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  useStrengthActions,
  useStrengthState,
  useExerciseState,
  useExerciseActions,
  Status,
  useTranslation,
} from 'positive-store';

import Heading from 'components/Heading';
import Page from 'components/Page';

import LessonPlans from './LessonPlans';
import PositiveCV from './PositiveCV';
import XmasCalendar from './XmasCalendar';

import Resources from 'components/Resources';

import { spacing } from 'theme';

const Teach: React.FunctionComponent = () => {
  const { t } = useTranslation();

  const { status, positiveCV, xmasCalendar, activeStrengthSlug } = useStrengthState();
  const { setActiveStrengthSlug } = useStrengthActions();
  const { activeExerciseSlug, exercises } = useExerciseState();
  const { setActiveExerciseSlug, setExercises } = useExerciseActions();

  useEffect(() => {
    if (activeStrengthSlug) {
      setActiveStrengthSlug(undefined);
    }

    if (activeExerciseSlug) {
      setActiveExerciseSlug(undefined);
    }

    if (exercises.length) {
      setExercises([]);
    }
  }, [
    activeStrengthSlug,
    activeExerciseSlug,
    exercises,
    setActiveStrengthSlug,
    setActiveExerciseSlug,
    setExercises,
  ]);

  return (
    <PageContainer>
      <Helmet>
        <title>{`${t('route.teach')} | Positive`}</title>
      </Helmet>

      <Header>
        <Heading as="h1" appearAs="h1-jumbo" align="center">
          {t('route.teach.teach_character_strengths')}
        </Heading>
      </Header>

      <TeachGrid>
        <LessonPlans />
        {status.fetchStrengths !== Status.loading && (
          <Fragment>
            {positiveCV && <PositiveCV cv={positiveCV} />}
            {xmasCalendar && <XmasCalendar calendar={xmasCalendar} />}
          </Fragment>
        )}
        <Resources alignHeadline="center" />
      </TeachGrid>
    </PageContainer>
  );
};

const PageContainer = styled(Page)`
  display: grid;
  grid-template-areas:
    'header'
    'content';
  grid-template-rows: min-content auto;
  min-height: 100vh;
  padding: ${spacing('lg')} ${spacing('lg')} ${spacing('xxl')};
`;

const Header = styled.div`
  grid-area: header;
`;

const TeachGrid = styled.section`
  display: grid;
  grid-gap: 80px;
  margin-top: ${spacing('lg')};
`;

export default Teach;
