import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'positive-store';

import Heading from 'components/Heading';
import Text from 'components/Text';
import Link from 'components/Link';
import Page from 'components/Page';
import VideoPlayer from 'components/VideoPlayer';
import { useLessons } from 'context/LessonContext/LessonContext';
import { spacing } from 'theme';

const LearnLesson = ({ categoryId, lessonId }) => {
  const { getCategory, getLesson } = useLessons();
  const { t } = useTranslation();
  const category = getCategory(categoryId);
  const lesson = getLesson(lessonId);
  const lessonIndex = category.lessons.findIndex(lesson => lesson.id === lessonId);
  const nextLesson = category.lessons[lessonIndex + 1];

  return lesson ? (
    <Page>
      <Helmet>
        <title>{`${lesson.header} | Positive`}</title>
      </Helmet>

      <ContentContainer>
        <Heading as="h1" appearAs="h2">
          {lesson.category}
        </Heading>

        <StyledH2 forwardedAs="h2" appearAs="h1-jumbo">
          {lesson.header}
        </StyledH2>

        <VideoPlayer playing controls border url={lesson.videoUrl} />

        {lesson.description && (
          <StyledText forwardedAs="p" align="left">
            {lesson.description}
          </StyledText>
        )}

        {nextLesson && (
          <Fragment>
            <NextHeading forwardedAs="h3" appearAs="h2" align="center">
              {t('route.learn.actions.next')}
            </NextHeading>

            <Link to={`/learn/${category.id}/${nextLesson.id}`}>
              <Text as="p" align="center">
                {nextLesson.header}
              </Text>
            </Link>
          </Fragment>
        )}
      </ContentContainer>
    </Page>
  ) : null;
};

const ContentContainer = styled.div`
  margin: 0 auto;
  max-width: 700px;
  width: 100%;
`;

const StyledH2 = styled(Heading)`
  margin: ${spacing('md')} 0 ${spacing('xl')} 0;
`;

const StyledText = styled(Text)`
  margin-top: ${spacing('xl')};
`;

const NextHeading = styled(Heading)`
  margin-top: ${spacing('xxl')};
`;

export default LearnLesson;
