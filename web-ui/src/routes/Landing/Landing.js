import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useStrengthState, useStrengthActions, useTranslation, StrengthSlug } from 'positive-store';

import CircleStrength from './CircleStrength';

import Page from 'components/Page';
import Heading from 'components/Heading';
import Text from 'components/Text';
import { SpinnerView } from 'components/Spinner';
import PillButton from 'components/buttons/PillButton';
import VideoPlayer from 'components/VideoPlayer';
import withErrorBoundary from 'utils/withErrorBoundary';

import { color, spacing } from 'theme';

const Landing = () => {
  const { t } = useTranslation();
  const { strengths } = useStrengthState();
  const { fetchStrengths } = useStrengthActions();

  useEffect(() => {
    if (strengths.length) return;
    fetchStrengths(undefined);
  }, [strengths, fetchStrengths]);

  return !strengths.length ? (
    <SpinnerView />
  ) : (
    <LandingPage>
      <Helmet>
        <title>{`${t('app.home')} | Positive`}</title>
      </Helmet>

      <Heading as="h1" appearAs="h1-jumbo">
        {t('route.landing.welcome_msg')}
      </Heading>

      <VideoContainer>
        <VideoPlayer controls url={t('route.landing.video_url')} />
      </VideoContainer>

      <SectionsContainer>
        <SectionItem>
          <CircleStrength slug={StrengthSlug.curiosity} alt={t('route.see_the_good')} />

          <Text as="p">{t('route.landing.desc.see_the_good')}</Text>

          <PillButton label={t('route.see_the_good')} onClick={() => navigate('/see-the-good')} />
        </SectionItem>

        <SectionItem>
          <CircleStrength slug={StrengthSlug.selfRegulation} alt={t('route.learn')} />

          <Text as="p">{t('route.landing.desc.learn')}</Text>

          <PillButton label={t('route.learn')} onClick={() => navigate('/learn')} />
        </SectionItem>

        <SectionItem>
          <CircleStrength slug={StrengthSlug.fairness} alt={t('route.teach')} />

          <Text as="p">{t('route.landing.desc.teach')}</Text>

          <PillButton label={t('route.teach')} onClick={() => navigate('/teach')} />
        </SectionItem>
      </SectionsContainer>
    </LandingPage>
  );
};

const LandingPage = styled(Page)`
  display: grid;
  grid-gap: ${spacing('xl')};
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  justify-content: center;
  margin-top: ${spacing('md')};
`;

const VideoContainer = styled.div`
  border: solid 4px ${color('yellow')};
  margin: 0 auto;
  max-width: 420px;
  width: 100%;
`;

const SectionsContainer = styled.section`
  display: grid;
  grid-column-gap: ${spacing('lg')};
  grid-row-gap: ${spacing('xxxl')};
  grid-template-columns: repeat(auto-fit, 284px);
  justify-content: center;
  margin-top: ${spacing('lg')};
`;

const SectionItem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  p {
    flex: 1;
    text-align: center;
  }

  button {
    margin-top: ${spacing('lg')};
    min-width: 180px;
  }
`;

export default withErrorBoundary(Landing);
