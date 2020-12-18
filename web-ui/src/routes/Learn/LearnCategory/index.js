import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import Grid from 'components/Grid';
import Heading from 'components/Heading';
import Text from 'components/Text';
import LessonCard from 'routes/Learn/LearnCategory/LessonCard';
import Link from 'components/Link';
import Page from 'components/Page';
import useGridColumns from 'utils/useGridColumns';
import { useLessons } from 'context/LessonContext/LessonContext';
import { spacing } from 'theme';

const LearnCategory = ({ categoryId }) => {
  const { getCategory } = useLessons();
  const gridColumns = useGridColumns();
  const category = getCategory(categoryId);

  return category ? (
    <Page>
      <Helmet>
        <title>{`${category.header} | Positive`}</title>
      </Helmet>

      <Heading as="h1" appearAs="h1-jumbo" align="center">
        {category.header}
      </Heading>

      <StyledText forwardedAs="p" align="center">
        {category.description}
      </StyledText>

      <Grid marginTop="xxl" fullWidth columns={gridColumns} columnGap="lg" rowGap="xl">
        {category.lessons.map(lesson => (
          <Link key={lesson.id} to={`/learn/${category.id}/${lesson.id}`}>
            <LessonCard lesson={lesson} />
          </Link>
        ))}
      </Grid>
    </Page>
  ) : null;
};

const StyledText = styled(Text)`
  margin: ${spacing('md')} auto 0 auto;
  max-width: 700px;
  width: 100%;
`;

export default LearnCategory;
