import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { useAudienceState, useStrengthState, Status, useTranslation } from 'positive-store';

import StartingLesson from './StartingLesson';
import StrengthPaths from './StrengthPaths';

import Div from 'components/Div';
import Tabs from 'components/Tabs';
import Heading from 'components/Heading';
import Spinner from 'components/Spinner';

import { useAnalytics } from 'context/AnalyticsContext/AnalyticsContext';

import { fontSize, spacing } from 'theme';

const LessonPlans = () => {
  const [tab, setTab] = useState<string>('');

  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();

  const { audiences, activeAudience } = useAudienceState();
  const { strengthPackages, strengths, startingLesson, status } = useStrengthState();

  useEffect(() => {
    if (!activeAudience) return;
    setTab(activeAudience.name);
  }, [activeAudience, setTab]);

  return (
    <section>
      <StyledH2 forwardedAs="h2">{t('route.teach.find_lesson_plans')}</StyledH2>
      {audiences?.length ? (
        <Div marginTop="xl">
          {audiences.length > 1 && (
            <Tabs.TabBar activeTab={tab}>
              {audiences.map(({ name, slug }: { name: string; slug: string }) => (
                <Tabs.Tab
                  key={slug}
                  name={name}
                  isActive={tab === name}
                  handleSelect={() => {
                    setTab(name);
                    trackEvent({ category: 'Teach', action: 'Select Audience' });
                    navigate(`/teach/${slug}`);
                  }}
                />
              ))}
            </Tabs.TabBar>
          )}
        </Div>
      ) : null}
      {status.fetchStrengths === Status.loading || !strengthPackages || !strengths.length ? (
        <SpinnerWrapper>
          <Spinner center />
        </SpinnerWrapper>
      ) : (
        <Fragment>
          {startingLesson && <StartingLesson lesson={startingLesson} />}

          <StrengthsGrid>
            <StrengthPaths.PowerStrengths strengths={strengthPackages.core} />
            <StrengthPaths.Waves
              packages={strengthPackages.waves}
              hasWaves={strengthPackages.hasWavesContent}
            />
          </StrengthsGrid>
        </Fragment>
      )}
    </section>
  );
};

const StyledH2 = styled(Heading)`
  font-size: ${fontSize('body')};
  text-align: center;
`;

const StrengthsGrid = styled.section`
  display: grid;
  grid-gap: ${spacing('xxl')};
  margin-top: ${spacing('lg')};
`;

const SpinnerWrapper = styled.div`
  padding: ${spacing('xxl')} 0;
`;

export default LessonPlans;
