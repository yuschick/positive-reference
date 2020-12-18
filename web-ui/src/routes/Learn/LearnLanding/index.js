import React from 'react';
import styled from 'styled-components';
import { useSettingsState, useTranslation, Language } from 'positive-store';
import { Helmet } from 'react-helmet';

import A from 'components/A';
import Grid from 'components/Grid';
import Heading from 'components/Heading';
import LearnCard from 'routes/Learn/LearnLanding/LearnCard';
import Link from 'components/Link';
import Page from 'components/Page';
import Resources from 'components/Resources';
import useGridColumns from 'utils/useGridColumns';
import { useLessons } from 'context/LessonContext/LessonContext';
import { spacing } from 'theme';

const LearnLanding = () => {
  const { language } = useSettingsState();
  const { t } = useTranslation();
  const { categories: videoCategories } = useLessons();
  const gridColumns = useGridColumns();

  return (
    <PageGrid>
      <Helmet>
        <title>{`${t('route.learn')} | Positive`}</title>
      </Helmet>

      <StyledH1 forwardedAs="h1" appearAs="h1-jumbo">
        {t('route.learn.header')}
      </StyledH1>

      {videoCategories && videoCategories.length > 0 && (
        <div>
          <Heading as="h2">{t('app.videos')}</Heading>

          <Grid marginTop="xl" columns={gridColumns} columnGap="lg" rowGap="xxl">
            {videoCategories.map(({ id, header, description, lessons, illustration }) => (
              <Link key={id} to={id}>
                <LearnCard
                  header={header}
                  description={description}
                  footnote={`${t('route.learn.num_videos', { num: lessons.length })}`}
                  illustration={illustration}
                  fullHeight
                  clickable
                />
              </Link>
            ))}
          </Grid>
        </div>
      )}

      {language === Language.fi && (
        <div>
          <Heading as="h3" appearAs="h2">
            {t('route.learn.articles')}
          </Heading>

          <Grid marginTop="xl" columns={gridColumns} gap="lg">
            <A
              href="https://medium.com/positive-learning/huomaa-hyv%C3%A4-jokaisessa-oppilaassa-f443b9fca591"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LearnCard
                header="Positiivisen kasvatuksen polku"
                description="Tässä kirjoitussarjassa esittelemme, miten pääset alkuun positiivisen kasvatuksen polulla."
                footnote="4 artikkelia"
                iconName="share"
                illustration={{
                  backgroundColor: 'teal',
                  circleColor: 'darkTeal',
                  slug: 'judgement',
                }}
                fullHeight
                clickable
              />
            </A>
          </Grid>
        </div>
      )}

      <Resources />
    </PageGrid>
  );
};

const PageGrid = styled(Page)`
  display: grid;
  grid-gap: ${spacing('xxl')};
`;

const StyledH1 = styled(Heading)`
  margin: ${spacing('md')} auto 0 auto;
  max-width: 700px;
  width: 100%;
`;

export default LearnLanding;
